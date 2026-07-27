import { useState, type FormEvent } from 'react';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { FormField } from '@/components/molecules/FormField';
import { cn } from '@/lib/cn';

export interface BookingFormValues {
  roomId: number;
  title: string;
  /** datetime-local input value, e.g. "2026-07-24T10:00" (no timezone offset). */
  startsAt: string;
  endsAt: string;
}

export interface BookingFormProps {
  rooms: Array<{ id: number; name: string }>;
  initialValues?: Partial<BookingFormValues>;
  isSubmitting?: boolean;
  error?: string | null;
  onSubmit: (values: BookingFormValues) => void;
  onCancel?: () => void;
}

export function BookingForm({
  rooms,
  initialValues,
  isSubmitting = false,
  error,
  onSubmit,
  onCancel,
}: BookingFormProps) {
  const [roomId, setRoomId] = useState(initialValues?.roomId ?? rooms[0]?.id ?? 0);
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [startsAt, setStartsAt] = useState(initialValues?.startsAt ?? '');
  const [endsAt, setEndsAt] = useState(initialValues?.endsAt ?? '');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ roomId, title, startsAt, endsAt });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" data-testid="booking-form">
      <div className="flex flex-col gap-1.5">
        <Text as="label" htmlFor="booking-room" variant="label">
          Room
        </Text>
        <select
          id="booking-room"
          value={roomId}
          onChange={(event) => setRoomId(Number(event.target.value))}
          required
          data-testid="booking-room-select"
          className={cn(
            'h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-text',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
          )}
        >
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>

      <FormField
        id="booking-title"
        label="Title"
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        data-testid="booking-title-input"
      />

      <FormField
        id="booking-starts-at"
        label="Start"
        type="datetime-local"
        required
        value={startsAt}
        onChange={(event) => setStartsAt(event.target.value)}
        data-testid="booking-starts-at-input"
      />

      <FormField
        id="booking-ends-at"
        label="End"
        type="datetime-local"
        required
        value={endsAt}
        onChange={(event) => setEndsAt(event.target.value)}
        data-testid="booking-ends-at-input"
      />

      {error ? (
        <Text variant="bodySm" tone="danger" role="alert" data-testid="booking-form-error">
          {error}
        </Text>
      ) : null}

      <div className="flex gap-2">
        <Button type="submit" isLoading={isSubmitting} data-testid="booking-form-submit">
          Create booking
        </Button>
        {onCancel ? (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
