import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppProviders } from '@/app/providers';
import { LoginPage } from '@/pages/login/LoginPage';

describe('LoginPage', () => {
  it('renders the sign-in form', () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AppProviders>,
    );

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sign in');
    expect(screen.getByTestId('login-email-input')).toBeRequired();
    expect(screen.getByTestId('login-password-input')).toHaveAttribute('type', 'password');
    expect(screen.getByTestId('login-submit')).toBeInTheDocument();
  });
});
