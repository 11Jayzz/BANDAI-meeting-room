import type { ReactNode } from 'react';
import { Input, type InputProps } from '@/components/atoms/Input';
import { Text } from '@/components/atoms/Text';
import { cn } from '@/lib/cn';

export interface FormFieldProps extends Omit<InputProps, 'id' | 'isInvalid'> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  trailing?: ReactNode;
}

export function FormField({
  id,
  label,
  hint,
  error,
  className,
  trailing,
  ...inputProps
}: FormFieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const isInvalid = Boolean(error);

  return (
    <div className={cn('flex w-full flex-col gap-1.5', className)}>
      <Text as="label" htmlFor={id} variant="label">
        {label}
      </Text>

      <div className="relative">
        <Input
          id={id}
          isInvalid={isInvalid}
          aria-describedby={describedBy}
          {...inputProps}
        />
        {trailing ? (
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            {trailing}
          </div>
        ) : null}
      </div>

      {error ? (
        <Text id={`${id}-error`} variant="caption" tone="danger" role="alert">
          {error}
        </Text>
      ) : hint ? (
        <Text id={`${id}-hint`} variant="caption" tone="muted">
          {hint}
        </Text>
      ) : null}
    </div>
  );
}
