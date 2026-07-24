import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/app/auth/useAuth';
import { Spinner } from '@/components/atoms/Spinner';
import { ROUTES } from '@/config/routes.config';
import type { UserRole } from '@/types/bdss';

export interface ProtectedRouteProps {
  roles: UserRole[];
  children: ReactNode;
}

/** Wraps a route element (drops straight into router.tsx's FEATURE_ROUTER_ROUTES block). */
export function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const { status, user } = useAuth();

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center" data-testid="auth-loading">
        <Spinner size="lg" label="Loading" />
      </div>
    );
  }

  if (status === 'unauthenticated' || !user) {
    return <Navigate to={ROUTES.login} replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return <>{children}</>;
}
