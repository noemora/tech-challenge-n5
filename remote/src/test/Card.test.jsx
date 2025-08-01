import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';

describe('Card Component', () => {
  const mockProps = {
    image: 'https://example.com/frank.jpg',
    title: 'Frank Gallagher',
    content: 'Character: Frank Gallagher (Shameless)',
  };

  it('renders card with all props correctly', () => {
    render(<Card {...mockProps} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('Frank Gallagher')).toBeInTheDocument();
    expect(
      screen.getByText('Character: Frank Gallagher (Shameless)')
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
    expect(heading).toHaveTextContent('Frank Gallagher');
  });

  it('renders content description', () => {
    render(<Card {...mockProps} />);

    expect(
      screen.getByText('Character: Frank Gallagher (Shameless)')
    ).toBeInTheDocument();
  });

  it('handles empty content gracefully', () => {
    const propsWithEmptyContent = {
      ...mockProps,
      content: '',
    };

    render(<Card {...propsWithEmptyContent} />);

    expect(screen.getByText('Frank Gallagher')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('handles long title text', () => {
    const propsWithLongTitle = {
      ...mockProps,
      title: 'Frank Vincent Gallagher Sr. - Patriarch of the Gallagher Family',
    };

    render(<Card {...propsWithLongTitle} />);

    expect(screen.getByText(propsWithLongTitle.title)).toBeInTheDocument();
  });

  it('handles long content text', () => {
    const propsWithLongContent = {
      ...mockProps,
      content:
        'Character: Frank Gallagher is an alcoholic and drug abuser who neglects his children after his wife Monica abandons the family',
    };

    render(<Card {...propsWithLongContent} />);

    expect(screen.getByText(propsWithLongContent.content)).toBeInTheDocument();
  });
});
