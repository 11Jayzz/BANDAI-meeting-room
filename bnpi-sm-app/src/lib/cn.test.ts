import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/cn';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
  });

  it('resolves conflicting Tailwind utilities', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('ignores falsy values', () => {
    const hiddenWhen = false;
    const maybeHidden = hiddenWhen ? 'hidden' : undefined;
    expect(cn('base', maybeHidden, undefined, 'ok')).toBe('base ok');
  });
});
