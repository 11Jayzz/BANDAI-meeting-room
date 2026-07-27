import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '@/components/atoms/Button/Button';

describe('Button', () => {
  it('renders children and handles click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire click when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );

    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('exposes aria-busy while loading', () => {
    render(<Button isLoading>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('aria-busy', 'true');
  });
});
