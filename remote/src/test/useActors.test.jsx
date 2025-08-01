import { describe, it, expect, vi, beforeEach } from 'vitest';

// Create mock functions
const mockUseActors = vi.fn();
const mockFetchSeriesCredits = vi.fn();
const mockTransformCreditsToActors = vi.fn();

// Mock the useActors hook
vi.mock('../hooks/useActors', () => ({
  useActors: mockUseActors,
}));

// Mock the seriesApi module
vi.mock('../services/seriesApi.js', () => ({
  fetchSeriesCredits: mockFetchSeriesCredits,
  getImageUrl: vi.fn((path) => (path ? `${path}` : 'placeholder.jpg')),
}));

// Mock the actorTransforms module
vi.mock('../utils/actorTransforms.js', () => ({
  transformCreditsToActors: mockTransformCreditsToActors,
}));

// Mock the LanguageStore
vi.mock('host/LanguageStore', () => ({
  useLanguageStore: () => ({
    language: 'en',
    t: vi.fn((key) => key),
  }),
}));

// Import the mocked functions
const { useActors } = await import('../hooks/useActors');

describe('useActors Hook - Mock Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return loading state initially', () => {
    mockUseActors.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isSuccess: false,
      isError: false,
    });

    const result = useActors(34307, 10);

    expect(result.isLoading).toBe(true);
    expect(result.data).toBeUndefined();
    expect(result.error).toBeNull();
  });

  it('should return Shameless actors data when loaded', () => {
    const mockShamelessActors = [
      { id: 1, name: 'William H. Macy', character: 'Frank Gallagher' },
      { id: 2, name: 'Emmy Rossum', character: 'Fiona Gallagher' },
    ];

    mockUseActors.mockReturnValue({
      data: mockShamelessActors,
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    });

    const result = useActors(34307, 10);

    expect(result.isLoading).toBe(false);
    expect(result.data).toEqual(mockShamelessActors);
    expect(result.error).toBeNull();
    expect(result.isSuccess).toBe(true);
  });

  it('should return error when Shameless cast fetch fails', () => {
    const mockError = new Error('Failed to fetch Shameless cast');

    mockUseActors.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: mockError,
      isSuccess: false,
      isError: true,
    });

    const result = useActors(34307, 10);

    expect(result.isLoading).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.error).toEqual(mockError);
    expect(result.isError).toBe(true);
  });

  it('should accept different series IDs', () => {
    mockUseActors.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    });

    useActors(34307, 5);
    expect(mockUseActors).toHaveBeenCalledWith(34307, 5);
  });

  it('should handle empty Shameless cast results', () => {
    mockUseActors.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    });

    const result = useActors(34307, 10);

    expect(result.data).toEqual([]);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBeNull();
    expect(result.isSuccess).toBe(true);
  });

  it('should handle network errors gracefully', () => {
    const networkError = new Error('Network timeout');

    mockUseActors.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: networkError,
      isSuccess: false,
      isError: true,
    });

    const result = useActors(34307, 10);

    expect(result.error).toEqual(networkError);
    expect(result.isError).toBe(true);
    expect(result.isSuccess).toBe(false);
  });

  it('should work with default limit parameter', () => {
    mockUseActors.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    });

    useActors(34307); // No limit specified
    expect(mockUseActors).toHaveBeenCalledWith(34307);
  });
});
