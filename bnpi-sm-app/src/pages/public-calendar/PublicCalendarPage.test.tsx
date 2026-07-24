import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppProviders } from '@/app/providers';
import { PublicCalendarPage } from '@/pages/public-calendar/PublicCalendarPage';

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
          {
            roomId: 2,
            roomName: 'VIP Room',
            roomType: 'vip',
            bookings: [
              {
                startsAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
                endsAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
              },
            ],
          },
        ],
      },
    }),
  } as Response;
}

describe('PublicCalendarPage', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loads and renders a card per room, without requiring auth, and never shows meeting titles', async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockAvailability());
    vi.stubGlobal('fetch', fetchMock);

    render(
      <AppProviders>
        <MemoryRouter>
          <PublicCalendarPage />
        </MemoryRouter>
      </AppProviders>,
    );

    expect(screen.getByTestId('public-calendar-page')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Daily Room Schedule');

    await waitFor(() => {
      expect(screen.getByTestId('public-calendar-rooms-grid')).toBeInTheDocument();
    });

    const vacantCard = screen.getByTestId('room-overview-card-1');
    expect(vacantCard).toHaveTextContent('Meeting Room 1');
    expect(vacantCard).toHaveTextContent('Vacant');

    const occupiedCard = screen.getByTestId('room-overview-card-2');
    expect(occupiedCard).toHaveTextContent('VIP Room');
    expect(occupiedCard).toHaveTextContent('Occupied');

    // Read-only, redacted feed: no booking form and no meeting-title content ever appear here.
    expect(screen.queryByTestId('booking-form')).not.toBeInTheDocument();
  });
});
