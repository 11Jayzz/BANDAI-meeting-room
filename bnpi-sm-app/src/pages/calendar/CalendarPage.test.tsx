import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppProviders } from '@/app/providers';
import { CalendarPage } from '@/pages/calendar/CalendarPage';

function mockAvailability() {
  return {
    ok: true,
    status: 200,
    json: async () => ({
      success: true,
      data: {
        date: '2030-06-15',
        rooms: [
          { roomId: 1, roomName: 'Meeting Room 1', roomType: 'meeting', bookings: [] },
          { roomId: 2, roomName: 'VIP Room', roomType: 'vip', bookings: [] },
        ],
      },
    }),
  } as Response;
}

describe('CalendarPage', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loads availability and renders the room grid', async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockAvailability());
    vi.stubGlobal('fetch', fetchMock);

    render(
      <AppProviders>
        <MemoryRouter>
          <CalendarPage />
        </MemoryRouter>
      </AppProviders>,
    );

    expect(screen.getByTestId('calendar-page')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Calendar');

    await waitFor(() => {
      expect(screen.getByTestId('room-status-calendar')).toBeInTheDocument();
    });
    expect(screen.getByTestId('room-column-1')).toHaveTextContent('Meeting Room 1');
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/bookings/availability'),
      expect.anything(),
    );
  });
});
