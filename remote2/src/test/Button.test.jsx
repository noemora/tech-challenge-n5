import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../components/Button';

describe('Button Component - Remote2', () => {
  it('renders with default movie-related text', () => {
    render(<Button />);

    expect(
      screen.getByRole('button', { name: 'Load Actors' })
    ).toBeInTheDocument();
  });

  it('renders with custom movie button text', () => {
    render(<Button>Load Click Actors</Button>);

    expect(
      screen.getByRole('button', { name: 'Load Click Actors' })
    ).toBeInTheDocument();
  });

  it('calls onClick when movie button is clicked', async () => {
    const mockOnClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={mockOnClick}>Load Click Cast</Button>);

    const button = screen.getByRole('button', {
      name: 'Load Click Cast',
    });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('handles movie loading states', () => {
    render(<Button disabled>Loading Click Cast...</Button>);

    const button = screen.getByRole('button', {
      name: 'Loading Click Cast...',
    });
    expect(button).toBeDisabled();
  });

  it('handles movie-specific click handlers', async () => {
    const mockLoadMovieCast = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={() => mockLoadMovieCast('click-movie')}>
        Load Cast
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Load Cast' });
    await user.click(button);

    expect(mockLoadMovieCast).toHaveBeenCalledWith('click-movie');
  });

  it('supports accessibility for movie buttons', async () => {
    const mockOnClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={mockOnClick}>Load Movie Actors</Button>);

    const button = screen.getByRole('button', { name: 'Load Movie Actors' });

    // Test keyboard navigation
    button.focus();
    await user.keyboard('{Enter}');

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('handles movie genre specific buttons', () => {
    render(<Button>Load Comedy Movie Cast</Button>);

    expect(
      screen.getByRole('button', { name: 'Load Comedy Movie Cast' })
    ).toBeInTheDocument();
  });

  it('prevents interaction when movie data is loading', async () => {
    const mockOnClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={mockOnClick} disabled>
        Loading...
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Loading...' });
    await user.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('handles complex movie button content', () => {
    const movieContent = (
      <span>
        Load <strong>Click Movie</strong> Cast
      </span>
    );

    render(<Button>{movieContent}</Button>);

    expect(screen.getByText('Click Movie')).toBeInTheDocument();
    expect(screen.getByText(/Load.*Cast/)).toBeInTheDocument();
  });
  it('maintains button functionality across movie categories', async () => {
    const mockLoadAction = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <Button onClick={mockLoadAction}>Load Comedy Cast</Button>
    );

    let button = screen.getByRole('button', { name: 'Load Comedy Cast' });
    await user.click(button);

    expect(mockLoadAction).toHaveBeenCalledTimes(1);

    // Test with different movie category
    rerender(<Button onClick={mockLoadAction}>Load Romance Cast</Button>);

    button = screen.getByRole('button', { name: 'Load Romance Cast' });
    await user.click(button);

    expect(mockLoadAction).toHaveBeenCalledTimes(2);
  });
});
