import { CalendarPlus, CalendarRange, ChevronRight, DoorOpen } from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '@/app/auth/useAuth';
import { Spinner } from '@/components/atoms/Spinner';
import { Text } from '@/components/atoms/Text';
import { PageHeader } from '@/components/organisms/PageHeader';
import { AppShellLayout } from '@/components/templates/AppShellLayout';
import { CALENDAR_CONFIG } from '@/config/calendar.config';
import { ROUTES } from '@/config/routes.config';
import { apiClient, ApiError } from '@/lib/apiClient';
import { getTodayDateString } from '@/lib/date';
import { cn } from '@/lib/cn';
import type { Booking, Room } from '@/types/bdss';

const BUSINESS_HOURS_PER_DAY = CALENDAR_CONFIG.dayEndHour - CALENDAR_CONFIG.dayStartHour;

/** % of total room-hours (business hours × room count) covered by confirmed bookings. */
function utilizationPercent(bookings: Booking[], roomCount: number): number {
  if (roomCount === 0) return 0;
  const bookedMinutes = bookings
    .filter((b) => b.status === 'confirmed')
    .reduce((sum, b) => sum + (new Date(b.endsAt).getTime() - new Date(b.startsAt).getTime()) / 60_000, 0);
  const capacityMinutes = roomCount * BUSINESS_HOURS_PER_DAY * 60;
  return Math.max(0, Math.min(100, Math.round((bookedMinutes / capacityMinutes) * 100)));
}

interface QuickAction {
  label: string;
  to: string;
  icon: ReactNode;
}

function QuickActionLink({ label, to, icon }: QuickAction) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-lg bg-brand-50 px-4 py-3 text-sm font-medium text-text transition-colors hover:bg-brand-100"
    >
      {icon}
      <span className="flex-1">{label}</span>
      <ChevronRight className="h-4 w-4 text-text-muted" />
    </Link>
  );
}

function StatCard({ label, value, caption }: { label: string; value: ReactNode; caption?: string }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <Text variant="label" tone="muted">
        {label}
      </Text>
      <Text variant="display" className="mt-1 leading-none">
        {value}
      </Text>
      {caption ? (
        <Text variant="caption" tone="muted" className="mt-1">
          {caption}
        </Text>
      ) : null}
    </section>
  );
}

