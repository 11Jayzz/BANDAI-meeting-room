import { NavLink } from 'react-router-dom';
import { Text } from '@/components/atoms/Text';
import type { AppRoutePath } from '@/config/routes.config';
import { cn } from '@/lib/cn';

export interface NavLinkItemProps {
  to: AppRoutePath;
  label: string;
  end?: boolean;
}

export function NavLinkItem({ to, label, end = false }: NavLinkItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'rounded-md px-3 py-2 transition-colors',
          isActive
            ? 'bg-brand-50 text-brand-700'
            : 'text-text-muted hover:bg-surface-muted hover:text-text',
        )
      }
    >
      <Text as="span" variant="label" className="text-inherit">
        {label}
      </Text>
    </NavLink>
  );
}
