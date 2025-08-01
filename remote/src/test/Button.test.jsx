import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../components/Button';

describe('Button Component', () => {
  it('renders with default text', () => {
    render(<Button />);

    expect(
      screen.getByRole('button', { name: 'Load Actors' })
    ).toBeInTheDocument();
  });

  it('renders with custom children text', () => {
    render(<Button>Load Shameless Actors</Button>);

    expect(
      screen.getByRole('button', { name: 'Load Shameless Actors' })
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const mockOnClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={mockOnClick}>Click Me</Button>);

    const button = screen.getByRole('button', { name: 'Click Me' });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('is enabled by default', () => {
    render(<Button>Test Button</Button>);

    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeEnabled();
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });

  it('does not call onClick when disabled', async () => {
    const mockOnClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={mockOnClick} disabled>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Disabled Button' });
    await user.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('handles keyboard interaction', async () => {
    const mockOnClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={mockOnClick}>Keyboard Test</Button>);

    const button = screen.getByRole('button', { name: 'Keyboard Test' });
    button.focus();
    await user.keyboard('{Enter}');

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('handles space key press', async () => {
    const mockOnClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={mockOnClick}>Space Test</Button>);

    const button = screen.getByRole('button', { name: 'Space Test' });
    button.focus();
    await user.keyboard(' ');

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('accepts custom click handlers with different parameters', () => {
    const mockOnClick = vi.fn();

    render(
      <Button onClick={() => mockOnClick('custom-param')}>
        Custom Handler
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Custom Handler' });
    button.click();

    expect(mockOnClick).toHaveBeenCalledWith('custom-param');
  });

  it('renders different content types as children', () => {
    const content = (
      <span>
        <span>Load</span> <strong>Actors</strong>
      </span>
    );

    render(<Button>{content}</Button>);

    expect(screen.getByText('Load')).toBeInTheDocument();
    expect(screen.getByText('Actors')).toBeInTheDocument();
  });
});
