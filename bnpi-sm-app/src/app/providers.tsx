import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { AuthProvider } from '@/app/auth/AuthProvider';
import { i18n } from '@/i18n';

export interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>{children}</AuthProvider>
    </I18nextProvider>
  );
}
