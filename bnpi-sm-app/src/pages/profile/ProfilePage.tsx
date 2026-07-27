import { useTranslation } from 'react-i18next';
import { useAuth } from '@/app/auth/useAuth';
import { Text } from '@/components/atoms/Text';
import { PageHeader } from '@/components/organisms/PageHeader';
import { AppShellLayout } from '@/components/templates/AppShellLayout';

function Field({ label, value, testId }: { label: string; value: string; testId: string }) {
  return (
    <div
      className="flex flex-col gap-1 rounded-md border border-border px-4 py-3"
      data-testid={testId}
    >
      <Text variant="caption" tone="muted">
        {label}
      </Text>
      <Text variant="body">{value}</Text>
    </div>
  );
}

export function ProfilePage() {
  const { t } = useTranslation(['profile', 'common']);
  const { user } = useAuth();

  return (
    <AppShellLayout>
      <div data-testid="profile-page" className="flex flex-col gap-8">
        <PageHeader title={t('profile:title')} description={t('profile:subtitle')} />

        {user ? (
          <section className="flex max-w-md flex-col gap-3 rounded-lg border border-border bg-surface p-6 shadow-sm">
            <Field label={t('profile:name')} value={user.displayName} testId="profile-display-name" />
            <Field label={t('profile:email')} value={user.email} testId="profile-email" />
            <Field
              label={t('profile:role')}
              value={user.role === 'admin' ? t('profile:roleAdmin') : t('profile:roleFrontDesk')}
              testId="profile-role"
            />
          </section>
        ) : null}
      </div>
    </AppShellLayout>
  );
}
