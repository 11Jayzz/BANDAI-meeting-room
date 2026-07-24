import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AuthContext, type AuthStatus } from '@/app/auth/authContext';
import { apiClient } from '@/lib/apiClient';
import { clearStoredToken, getStoredToken, setStoredToken } from '@/lib/authStorage';
import type { AuthUser, LoginResponse } from '@/types/bdss';

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const token = getStoredToken();
      if (!token) {
        setStatus('unauthenticated');
        return;
      }

      try {
        const profile = await apiClient.get<AuthUser>('/auth/me');
        if (!cancelled) {
          setUser(profile);
          setStatus('authenticated');
        }
      } catch {
        if (!cancelled) {
          clearStoredToken();
          setUser(null);
          setStatus('unauthenticated');
        }
      }
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await apiClient.post<LoginResponse>('/auth/login', { email, password });
    setStoredToken(result.token);
    setUser(result.user);
    setStatus('authenticated');
  }, []);

  const logout = useCallback(() => {
    clearStoredToken();
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  const value = useMemo(
    () => ({ status, user, login, logout }),
    [status, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
