import { CalendarClock, Fingerprint, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '@/app/auth/useAuth';
import { Text } from '@/components/atoms/Text';
import { AppShellLayout } from '@/components/templates/AppShellLayout';
import { ROUTES } from '@/config/routes.config';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  body: string;
}

function FeatureCard({ icon, title, body }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-600/10 text-red-600">
        {icon}
      </span>
      <Text as="h2" variant="subtitle" className="mb-1">
        {title}
      </Text>
      <Text tone="muted" variant="bodySm">
        {body}
      </Text>
    </div>
  );
}

export function HomePage() {
  const { t } = useTranslation(['home', 'common']);
  const { status, user } = useAuth();
  const isAuthed = status === 'authenticated' && Boolean(user);

  return (
    <AppShellLayout>
      <div className="flex flex-col gap-8" data-testid="home-page">
        <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-800 p-8 text-white shadow-sm sm:p-10">
          <Text as="span" variant="caption" className="font-semibold uppercase tracking-wider text-white/70">
            {t('home:eyebrow')}
          </Text>
          <Text as="h1" variant="display" className="mt-2 text-white">
            {t('home:title')}
          </Text>
          <Text variant="body" className="mt-3 max-w-xl text-white/85">
            {t('home:subtitle')}
          </Text>

          <div className="mt-6 flex flex-wrap gap-3">
            {isAuthed ? (
              <Link
                to={ROUTES.dashboard}
                data-testid="home-primary-cta"
                className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-white/90"
              >
                {t('home:goToDashboard')}
              </Link>
            ) : (
              <>
                <Link
                  to={ROUTES.login}
                  data-testid="home-primary-cta"
                  className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-white/90"
                >
                  {t('home:signIn')}
                </Link>
                <Link
                  to={ROUTES.publicCalendar}
                  data-testid="home-secondary-cta"
                  className="rounded-md border border-white/40 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {t('home:viewPublicCalendar')}
                </Link>
              </>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3" data-testid="home-feature-grid">
          <FeatureCard
            icon={<CalendarClock className="h-5 w-5" />}
            title={t('home:featureRealtimeTitle')}
            body={t('home:featureRealtimeBody')}
          />
          <FeatureCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title={t('home:featureRolesTitle')}
            body={t('home:featureRolesBody')}
          />
          <FeatureCard
            icon={<Fingerprint className="h-5 w-5" />}
            title={t('home:featureBiometricTitle')}
            body={t('home:featureBiometricBody')}
          />
        </div>
      </div>
    </AppShellLayout>
  );
}
