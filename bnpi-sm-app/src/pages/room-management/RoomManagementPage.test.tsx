import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppProviders } from '@/app/providers';
import { RoomManagementPage } from '@/pages/room-management/RoomManagementPage';

describe('RoomManagementPage', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('lists rooms with their current status (read-only)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        data: [
          { id: 1, name: 'Meeting Room 1', type: 'meeting', isActive: true, currentStatus: 'occupied' },
          { id: 4, name: 'VIP Room', type: 'vip', isActive: true, currentStatus: 'vacant' },
        ],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    render(
      <AppProviders>
        <MemoryRouter>
          <RoomManagementPage />
        </MemoryRouter>
      </AppProviders>,
    );

    expect(screen.getByTestId('room-management-page')).toBeInTheDocument();
    expect(screen.getByTestId('room-management-crud-notice')).toHaveTextContent('coming');

    await waitFor(() => {
      expect(screen.getByTestId('room-management-table')).toBeInTheDocument();
    });
    expect(screen.getByTestId('room-management-row-1')).toHaveTextContent('Occupied');
    expect(screen.getByTestId('room-management-row-4')).toHaveTextContent('Vacant');
  });
});
