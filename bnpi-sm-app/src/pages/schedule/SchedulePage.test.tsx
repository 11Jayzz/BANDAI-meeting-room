import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppProviders } from '@/app/providers';
import { SchedulePage } from '@/pages/schedule/SchedulePage';

function jsonResponse(data: unknown) {
  return { ok: true, status: 200, json: async () => ({ success: true, data }) } as Response;
}

describe('SchedulePage', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('lists bookings for the selected day', async () => {
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/rooms')) {
        return Promise.resolve(
          jsonResponse([{ id: 1, name: 'Meeting Room 1', type: 'meeting', isActive: true, currentStatus: 'vacant' }]),
        );
      }
      return Promise.resolve(
        jsonResponse([
          {
            id: 10,
            roomId: 1,
            roomName: 'Meeting Room 1',
            createdByUserId: 1,
            title: 'Weekly sync',
            startsAt: '2030-06-15T02:00:00.000Z',
            endsAt: '2030-06-15T03:00:00.000Z',
            status: 'confirmed',
            checkedInAt: null,
            checkedInByUserId: null,
            checkinMethod: null,
            cancelledAt: null,
            cancelledByUserId: null,
            createdAt: '2030-06-15T00:00:00.000Z',
            updatedAt: '2030-06-15T00:00:00.000Z',
          },
        ]),
      );
    });
    vi.stubGlobal('fetch', fetchMock);

    render(
      <AppProviders>
        <MemoryRouter>
          <SchedulePage />
        </MemoryRouter>
      </AppProviders>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('schedule-table')).toBeInTheDocument();
    });
    expect(screen.getByText('Weekly sync')).toBeInTheDocument();
    expect(screen.getByTestId('schedule-cancel-10')).toBeInTheDocument();
    expect(screen.getByTestId('schedule-checkin-10')).toBeInTheDocument();
  });
});
