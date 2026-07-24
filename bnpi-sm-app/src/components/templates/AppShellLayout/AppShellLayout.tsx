import type { ReactNode } from 'react';
import { useAuth } from '@/app/auth/useAuth';
import { AppSidebar } from '@/components/organisms/AppSidebar';
import { UserMenu } from '@/components/molecules/UserMenu';

export interface AppShellLayoutProps {
  children: ReactNode;
}

export function AppShellLayout({ children }: AppShellLayoutProps) {
  const { status, user, logout } = useAuth();
  const isAuthed = status === 'authenticated' && Boolean(user);

  return (
    <div className="flex min-h-screen bg-bg">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        {isAuthed && user ? (
          <div className="flex justify-end px-[var(--space-page-x)] pt-6">
            <UserMenu displayName={user.displayName} role={user.role} onLogout={logout} />
          </div>
        ) : null}
        <main className="w-full flex-1 px-[var(--space-page-x)] py-[var(--space-page-y)]">
          {children}
        </main>
      </div>
    </div>
  );
}
