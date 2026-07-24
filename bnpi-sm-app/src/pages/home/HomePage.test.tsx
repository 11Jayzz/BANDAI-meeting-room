import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppProviders } from '@/app/providers';
import { HomePage } from '@/pages/home/HomePage';

describe('HomePage', () => {
  it('renders the Bandai Namco branded hero and feature cards for a guest visitor', () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </AppProviders>,
    );

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(screen.getByText('Bandai Namco Philippines')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('BDSS');
    expect(screen.getByTestId('home-feature-grid')).toBeInTheDocument();

    // Guest (no token): sign-in + public calendar CTAs, not the dashboard CTA.
    expect(screen.getByTestId('home-primary-cta')).toHaveTextContent('Sign in');
    expect(screen.getByTestId('home-secondary-cta')).toHaveTextContent('Public Calendar');
  });
});
