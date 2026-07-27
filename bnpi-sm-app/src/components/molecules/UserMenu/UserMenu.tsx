import { ChevronDown, LogOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/components/atoms/Avatar';
import { Text } from '@/components/atoms/Text';
import { cn } from '@/lib/cn';
import type { UserRole } from '@/types/bdss';

export interface UserMenuProps {
  displayName: string;
  role: UserRole;
  onLogout: () => void;
}

const roleLabelKey: Record<UserRole, string> = {
  admin: 'common:roleAdmin',
  front_desk: 'common:roleFrontDesk',
};

export function UserMenu({ displayName, role, onLogout }: UserMenuProps) {
  const { t } = useTranslation(['common', 'nav']);
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tone = role === 'admin' ? 'admin' : 'frontdesk';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={rootRef} data-testid="user-menu">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-surface-muted"
        data-testid="user-menu-trigger"
        aria-expanded={isOpen}
      >
        <Avatar name={displayName} tone={tone} />
        <span className="hidden flex-col items-start leading-tight sm:flex">
          <Text as="span" variant="bodySm" className="font-semibold">
            {displayName}
          </Text>
          <Text as="span" variant="caption" tone="muted">
            {t(roleLabelKey[role])}
          </Text>
        </span>
        <ChevronDown className={cn('h-4 w-4 text-text-muted transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen ? (
        <div
          className="absolute right-0 z-10 mt-2 w-44 overflow-hidden rounded-lg border border-border bg-surface shadow-md"
          data-testid="user-menu-dropdown"
        >
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-text transition-colors hover:bg-surface-muted"
            data-testid="user-menu-logout"
          >
            <LogOut className="h-4 w-4" />
            {t('nav:logout')}
          </button>
        </div>
      ) : null}
    </div>
  );
}