export function DashboardPage() {
  const { t } = useTranslation(['dashboard', 'common']);
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [todaysBookings, setTodaysBookings] = useState<Booking[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const today = getTodayDateString();
        const [roomList, bookingList] = await Promise.all([
          apiClient.get<Room[]>('/rooms'),
          apiClient.get<Booking[]>('/bookings', { date: today }),
        ]);

        if (cancelled) return;
        setRooms(roomList);
        setTodaysBookings(bookingList);
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
  }, [t]);

  const isLoading = rooms === null || todaysBookings === null;

  const upNext = useMemo(() => {
    if (!todaysBookings) return [];
    const now = Date.now();
    return todaysBookings
      .filter((b) => b.status === 'confirmed' && new Date(b.startsAt).getTime() >= now)
      .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
      .slice(0, 3);
  }, [todaysBookings]);

  const roomsRightNow = useMemo(() => {
    if (!rooms || !todaysBookings) return [];
    const now = Date.now();
    return rooms.map((room) => {
      const current = todaysBookings.find(
        (b) =>
          b.roomId === room.id &&
          b.status === 'confirmed' &&
          new Date(b.startsAt).getTime() <= now &&
          new Date(b.endsAt).getTime() > now,
      );
      return { room, current };
    });
  }, [rooms, todaysBookings]);

  const confirmedTodayCount = todaysBookings?.filter((b) => b.status === 'confirmed').length ?? 0;
  const occupiedRoomCount = rooms?.filter((r) => r.currentStatus === 'occupied').length ?? 0;
  const totalRoomCount = rooms?.length ?? 0;
  const utilizationToday = todaysBookings && rooms ? utilizationPercent(todaysBookings, rooms.length) : 0;

  const isAdmin = user?.role === 'admin';
  const quickActions: QuickAction[] = isAdmin
    ? [
        { label: t('dashboard:newMeeting'), to: `${ROUTES.schedule}?new=1`, icon: <CalendarPlus className="h-5 w-5" /> },
        { label: t('dashboard:manageRooms'), to: ROUTES.roomManagement, icon: <DoorOpen className="h-5 w-5" /> },
        { label: t('dashboard:viewSchedule'), to: ROUTES.schedule, icon: <CalendarRange className="h-5 w-5" /> },
      ]
    : [
        { label: t('dashboard:newBooking'), to: `${ROUTES.schedule}?new=1`, icon: <CalendarPlus className="h-5 w-5" /> },
        { label: t('dashboard:viewSchedule'), to: ROUTES.schedule, icon: <CalendarRange className="h-5 w-5" /> },
        { label: t('dashboard:viewCalendar'), to: ROUTES.calendar, icon: <DoorOpen className="h-5 w-5" /> },
      ];

  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  return (
    <AppShellLayout>
      <div data-testid="dashboard-page" className="flex flex-col gap-6">
        <PageHeader title={t('dashboard:title')} description={t('dashboard:subtitle')} />

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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div data-testid="dashboard-stat-bookings">
                <StatCard label={t('dashboard:todaysBookings')} value={confirmedTodayCount} />
              </div>
              <div data-testid="dashboard-stat-occupied">
                <StatCard
                  label={t('dashboard:roomsOccupiedNow')}
                  value={`${occupiedRoomCount}/${totalRoomCount}`}
                />
              </div>
              <div data-testid="dashboard-stat-utilization">
                <StatCard
                  label={t('dashboard:roomUtilization')}
                  value={`${utilizationToday}%`}
                  caption={t('dashboard:averageUtilization')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <section
                className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm lg:col-span-2"
                data-testid="dashboard-rooms-now"
              >
                <div className="px-5 pt-5">
                  <Text variant="label">{t('dashboard:roomsRightNow')}</Text>
                </div>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-border text-text-muted">
                        <th className="px-5 py-2 font-medium">{t('dashboard:room')}</th>
                        <th className="px-5 py-2 font-medium">{t('dashboard:status')}</th>
                        <th className="px-5 py-2 font-medium">{t('dashboard:currentMeeting')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roomsRightNow.map(({ room, current }) => (
                        <tr key={room.id} className="border-b border-border last:border-0">
                          <td className="px-5 py-3 font-medium">{room.name}</td>
                          <td className="px-5 py-3">
                            <span
                              className={cn(
                                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
                                room.currentStatus === 'occupied'
                                  ? 'bg-danger-muted text-danger'
                                  : 'bg-green-100 text-success',
                              )}
                            >
                              <span
                                className={cn(
                                  'h-1.5 w-1.5 rounded-full',
                                  room.currentStatus === 'occupied' ? 'bg-danger' : 'bg-success',
                                )}
                              />
                              {room.currentStatus === 'occupied'
                                ? t('dashboard:occupied')
                                : t('dashboard:vacant')}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-text-muted">
                            {current
                              ? `${current.title} · ${formatTime(current.startsAt)}–${formatTime(current.endsAt)}`
                              : t('dashboard:noCurrentMeeting')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
                data-testid="dashboard-upcoming-card"
              >
                <div className="mb-3 flex items-center justify-between">
                  <Text variant="label">{t('dashboard:upNext')}</Text>
                  <Link to={ROUTES.schedule} className="text-xs font-medium text-brand-600 hover:underline">
                    {t('dashboard:viewAll')}
                  </Link>
                </div>
                {upNext.length === 0 ? (
                  <Text variant="bodySm" tone="muted">
                    {t('dashboard:noUpcoming')}
                  </Text>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {upNext.map((booking) => (
                      <li key={booking.id} className="flex items-start gap-3 rounded-lg bg-surface-muted p-3">
                        <span className="mt-0.5 rounded-md bg-brand-100 p-1.5 text-brand-700">
                          <CalendarRange className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <Text variant="bodySm" className="truncate font-semibold">
                            {booking.title}
                          </Text>
                          <Text variant="caption" tone="muted">
                            {booking.roomName} · {formatTime(booking.startsAt)}–{formatTime(booking.endsAt)}
                          </Text>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            <section
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
              data-testid="dashboard-quick-actions"
            >
              <Text variant="label" className="mb-3">
                {t('dashboard:quickActions')}
              </Text>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {quickActions.map((action) => (
                  <QuickActionLink key={action.label} {...action} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </AppShellLayout>
  );
}
