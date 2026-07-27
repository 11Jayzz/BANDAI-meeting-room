import { cn } from '@/lib/cn';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const sizeClass = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
} as const;

export function Spinner({ size = 'md', className, label }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn(
        'inline-block animate-spin rounded-full border-brand-200 border-t-brand-600',
        sizeClass[size],
        className,
      )}
    />
  );
}
