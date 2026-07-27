import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Spinner } from '@/components/atoms/Spinner';
import { Text } from '@/components/atoms/Text';
import { PageHeader } from '@/components/organisms/PageHeader';
import { AppShellLayout } from '@/components/templates/AppShellLayout';
import { apiClient, ApiError } from '@/lib/apiClient';
import { cn } from '@/lib/cn';
import { getTodayDateString } from '@/lib/date';
import type { AvailabilityResponse, RoomAvailability } from '@/types/bdss';

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

interface RoomOverview {
  room: RoomAvailability;
  isOccupiedNow: boolean;
  currentWindowEndsAt: string | null;
  nextWindowStartsAt: string | null;
}

function sortByStart(a: { startsAt: string }, b: { startsAt: string }): number {
  return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime();
}

function coversNow(window: { startsAt: string; endsAt: string }, now: number): boolean {
  const startMs = new Date(window.startsAt).getTime();
  const endMs = new Date(window.endsAt).getTime();
  return startMs <= now && endMs > now;
}

function isAfterNow(window: { startsAt: string }, now: number): boolean {
  return new Date(window.startsAt).getTime() > now;
}

function toOverview(room: RoomAvailability): RoomOverview {
  const now = Date.now();
  const sorted = [...room.bookings].sort(sortByStart);
  const current = sorted.find((window) => coversNow(window, now));
  const next = sorted.find((window) => isAfterNow(window, now));
  return {
    room,
    isOccupiedNow: Boolean(current),
    currentWindowEndsAt: current?.endsAt ?? null,
    nextWindowStartsAt: next?.startsAt ?? null,
  };
}

/** Read-only, card-based "Rooms Overview" display — time ranges only, no meeting titles (public/unauthenticated). */
export function PublicCalendarPage() {
  const { t } = useTranslation(['publicCalendar', 'common']);
  const [date, setDate] = useState(getTodayDateString());
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadAvailability = useCallback(
    async (forDate: string) => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const result = await apiClient.get<AvailabilityResponse>('/bookings/availability', {
          date: forDate,
        });
        setAvailability(result);
      } catch (err) {
        setLoadError(err instanceof ApiError ? err.message : t('common:errorGeneric'));
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  useEffect(() => {
    void loadAvailability(date);
  }, [date, loadAvailability]);

  return (
    <AppShellLayout>
      <div data-testid="public-calendar-page" className="flex flex-col gap-6">
        <PageHeader
          title={t('publicCalendar:title')}
          description={t('publicCalendar:subtitle')}
          actions={
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              data-testid="public-calendar-date-input"
              className="h-10 rounded-md border border-border bg-surface px-3 text-sm text-text"
            />
          }
        />

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" label={t('common:loading')} />
          </div>
        ) : loadError ? (
          <Text tone="danger" role="alert">
            {loadError}
          </Text>
        ) : availability ? (
          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            data-testid="public-calendar-rooms-grid"
          >
            {availability.rooms.map((room) => {
              const overview = toOverview(room);
              return (
                <section
                  key={room.roomId}
                  className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
                  data-testid={`room-overview-card-${room.roomId}`}
                >
                  <div
                    className={cn(
                      'h-1.5 w-full',
                      overview.isOccupiedNow ? 'bg-danger' : 'bg-success',
                    )}
                  />
                  <div className="flex flex-col gap-3 p-5">
                    <div>
                      <Text variant="label">{room.roomName}</Text>
                      <Text variant="caption" tone="muted" className="capitalize">
                        {room.roomType}
                      </Text>
                    </div>

                    <span
                      className={cn(
                        'inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
                        overview.isOccupiedNow ? 'bg-danger-muted text-danger' : 'bg-green-100 text-success',
                      )}
                    >
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          overview.isOccupiedNow ? 'bg-danger' : 'bg-success',
                        )}
                      />
                      {overview.isOccupiedNow ? t('publicCalendar:occupied') : t('publicCalendar:vacant')}
                    </span>

                    <Text variant="bodySm" tone="muted">
                      {overview.isOccupiedNow && overview.currentWindowEndsAt
                        ? t('publicCalendar:occupiedUntil', { time: formatTime(overview.currentWindowEndsAt) })
                        : overview.nextWindowStartsAt
                          ? t('publicCalendar:nextBookingAt', { time: formatTime(overview.nextWindowStartsAt) })
                          : room.bookings.length === 0
                            ? t('publicCalendar:availableAllDay')
                            : t('publicCalendar:noMoreBookingsToday')}
                    </Text>

                    {room.bookings.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 border-t border-border pt-3">
                        {room.bookings.map((window, index) => (
                          <span
                            key={index}
                            className="rounded-md bg-surface-muted px-2 py-1 text-xs font-medium text-text-muted"
                          >
                            {formatTime(window.startsAt)}–{formatTime(window.endsAt)}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </section>
              );
            })}
          </div>
        ) : null}

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-danger" />
            <Text as="span" variant="caption" tone="muted">
              {t('publicCalendar:legendOccupied')}
            </Text>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-success/25" />
            <Text as="span" variant="caption" tone="muted">
              {t('publicCalendar:legendVacant')}
            </Text>
          </span>
        </div>
      </div>
    </AppShellLayout>
  );
}
