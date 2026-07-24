import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, isInvalid = false, type = 'text', id, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      id={id}
      type={type}
      aria-invalid={isInvalid || undefined}
      className={cn(
        'h-10 w-full rounded-md border bg-surface px-3 text-sm text-text',
        'placeholder:text-text-muted',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
        'disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-70',
        isInvalid ? 'border-danger focus-visible:ring-danger' : 'border-border',
        className,
      )}
      {...rest}
    />
  );
});
