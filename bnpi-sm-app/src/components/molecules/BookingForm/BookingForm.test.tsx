import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { BookingForm } from '@/components/molecules/BookingForm';

const ROOMS = [
  { id: 1, name: 'Meeting Room 1' },
  { id: 2, name: 'VIP Room' },
];

describe('BookingForm', () => {
  it('submits the entered values', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<BookingForm rooms={ROOMS} onSubmit={onSubmit} />);

    await user.type(screen.getByTestId('booking-title-input'), 'Weekly sync');
    await user.selectOptions(screen.getByTestId('booking-room-select'), '2');
    await user.type(screen.getByTestId('booking-starts-at-input'), '2030-06-15T10:00');
    await user.type(screen.getByTestId('booking-ends-at-input'), '2030-06-15T11:00');
    await user.click(screen.getByTestId('booking-form-submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      roomId: 2,
      title: 'Weekly sync',
      startsAt: '2030-06-15T10:00',
      endsAt: '2030-06-15T11:00',
    });
  });

  it('shows the error message when provided', () => {
    render(<BookingForm rooms={ROOMS} onSubmit={vi.fn()} error="This room is already booked." />);
    expect(screen.getByTestId('booking-form-error')).toHaveTextContent('already booked');
  });
});
