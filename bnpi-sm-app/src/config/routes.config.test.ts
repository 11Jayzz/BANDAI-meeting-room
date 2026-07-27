import { describe, expect, it } from 'vitest';
import { ROUTE_META, ROUTES } from '@/config/routes.config';

describe('routes.config', () => {
  it('exposes a home route at root', () => {
    expect(ROUTES.home).toBe('/');
  });

  it('keeps route meta aligned with route paths', () => {
    expect(ROUTE_META.home.path).toBe(ROUTES.home);
    expect(ROUTE_META.home.titleKey).toMatch(/^nav:/);
  });
});
