import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { RoomStatusCalendar } from '@/components/organisms/RoomStatusCalendar';
import { CALENDAR_CONFIG } from '@/config/calendar.config';

const DATE = '2030-06-15';

function slotLabel() {
  const hour = CALENDAR_CONFIG.dayStartHour;
  const period = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:00 ${period}`;
}

/** Local wall-clock ISO, matching how the component builds slot boundaries. */
function localIso(hour: number): string {
  const [year, month, day] = DATE.split('-').map(Number);
  return new Date(year!, month! - 1, day!, hour, 0, 0, 0).toISOString();
}

describe('RoomStatusCalendar', () => {
  it('renders a column per room and marks a covered slot occupied', () => {
    render(
      <RoomStatusCalendar
        date={DATE}
        rooms={[
          {
            roomId: 1,
            roomName: 'Meeting Room 1',
            roomType: 'meeting',
            bookings: [
              {
                startsAt: localIso(CALENDAR_CONFIG.dayStartHour),
                endsAt: localIso(CALENDAR_CONFIG.dayStartHour + 1),
              },
            ],
          },
          { roomId: 2, roomName: 'VIP Room', roomType: 'vip', bookings: [] },
        ]}
      />,
    );

    expect(screen.getByTestId('room-column-1')).toHaveTextContent('Meeting Room 1');
    expect(screen.getByTestId('room-column-2')).toHaveTextContent('VIP Room');
    expect(screen.getByTestId(`slot-1-${slotLabel()}`)).toHaveAttribute('data-status', 'occupied');
    expect(screen.getByTestId(`slot-2-${slotLabel()}`)).toHaveAttribute('data-status', 'vacant');
  });

  it('invokes onSlotClick only for vacant slots', async () => {
    const user = userEvent.setup();
    const onSlotClick = vi.fn();

    render(
      <RoomStatusCalendar
        date={DATE}
        rooms={[{ roomId: 1, roomName: 'Meeting Room 1', roomType: 'meeting', bookings: [] }]}
        onSlotClick={onSlotClick}
      />,
    );

    await user.click(screen.getByTestId(`slot-1-${slotLabel()}`));
    expect(onSlotClick).toHaveBeenCalledWith(1, expect.any(String), expect.any(String));
  });

  it('renders non-interactive slots when onSlotClick is omitted (public/read-only mode)', () => {
    render(
      <RoomStatusCalendar
        date={DATE}
        rooms={[{ roomId: 1, roomName: 'Meeting Room 1', roomType: 'meeting', bookings: [] }]}
      />,
    );

    expect(screen.getByTestId(`slot-1-${slotLabel()}`)).toBeDisabled();
  });
});
