import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type TextVariant = 'body' | 'bodySm' | 'label' | 'caption' | 'title' | 'subtitle' | 'display';
type TextTone = 'default' | 'muted' | 'inverse' | 'danger' | 'brand';

export interface TextProps {
  as?: ElementType;
  variant?: TextVariant;
  tone?: TextTone;
  className?: string;
  children: ReactNode;
  id?: string;
  htmlFor?: string;
  role?: string;
  'data-testid'?: string;
}

const variantClass: Record<TextVariant, string> = {
  body: 'text-base leading-normal',
  bodySm: 'text-sm leading-normal',
  label: 'text-sm font-medium leading-normal',
  caption: 'text-xs leading-normal',
  title: 'text-2xl font-semibold leading-tight tracking-tight',
  subtitle: 'text-lg font-medium leading-snug',
  display: 'text-3xl font-semibold leading-tight tracking-tight',
};

const toneClass: Record<TextTone, string> = {
  default: 'text-text',
  muted: 'text-text-muted',
  inverse: 'text-text-inverse',
  danger: 'text-danger',
  brand: 'text-brand-600',
};

export function Text({
  as: Component = 'p',
  variant = 'body',
  tone = 'default',
  className,
  children,
  id,
  htmlFor,
  role,
  'data-testid': dataTestId,
}: TextProps) {
  return (
    <Component
      id={id}
      htmlFor={htmlFor}
      role={role}
      data-testid={dataTestId}
      className={cn(variantClass[variant], toneClass[tone], className)}
    >
      {children}
    </Component>
  );
}
