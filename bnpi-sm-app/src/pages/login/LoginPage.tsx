import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/app/auth/useAuth';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { FormField } from '@/components/molecules/FormField';
import { PageHeader } from '@/components/organisms/PageHeader';
import { AppShellLayout } from '@/components/templates/AppShellLayout';
import { ROUTES } from '@/config/routes.config';
import { ApiError } from '@/lib/apiClient';

export function LoginPage() {
  const { t } = useTranslation(['login', 'common']);
  const { status, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (status === 'authenticated') {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('common:errorGeneric'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AppShellLayout>
      <div data-testid="login-page" className="flex flex-col gap-8">
        <PageHeader title={t('login:title')} description={t('login:subtitle')} />

        <form
          onSubmit={(event) => void handleSubmit(event)}
          className="flex max-w-sm flex-col gap-4 rounded-lg border border-border bg-surface p-6 shadow-sm"
          data-testid="login-form"
        >
          <FormField
            id="login-email"
            label={t('login:emailLabel')}
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            data-testid="login-email-input"
          />

          <FormField
            id="login-password"
            label={t('login:passwordLabel')}
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            data-testid="login-password-input"
          />

          {error ? (
            <Text variant="bodySm" tone="danger" role="alert" data-testid="login-error">
              {error}
            </Text>
          ) : null}

          <Button type="submit" isLoading={isSubmitting} data-testid="login-submit">
            {t('login:submit')}
          </Button>
        </form>
      </div>
    </AppShellLayout>
  );
}
