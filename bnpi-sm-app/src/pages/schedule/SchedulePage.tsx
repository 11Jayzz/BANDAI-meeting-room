import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Spinner } from '@/components/atoms/Spinner';
import { Text } from '@/components/atoms/Text';
import { BookingForm, type BookingFormValues } from '@/components/molecules/BookingForm';
import { PageHeader } from '@/components/organisms/PageHeader';
import { AppShellLayout } from '@/components/templates/AppShellLayout';
import { apiClient, ApiError } from '@/lib/apiClient';
import { cn } from '@/lib/cn';
import { datetimeLocalToIso, getTodayDateString } from '@/lib/date';
import type { Booking, Room } from '@/types/bdss';

export function SchedulePage() {
  const { t } = useTranslation(['schedule', 'common']);
  const [searchParams, setSearchParams] = useSearchParams();
  const [date, setDate] = useState(getTodayDateString());
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [pendingActionId, setPendingActionId] = useState<number | null>(null);

  const loadData = useCallback(
    async (forDate: string) => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const [roomList, bookingList] = await Promise.all([
          apiClient.get<Room[]>('/rooms'),
          apiClient.get<Booking[]>('/bookings', { date: forDate }),
        ]);
        setRooms(roomList);
        setBookings(bookingList);
      } catch (err) {
        setLoadError(err instanceof ApiError ? err.message : t('common:errorGeneric'));
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  useEffect(() => {
    void loadData(date);
  }, [date, loadData]);

  // Deep link from Dashboard's Quick Actions ("New Meeting"/"New Booking" → /schedule?new=1).
  useEffect(() => {
    if (searchParams.get('new') === '1' && rooms.length > 0) {
      setFormError(null);
      setIsFormOpen(true);
      setSearchParams((params) => {
        params.delete('new');
        return params;
      }, { replace: true });
    }
  }, [searchParams, rooms, setSearchParams]);

  async function handleCreateBooking(values: BookingFormValues) {
    setIsSubmitting(true);
    setFormError(null);
    try {
      await apiClient.post('/bookings', {
        roomId: values.roomId,
        title: values.title,
        startsAt: datetimeLocalToIso(values.startsAt),
        endsAt: datetimeLocalToIso(values.endsAt),
      });
      setIsFormOpen(false);
      await loadData(date);
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : t('common:errorGeneric'));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCancel(bookingId: number) {
    setPendingActionId(bookingId);
    setActionError(null);
    try {
      await apiClient.post(`/bookings/${bookingId}/cancel`);
      await loadData(date);
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : t('common:errorGeneric'));
    } finally {
      setPendingActionId(null);
    }
  }

  async function handleCheckIn(bookingId: number) {
    setPendingActionId(bookingId);
    setActionError(null);
    try {
      await apiClient.post(`/bookings/${bookingId}/check-in`);
      await loadData(date);
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : t('common:errorGeneric'));
    } finally {
      setPendingActionId(null);
    }
  }

  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <AppShellLayout>
      <div data-testid="schedule-page" className="flex flex-col gap-6">
        <PageHeader
          title={t('schedule:title')}
          description={t('schedule:subtitle')}
          actions={
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                data-testid="schedule-date-input"
                className="h-10 rounded-md border border-border bg-surface px-3 text-sm text-text"
              />
              <Button
                type="button"
                disabled={rooms.length === 0}
                onClick={() => {
                  setFormError(null);
                  setIsFormOpen((open) => !open);
                }}
                data-testid="schedule-new-booking-button"
              >
                {t('schedule:newBooking')}
              </Button>
            </div>
          }
        />

        {isFormOpen ? (
          <section
            className="max-w-md rounded-lg border border-border bg-surface p-6 shadow-sm"
            data-testid="schedule-booking-panel"
          >
            <BookingForm
              rooms={rooms.map((room) => ({ id: room.id, name: room.name }))}
              isSubmitting={isSubmitting}
              error={formError}
              onSubmit={(values) => void handleCreateBooking(values)}
              onCancel={() => setIsFormOpen(false)}
            />
          </section>
        ) : null}

        {actionError ? (
          <Text tone="danger" role="alert" data-testid="schedule-action-error">
            {actionError}
          </Text>
        ) : null}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" label={t('common:loading')} />
          </div>
        ) : loadError ? (
          <Text tone="danger" role="alert">
            {loadError}
          </Text>
        ) : bookings.length === 0 ? (
          <Text tone="muted" data-testid="schedule-empty">
            {t('schedule:empty')}
          </Text>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-sm" data-testid="schedule-table">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wide text-text-muted">
                    <th className="px-5 py-3">{t('schedule:columnRoom')}</th>
                    <th className="px-5 py-3">{t('schedule:columnTitle')}</th>
                    <th className="px-5 py-3">{t('schedule:columnTime')}</th>
                    <th className="px-5 py-3">{t('schedule:columnStatus')}</th>
                    <th className="px-5 py-3">{t('schedule:columnActions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-border last:border-0 hover:bg-surface-muted"
                      data-testid={`schedule-row-${booking.id}`}
                    >
                      <td className="px-5 py-3 font-medium">{booking.roomName}</td>
                      <td className="px-5 py-3">{booking.title}</td>
                      <td className="px-5 py-3 text-text-muted">
                        {formatTime(booking.startsAt)}–{formatTime(booking.endsAt)}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-success'
                              : 'bg-surface-muted text-text-muted',
                          )}
                        >
                          <span
                            className={cn(
                              'h-1.5 w-1.5 rounded-full',
                              booking.status === 'confirmed' ? 'bg-success' : 'bg-text-muted',
                            )}
                          />
                          {booking.status}
                        </span>
                        {booking.checkedInAt ? (
                          <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                            {t('schedule:checkedIn')}
                          </span>
                        ) : null}
                      </td>
                      <td className="px-5 py-3">
                        {booking.status === 'confirmed' ? (
                          <div className="flex gap-2">
                            {!booking.checkedInAt ? (
                              <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                isLoading={pendingActionId === booking.id}
                                onClick={() => void handleCheckIn(booking.id)}
                                data-testid={`schedule-checkin-${booking.id}`}
                              >
                                {t('schedule:checkIn')}
                              </Button>
                            ) : null}
                            <Button
                              type="button"
                              size="sm"
                              variant="danger"
                              isLoading={pendingActionId === booking.id}
                              onClick={() => void handleCancel(booking.id)}
                              data-testid={`schedule-cancel-${booking.id}`}
                            >
                              {t('schedule:cancel')}
                            </Button>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppShellLayout>
  );
}
