import { Download } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/atoms/Button';
import { Spinner } from '@/components/atoms/Spinner';
import { Text } from '@/components/atoms/Text';
import { UtilizationBarChart } from '@/components/molecules/UtilizationBarChart';
import { PageHeader } from '@/components/organisms/PageHeader';
import { AppShellLayout } from '@/components/templates/AppShellLayout';
import { CALENDAR_CONFIG } from '@/config/calendar.config';
import { apiClient, ApiError } from '@/lib/apiClient';
import { addDays, getTodayDateString, shortWeekdayLabel } from '@/lib/date';
import type { Booking, Room } from '@/types/bdss';

const TREND_DAYS = 7;
const BUSINESS_HOURS_PER_DAY = CALENDAR_CONFIG.dayEndHour - CALENDAR_CONFIG.dayStartHour;

function utilizationPercent(bookings: Booking[], roomCount: number): number {
  if (roomCount === 0) return 0;
  const bookedMinutes = bookings
    .filter((b) => b.status === 'confirmed')
    .reduce((sum, b) => sum + (new Date(b.endsAt).getTime() - new Date(b.startsAt).getTime()) / 60_000, 0);
  const capacityMinutes = roomCount * BUSINESS_HOURS_PER_DAY * 60;
  return Math.max(0, Math.min(100, Math.round((bookedMinutes / capacityMinutes) * 100)));
}

interface RoomWeekStat {
  room: Room;
  bookingCount: number;
  bookedHours: number;
}

function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function ReportsPage() {
  const { t } = useTranslation(['reports', 'common']);
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [weekBookings, setWeekBookings] = useState<Booking[][] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const trendDates = useMemo(() => {
    const today = getTodayDateString();
    return Array.from({ length: TREND_DAYS }, (_, i) => addDays(today, i - (TREND_DAYS - 1)));
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const bookingRequests = trendDates.map((date) => {
          return apiClient.get<Booking[]>('/bookings', { date });
        });
        const [roomList, ...dayBookings] = await Promise.all([
          apiClient.get<Room[]>('/rooms'),
          ...bookingRequests,
        ]);
        if (cancelled) return;
        setRooms(roomList);
        setWeekBookings(dayBookings);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : t('common:errorGeneric'));
        }
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [trendDates, t]);

  const isLoading = rooms === null || weekBookings === null;

  const trendPoints = useMemo(() => {
    if (!weekBookings || !rooms) return [];
    return trendDates.map((date, i) => ({
      label: shortWeekdayLabel(date),
      value: utilizationPercent(weekBookings[i]!, rooms.length),
    }));
  }, [weekBookings, rooms, trendDates]);

  const busiestRooms = useMemo<RoomWeekStat[]>(() => {
    if (!weekBookings || !rooms) return [];
    const allBookings = weekBookings.flat().filter((b) => b.status === 'confirmed');
    return rooms
      .map((room) => {
        const roomBookings = allBookings.filter((b) => b.roomId === room.id);
        const bookedMinutes = roomBookings.reduce(
          (sum, b) => sum + (new Date(b.endsAt).getTime() - new Date(b.startsAt).getTime()) / 60_000,
          0,
        );
        return { room, bookingCount: roomBookings.length, bookedHours: Math.round((bookedMinutes / 60) * 10) / 10 };
      })
      .sort((a, b) => b.bookingCount - a.bookingCount);
  }, [weekBookings, rooms]);

  const averageUtilization =
    trendPoints.length > 0 ? Math.round(trendPoints.reduce((sum, p) => sum + p.value, 0) / trendPoints.length) : 0;

  function handleExportCsv() {
    const rows: (string | number)[][] = [
      [t('reports:csvRoom'), t('reports:csvType'), t('reports:csvBookings'), t('reports:csvHoursBooked')],
      ...busiestRooms.map((stat) => [stat.room.name, stat.room.type, stat.bookingCount, stat.bookedHours]),
    ];
    downloadCsv(`bdss-busiest-rooms-${getTodayDateString()}.csv`, rows);
  }

  return (
    <AppShellLayout>
      <div data-testid="reports-page" className="flex flex-col gap-6">
        <PageHeader title={t('reports:title')} description={t('reports:subtitle')} />

        {error ? (
          <Text tone="danger" role="alert">
            {error}
          </Text>
        ) : isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" label={t('common:loading')} />
          </div>
        ) : (
          <>
            <section
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
              data-testid="reports-utilization-chart"
            >
              <div className="mb-1 flex items-center justify-between">
                <Text variant="label">{t('reports:utilizationTitle')}</Text>
                <Text variant="caption" tone="muted">
                  {t('reports:last7Days')}
                </Text>
              </div>
              <Text variant="display" className="leading-none">
                {averageUtilization}%
              </Text>
              <Text variant="caption" tone="muted" className="mb-2">
                {t('reports:averageUtilization')}
              </Text>
              <UtilizationBarChart
                points={trendPoints}
                unit="%"
                ariaLabel={t('reports:utilizationChartAriaLabel')}
              />
            </section>

            <section
              className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
              data-testid="reports-busiest-rooms"
            >
              <div className="flex items-center justify-between px-5 pt-5">
                <Text variant="label">{t('reports:busiestRooms')}</Text>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleExportCsv}
                  data-testid="reports-export-csv"
                >
                  <Download className="h-4 w-4" />
                  {t('reports:exportCsv')}
                </Button>
              </div>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-text-muted">
                      <th className="px-5 py-2 font-medium">{t('reports:csvRoom')}</th>
                      <th className="px-5 py-2 font-medium">{t('reports:csvType')}</th>
                      <th className="px-5 py-2 font-medium">{t('reports:csvBookings')}</th>
                      <th className="px-5 py-2 font-medium">{t('reports:csvHoursBooked')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {busiestRooms.map((stat) => (
                      <tr key={stat.room.id} className="border-b border-border last:border-0">
                        <td className="px-5 py-3 font-medium">{stat.room.name}</td>
                        <td className="px-5 py-3 capitalize text-text-muted">{stat.room.type}</td>
                        <td className="px-5 py-3">{stat.bookingCount}</td>
                        <td className="px-5 py-3">{stat.bookedHours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </AppShellLayout>
  );
}
