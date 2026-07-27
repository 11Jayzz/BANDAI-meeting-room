import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AppProviders } from '@/app/providers';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';

function jsonResponse(data: unknown) {
  return { ok: true, status: 200, json: async () => ({ success: true, data }) } as Response;
}

const ROOMS = [
  { id: 1, name: 'Meeting Room 1', type: 'meeting', isActive: true, currentStatus: 'occupied' },
  { id: 2, name: 'VIP Room', type: 'vip', isActive: true, currentStatus: 'vacant' },
];

function booking(id: number, roomId: number, startHoursFromNow: number, title: string) {
  const start = new Date(Date.now() + startHoursFromNow * 60 * 60 * 1000);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  return {
    id,
    roomId,
    roomName: roomId === 1 ? 'Meeting Room 1' : 'VIP Room',
    createdByUserId: 1,
    title,
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

describe('DashboardPage', () => {
  beforeEach(() => {
    localStorage.setItem('bdss_auth_token', 'test-token');
  });

  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('shows stat cards, the rooms-right-now table, and the up-next list with real data', async () => {
    // -0.5h means it started 30 min ago and is still ongoing (ends in 0h from "now").
    const currentMeeting = booking(1, 1, -0.5, 'Ongoing Sync');
    currentMeeting.endsAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    const upcoming = booking(2, 2, 2, 'Later Sync');
    const todaysBookings = [currentMeeting, upcoming];

    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/auth/me')) {
        return Promise.resolve(
          jsonResponse({ id: 1, email: 'bdss-admin@bandai.local', displayName: 'BDSS Admin', role: 'admin', isActive: true }),
        );
      }
      if (url.includes('/rooms')) {
        return Promise.resolve(jsonResponse(ROOMS));
      }
      return Promise.resolve(jsonResponse(todaysBookings));
    });
    vi.stubGlobal('fetch', fetchMock);

    render(
      <AppProviders>
        <MemoryRouter>
          <DashboardPage />
        </MemoryRouter>
      </AppProviders>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('dashboard-stat-bookings')).toHaveTextContent('2');
    });
    expect(screen.getByTestId('dashboard-stat-occupied')).toHaveTextContent('1/2');
    expect(screen.getByTestId('dashboard-stat-utilization')).toHaveTextContent(/%/);
    expect(screen.getByTestId('dashboard-stat-utilization')).not.toHaveTextContent('NaN');

    const roomsNow = screen.getByTestId('dashboard-rooms-now');
    expect(roomsNow).toHaveTextContent('Meeting Room 1');
    expect(roomsNow).toHaveTextContent('Ongoing Sync');
    expect(roomsNow).toHaveTextContent('Occupied');
    expect(roomsNow).toHaveTextContent('Vacant');

    expect(screen.getByTestId('dashboard-upcoming-card')).toHaveTextContent('Later Sync');
    expect(screen.getByTestId('dashboard-quick-actions')).toBeInTheDocument();
  });
});
