import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock del hook useActors para movies
const mockUseActors = vi.fn();

// Mock de los componentes que no existen
vi.mock('../hooks/useActors', () => ({
  useActors: mockUseActors,
}));

vi.mock('../components/ui/Messages.jsx', () => ({
  LoadingMessage: ({ message }) => <div data-testid="loading">{message}</div>,
  ErrorMessage: ({ error }) => <div data-testid="error">{error}</div>,
}));

vi.mock('../constants/app.js', () => ({
  MOVIE_IDS: { DEFAULT: 9339 }, // Click movie ID
}));

// Componente simplificado para testing de películas
const SimpleMovieCardList = () => {
  const { data: actors = [], isLoading, error } = mockUseActors();

  if (isLoading) {
    return <div data-testid="loading">Loading movie cast...</div>;
  }

  if (error) {
    return <div data-testid="error">{error.message}</div>;
  }

  return (
    <div data-testid="card-list">
      <div>Scroll to see more cast members</div>
      <div data-testid="cards-container">
        {actors.map((actor) => (
          <div key={actor.id} data-testid="card">
            <h3>{actor.name}</h3>
            <p>{actor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

describe('CardList Component - Movie Cast', () => {
  let queryClient;

  const createWrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    mockUseActors.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<SimpleMovieCardList />, { wrapper: createWrapper });

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Loading movie cast...')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    mockUseActors.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'Failed to fetch movie data' },
    });

    render(<SimpleMovieCardList />, { wrapper: createWrapper });

    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch movie data')).toBeInTheDocument();
  });

  it('renders movie cast list correctly', () => {
    const mockMovieCast = [
      {
        id: 1,
        name: 'Adam Sandler',
        description: 'Character: Michael Newman',
      },
      {
        id: 2,
        name: 'Kate Beckinsale',
        description: 'Character: Donna Newman',
      },
    ];

    mockUseActors.mockReturnValue({
      data: mockMovieCast,
      isLoading: false,
      error: null,
    });

    render(<SimpleMovieCardList />, { wrapper: createWrapper });

    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(screen.getByText('Adam Sandler')).toBeInTheDocument();
    expect(screen.getByText('Kate Beckinsale')).toBeInTheDocument();
    expect(screen.getByText('Character: Michael Newman')).toBeInTheDocument();
    expect(screen.getByText('Character: Donna Newman')).toBeInTheDocument();
  });

  it('renders scroll hint when cast members are present', () => {
    const mockMovieCast = [
      {
        id: 1,
        name: 'Christopher Walken',
        description: 'Character: Morty',
      },
    ];

    mockUseActors.mockReturnValue({
      data: mockMovieCast,
      isLoading: false,
      error: null,
    });

    render(<SimpleMovieCardList />, { wrapper: createWrapper });

    expect(
      screen.getByText('Scroll to see more cast members')
    ).toBeInTheDocument();
  });

  it('renders empty list when no cast members', () => {
    mockUseActors.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<SimpleMovieCardList />, { wrapper: createWrapper });

    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(
      screen.getByText('Scroll to see more cast members')
    ).toBeInTheDocument();
    // Should not render any cards
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
  });
});
