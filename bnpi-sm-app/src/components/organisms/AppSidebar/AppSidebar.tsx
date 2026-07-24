import {
  ArrowLeft,
  BarChart3,
  Building2,
  CalendarClock,
  CalendarDays,
  Circle,
  Home as HomeIcon,
  LayoutDashboard,
  LayoutGrid,
  LogIn,
  UserCircle,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/app/auth/useAuth';
import { Text } from '@/components/atoms/Text';
import { useTranslation } from 'react-i18next';
import { ROUTES, type AppRoutePath } from '@/config/routes.config';
import { cn } from '@/lib/cn';

interface SidebarLinkProps {
  to: AppRoutePath;
  /** Defaults to a generic marker — feature:new scaffolds without one; pick a real icon when building the page. */
  icon?: ReactNode;
  label: string;
  end?: boolean;
}

function SidebarLink({ to, icon, label, end }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-sm font-medium transition-colors',
          isActive
            ? 'border-brand-500 bg-ink-700 text-white'
            : 'border-transparent text-ink-text-muted hover:bg-ink-800 hover:text-ink-text',
        )
      }
    >
      {icon ?? <Circle className="h-5 w-5" />}
      {label}
    </NavLink>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Text
      as="span"
      variant="caption"
      className="mb-1 mt-4 px-3 font-semibold uppercase tracking-wide text-ink-text-muted first:mt-0"
    >
      {children}
    </Text>
  );
}

/** Left-hand app chrome: brand block, black console theme, section-grouped nav, footer. */
export function AppSidebar() {
  const { t } = useTranslation(['common', 'nav']);
  const { status, user } = useAuth();
  const isAuthed = status === 'authenticated' && Boolean(user);
  const isAdmin = isAuthed && user?.role === 'admin';

  return (
    <aside
      className="flex h-screen w-64 shrink-0 flex-col overflow-y-auto bg-ink-900 px-4 py-6"
      data-testid="app-header"
    >
      <div className="mb-6 flex items-center gap-3 px-2" data-testid="app-brand">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-center text-[10px] font-extrabold leading-tight text-brand-600">
          BANDAI
          <br />
          NAMCO
        </span>
        <span className="flex flex-col leading-tight text-white">
          <Text as="span" variant="label" className="text-white">
            {t('common:appName')}
          </Text>
          <Text as="span" variant="caption" className="text-ink-text-muted">
            {t('common:appTagline')}
          </Text>
        </span>
      </div>

      <nav
        aria-label={t('nav:mainNavigation')}
        className="flex flex-1 flex-col gap-1"
        data-testid="app-main-nav"
      >
        {!isAuthed ? (
          <SidebarLink to={ROUTES.home} icon={<HomeIcon className="h-5 w-5" />} label={t('nav:home')} end />
        ) : null}
        {isAuthed ? <SectionLabel>{t('nav:manageSection')}</SectionLabel> : null}
        {/* FEATURE_NAV_LINKS_START */}
        {/* (auto-managed by feature:new … page — do not remove markers) */}
        {/* FEATURE_BLOCK_START:nav-link:login */}
        {!isAuthed ? (
          <SidebarLink to={ROUTES.login} icon={<LogIn className="h-5 w-5" />} label={t('nav:login')} />
        ) : null}
        {/* FEATURE_BLOCK_END:nav-link:login */}
        {/* FEATURE_BLOCK_START:nav-link:dashboard */}
        {isAuthed ? (
          <SidebarLink
            to={ROUTES.dashboard}
            icon={<LayoutDashboard className="h-5 w-5" />}
            label={t('nav:dashboard')}
          />
        ) : null}
        {/* FEATURE_BLOCK_END:nav-link:dashboard */}
        {/* FEATURE_BLOCK_START:nav-link:schedule */}
        {isAuthed ? (
          <SidebarLink
            to={ROUTES.schedule}
            icon={<CalendarClock className="h-5 w-5" />}
            label={t('nav:schedule')}
          />
        ) : null}
        {/* FEATURE_BLOCK_END:nav-link:schedule */}
        {/* FEATURE_BLOCK_START:nav-link:calendar */}
        {isAuthed ? (
          <SidebarLink
            to={ROUTES.calendar}
            icon={<CalendarDays className="h-5 w-5" />}
            label={t('nav:calendar')}
          />
        ) : null}
        {/* FEATURE_BLOCK_END:nav-link:calendar */}
        {/* FEATURE_BLOCK_START:nav-link:room-management */}
        {isAdmin ? (
          <SidebarLink
            to={ROUTES.roomManagement}
            icon={<Building2 className="h-5 w-5" />}
            label={t('nav:roomManagement')}
          />
        ) : null}
        {/* FEATURE_BLOCK_END:nav-link:room-management */}
        {/* FEATURE_BLOCK_START:nav-link:reports */}
        {isAuthed ? (
          <SidebarLink
            to={ROUTES.reports}
            icon={<BarChart3 className="h-5 w-5" />}
            label={isAdmin ? t('nav:reports') : t('nav:report')}
          />
        ) : null}
        {/* FEATURE_BLOCK_END:nav-link:reports */}
        {/* FEATURE_BLOCK_START:nav-link:profile */}
        {isAuthed ? (
          <SidebarLink
            to={ROUTES.profile}
            icon={<UserCircle className="h-5 w-5" />}
            label={t('nav:profile')}
          />
        ) : null}
        {/* FEATURE_BLOCK_END:nav-link:profile */}
        {/* FEATURE_BLOCK_START:nav-link:public-calendar */}
        {!isAuthed ? (
          <SidebarLink
            to={ROUTES.publicCalendar}
            icon={<CalendarDays className="h-5 w-5" />}
            label={t('nav:publicCalendar')}
          />
        ) : null}
        {/* FEATURE_BLOCK_END:nav-link:public-calendar */}
        {/* FEATURE_NAV_LINKS_END */}

        {isAuthed ? (
          <>
            <SectionLabel>{t('nav:displaysSection')}</SectionLabel>
            <SidebarLink
              to={ROUTES.publicCalendar}
              icon={<LayoutGrid className="h-5 w-5" />}
              label={t('nav:roomsOverview')}
            />
          </>
        ) : null}
      </nav>

      <div className="mt-4 flex flex-col gap-3 border-t border-ink-border pt-4">
        {isAuthed ? (
          <NavLink
            to={ROUTES.home}
            className="flex items-center gap-2 px-2 text-sm font-medium text-ink-text-muted transition-colors hover:text-ink-text"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('nav:backToHome')}
          </NavLink>
        ) : null}
        <Text as="span" variant="caption" className="px-2 text-ink-text-muted">
          {t('common:footerCopyright')}
        </Text>
      </div>
    </aside>
  );
}
