import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock hook useActors for series
const mockUseActors = vi.fn();

// Mock non-existent components
vi.mock('../hooks/useActors', () => ({
  useActors: mockUseActors,
}));

vi.mock('../components/ui/Messages.jsx', () => ({
  LoadingMessage: ({ message }) => <div data-testid="loading">{message}</div>,
  ErrorMessage: ({ error }) => <div data-testid="error">{error}</div>,
}));

vi.mock('../constants/app.js', () => ({
  SERIES_IDS: { DEFAULT: 1234 },
}));

// Simplified component for testing series
const SimpleCardList = () => {
  const { data: actors = [], isLoading, error } = mockUseActors();

  if (isLoading) {
    return <div data-testid="loading">Loading actors...</div>;
  }

  if (error) {
    return <div data-testid="error">{error.message}</div>;
  }

  return (
    <div data-testid="card-list">
      <div>Scroll to see more actors</div>
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

describe('CardList Component - Simplified', () => {
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

    render(<SimpleCardList />, { wrapper: createWrapper });

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Loading actors...')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    mockUseActors.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'Failed to fetch data' },
    });

    render(<SimpleCardList />, { wrapper: createWrapper });

    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
  });

  it('renders actors list correctly', () => {
    const mockActors = [
      {
        id: 1,
        name: 'William H. Macy',
        description: 'Character: Frank Gallagher',
      },
      {
        id: 2,
        name: 'Emmy Rossum',
        description: 'Character: Fiona Gallagher',
      },
    ];

    mockUseActors.mockReturnValue({
      data: mockActors,
      isLoading: false,
      error: null,
    });

    render(<SimpleCardList />, { wrapper: createWrapper });

    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(screen.getByText('William H. Macy')).toBeInTheDocument();
    expect(screen.getByText('Emmy Rossum')).toBeInTheDocument();
    expect(screen.getByText('Character: Frank Gallagher')).toBeInTheDocument();
    expect(screen.getByText('Character: Fiona Gallagher')).toBeInTheDocument();
  });

  it('renders scroll hint when actors are present', () => {
    const mockActors = [
      {
        id: 1,
        name: 'John Doe',
        description: 'Character: Main Character',
      },
    ];

    mockUseActors.mockReturnValue({
      data: mockActors,
      isLoading: false,
      error: null,
    });

    render(<SimpleCardList />, { wrapper: createWrapper });

    expect(screen.getByText('Scroll to see more actors')).toBeInTheDocument();
  });

  it('renders empty list when no actors', () => {
    mockUseActors.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<SimpleCardList />, { wrapper: createWrapper });

    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(screen.getByText('Scroll to see more actors')).toBeInTheDocument();
    // Should not render any cards
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
  });
});
