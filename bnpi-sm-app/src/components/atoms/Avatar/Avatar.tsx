import { cn } from '@/lib/cn';

export interface AvatarProps {
  name: string;
  tone?: 'admin' | 'frontdesk' | 'brand';
  size?: 'sm' | 'md';
  className?: string;
}

const toneClass: Record<NonNullable<AvatarProps['tone']>, string> = {
  admin: 'bg-red-600 text-white',
  frontdesk: 'bg-orange-500 text-white',
  brand: 'bg-brand-600 text-text-inverse',
};

const sizeClass = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
} as const;

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

export function Avatar({ name, tone = 'brand', size = 'md', className }: AvatarProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold',
        toneClass[tone],
        sizeClass[size],
        className,
      )}
      aria-hidden="true"
    >
      {initialsFor(name)}
    </span>
  );
}
