import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AppProviders } from '@/app/providers';
import { ProfilePage } from '@/pages/profile/ProfilePage';

describe('ProfilePage', () => {
  beforeEach(() => {
    localStorage.setItem('bdss_auth_token', 'test-token');
  });

  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it("shows the signed-in user's profile", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        data: { id: 1, email: 'bdss-admin@bandai.local', displayName: 'BDSS Admin', role: 'admin', isActive: true },
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    render(
      <AppProviders>
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      </AppProviders>,
    );

    expect(screen.getByTestId('profile-page')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('profile-email')).toHaveTextContent('bdss-admin@bandai.local');
    });
    expect(screen.getByTestId('profile-display-name')).toHaveTextContent('BDSS Admin');
    expect(screen.getByTestId('profile-role')).toHaveTextContent('Admin');
  });
});
