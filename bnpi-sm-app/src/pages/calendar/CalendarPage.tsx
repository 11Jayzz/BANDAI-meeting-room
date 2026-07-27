import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Spinner } from '@/components/atoms/Spinner';
import { Text } from '@/components/atoms/Text';
import { BookingForm, type BookingFormValues } from '@/components/molecules/BookingForm';
import { PageHeader } from '@/components/organisms/PageHeader';
import { RoomStatusCalendar } from '@/components/organisms/RoomStatusCalendar';
import { AppShellLayout } from '@/components/templates/AppShellLayout';
import { datetimeLocalToIso, getTodayDateString, isoToDatetimeLocal } from '@/lib/date';
import { apiClient, ApiError } from '@/lib/apiClient';
import type { AvailabilityResponse } from '@/types/bdss';

interface ActiveSlot {
  roomId: number;
  startsAt: string;
  endsAt: string;
}

export function CalendarPage() {
  const { t } = useTranslation(['calendar', 'common']);
  const [date, setDate] = useState(getTodayDateString());
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeSlot, setActiveSlot] = useState<ActiveSlot | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadAvailability = useCallback(async (forDate: string) => {
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
  }, [t]);

  useEffect(() => {
    void loadAvailability(date);
  }, [date, loadAvailability]);

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
      setActiveSlot(null);
      await loadAvailability(date);
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : t('common:errorGeneric'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AppShellLayout>
      <div data-testid="calendar-page" className="flex flex-col gap-6">
        <PageHeader
          title={t('calendar:title')}
          description={t('calendar:subtitle')}
          actions={
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              data-testid="calendar-date-input"
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
          <RoomStatusCalendar
            date={availability.date}
            rooms={availability.rooms}
            onSlotClick={(roomId, startsAt, endsAt) => {
              setFormError(null);
              setActiveSlot({ roomId, startsAt, endsAt });
            }}
          />
        ) : null}

        {activeSlot ? (
          <section
            className="max-w-md rounded-lg border border-border bg-surface p-6 shadow-sm"
            data-testid="calendar-booking-panel"
          >
            <Text as="h2" variant="subtitle" className="mb-4">
              {t('calendar:newBooking')}
            </Text>
            <BookingForm
              rooms={availability?.rooms.map((room) => ({ id: room.roomId, name: room.roomName })) ?? []}
              initialValues={{
                roomId: activeSlot.roomId,
                startsAt: isoToDatetimeLocal(activeSlot.startsAt),
                endsAt: isoToDatetimeLocal(activeSlot.endsAt),
              }}
              isSubmitting={isSubmitting}
              error={formError}
              onSubmit={(values) => void handleCreateBooking(values)}
              onCancel={() => setActiveSlot(null)}
            />
          </section>
        ) : null}

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-danger" />
            <Text as="span" variant="caption" tone="muted">
              {t('calendar:legendOccupied')}
            </Text>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-success/25" />
            <Text as="span" variant="caption" tone="muted">
              {t('calendar:legendVacant')}
            </Text>
          </span>
        </div>
      </div>
    </AppShellLayout>
  );
}
