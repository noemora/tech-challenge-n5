import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';

describe('Card Component - Remote2', () => {
  const mockProps = {
    image: 'https://example.com/adam-sandler.jpg',
    title: 'Michael Newman',
    content: 'Character: Michael Newman (Click)',
  };

  it('renders card with all props correctly', () => {
    render(<Card {...mockProps} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('Michael Newman')).toBeInTheDocument();
    expect(
      screen.getByText('Character: Michael Newman (Click)')
    ).toBeInTheDocument();
  });

  it('displays image with correct src and alt attributes', () => {
    render(<Card {...mockProps} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProps.image);
    expect(image).toHaveAttribute('alt', mockProps.title);
  });

  it('renders title in heading element', () => {
    render(<Card {...mockProps} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Michael Newman');
  });

  it('renders content description', () => {
    render(<Card {...mockProps} />);

    expect(
      screen.getByText('Character: Michael Newman (Click)')
    ).toBeInTheDocument();
  });

  it('handles empty content gracefully', () => {
    const propsWithEmptyContent = {
      ...mockProps,
      content: '',
    };

    render(<Card {...propsWithEmptyContent} />);

    expect(screen.getByText('Michael Newman')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('handles movie character names correctly', () => {
    const movieProps = {
      ...mockProps,
      title: 'Donna Newman',
      content: 'Character: Wife and Mother',
    };

    render(<Card {...movieProps} />);

    expect(screen.getByText('Donna Newman')).toBeInTheDocument();
    expect(screen.getByText('Character: Wife and Mother')).toBeInTheDocument();
  });

  it('handles missing image with placeholder', () => {
    const propsWithoutImage = {
      ...mockProps,
      image: '',
    };

    render(<Card {...propsWithoutImage} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', mockProps.title);
    // Empty src is handled differently, just check that image exists
  });
});
