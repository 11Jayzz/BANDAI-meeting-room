import { useMemo } from 'react';
import { Text } from '@/components/atoms/Text';
import { CALENDAR_CONFIG } from '@/config/calendar.config';
import { cn } from '@/lib/cn';
import type { RoomAvailability } from '@/types/bdss';

export interface RoomStatusCalendarProps {
  date: string;
  rooms: RoomAvailability[];
  /** Omit for a read-only grid (e.g. the public calendar) — vacant slots become non-interactive. */
  onSlotClick?: (roomId: number, slotStartIso: string, slotEndIso: string) => void;
}

interface Slot {
  startIso: string;
  endIso: string;
  label: string;
}

function buildSlots(date: string): Slot[] {
  const slots: Slot[] = [];
  const totalMinutes = (CALENDAR_CONFIG.dayEndHour - CALENDAR_CONFIG.dayStartHour) * 60;

  for (let offset = 0; offset < totalMinutes; offset += CALENDAR_CONFIG.slotMinutes) {
    const hour = CALENDAR_CONFIG.dayStartHour + Math.floor(offset / 60);
    const minute = offset % 60;
    const start = new Date(date + 'T00:00:00');
    start.setHours(hour, minute, 0, 0);
    const end = new Date(start.getTime() + CALENDAR_CONFIG.slotMinutes * 60 * 1000);

    slots.push({
      startIso: start.toISOString(),
      endIso: end.toISOString(),
      label: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    });
  }

  return slots;
}

function isSlotOccupied(room: RoomAvailability, slot: Slot): boolean {
  const slotStart = new Date(slot.startIso).getTime();
  const slotEnd = new Date(slot.endIso).getTime();
  return room.bookings.some((booking) => {
    const bookingStart = new Date(booking.startsAt).getTime();
    const bookingEnd = new Date(booking.endsAt).getTime();
    return bookingStart < slotEnd && bookingEnd > slotStart;
  });
}

export function RoomStatusCalendar({ date, rooms, onSlotClick }: RoomStatusCalendarProps) {
  const slots = useMemo(() => buildSlots(date), [date]);

  return (
    <div className="overflow-x-auto rounded-lg border border-border" data-testid="room-status-calendar">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-muted">
            <th className="w-20 px-3 py-2 text-left">
              <Text as="span" variant="caption" tone="muted">
                Time
              </Text>
            </th>
            {rooms.map((room) => (
              <th key={room.roomId} className="px-3 py-2 text-left" data-testid={`room-column-${room.roomId}`}>
                <Text as="span" variant="label">
                  {room.roomName}
                </Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot.startIso} className="border-b border-border last:border-0">
              <td className="px-3 py-1.5">
                <Text as="span" variant="caption" tone="muted">
                  {slot.label}
                </Text>
              </td>
              {rooms.map((room) => {
                const occupied = isSlotOccupied(room, slot);
                const interactive = !occupied && Boolean(onSlotClick);
                return (
                  <td key={room.roomId} className="px-1.5 py-1">
                    <button
                      type="button"
                      disabled={!interactive}
                      onClick={
                        interactive
                          ? () => onSlotClick?.(room.roomId, slot.startIso, slot.endIso)
                          : undefined
                      }
                      data-testid={`slot-${room.roomId}-${slot.label}`}
                      data-status={occupied ? 'occupied' : 'vacant'}
                      className={cn(
                        'h-6 w-full rounded-sm transition-opacity',
                        occupied ? 'bg-danger' : 'bg-success/25',
                        interactive && 'cursor-pointer hover:bg-success/40',
                        !interactive && !occupied && 'cursor-default',
                      )}
                      aria-label={`${room.roomName} ${slot.label} ${occupied ? 'occupied' : 'vacant'}`}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
