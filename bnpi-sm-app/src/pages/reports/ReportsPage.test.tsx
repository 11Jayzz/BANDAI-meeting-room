import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AppProviders } from '@/app/providers';
import { ReportsPage } from '@/pages/reports/ReportsPage';

function jsonResponse(data: unknown) {
  return { ok: true, status: 200, json: async () => ({ success: true, data }) } as Response;
}

const ROOMS = [
  { id: 1, name: 'Meeting Room 1', type: 'meeting', isActive: true, currentStatus: 'occupied' },
  { id: 2, name: 'VIP Room', type: 'vip', isActive: true, currentStatus: 'vacant' },
];

function confirmedBooking(id: number, roomId: number) {
  const start = new Date();
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  return {
    id,
    roomId,
    roomName: roomId === 1 ? 'Meeting Room 1' : 'VIP Room',
    createdByUserId: 1,
    title: `Meeting ${id}`,
    startsAt: start.toISOString(),
    endsAt: end.toISOString(),
    status: 'confirmed',
    checkedInAt: null,
    checkedInByUserId: null,
    checkinMethod: null,
    cancelledAt: null,
    cancelledByUserId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

describe('ReportsPage', () => {
  beforeEach(() => {
    localStorage.setItem('bdss_auth_token', 'test-token');
  });

  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('shows the utilization chart and a real busiest-rooms table', async () => {
    let bookingIdCounter = 0;
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/auth/me')) {
        return Promise.resolve(
          jsonResponse({ id: 1, email: 'bdss-admin@bandai.local', displayName: 'BDSS Admin', role: 'admin', isActive: true }),
        );
      }
      if (url.includes('/rooms')) {
        return Promise.resolve(jsonResponse(ROOMS));
      }
      // Every /bookings?date= call returns 3 bookings for room 1, 1 for room 2.
      bookingIdCounter += 1;
      return Promise.resolve(
        jsonResponse([
          confirmedBooking(bookingIdCounter * 10 + 1, 1),
          confirmedBooking(bookingIdCounter * 10 + 2, 1),
          confirmedBooking(bookingIdCounter * 10 + 3, 2),
        ]),
      );
    });
    vi.stubGlobal('fetch', fetchMock);

    render(
      <AppProviders>
        <MemoryRouter>
          <ReportsPage />
        </MemoryRouter>
      </AppProviders>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('reports-utilization-chart')).toHaveTextContent(/%/);
    });
    expect(screen.getByTestId('reports-utilization-chart')).not.toHaveTextContent('NaN');

    const busiest = screen.getByTestId('reports-busiest-rooms');
    expect(busiest).toHaveTextContent('Meeting Room 1');
    expect(busiest).toHaveTextContent('VIP Room');
    // Meeting Room 1 has more bookings (2/day) than VIP Room (1/day) — should rank first.
    const rows = busiest.querySelectorAll('tbody tr');
    expect(rows[0]).toHaveTextContent('Meeting Room 1');

    expect(screen.getByTestId('reports-export-csv')).toBeInTheDocument();
  });
});
