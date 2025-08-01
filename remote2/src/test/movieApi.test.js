import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchMovieCredits, getImageUrl } from '../services/movieApi';

// Mock fetch globally
globalThis.fetch = vi.fn();

describe('movieApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchMovieCredits', () => {
    it('fetches movie credits successfully', async () => {
      const mockResponse = {
        cast: [
          {
            id: 1,
            name: 'Test Movie Actor',
            character: 'Test Movie Character',
            profile_path: '/movie-test.jpg',
          },
        ],
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchMovieCredits(456, 'en-US');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/movie/456/credits?language=en-US'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Authorization: expect.stringContaining('Bearer'),
            accept: 'application/json',
          }),
        })
      );

      expect(result).toEqual(mockResponse);
    });

    it('handles API errors correctly', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(fetchMovieCredits(999)).rejects.toThrow(
        'HTTP error! status: 404'
      );
    });

    it('handles network errors correctly', async () => {
      const networkError = new Error('Network error');
      fetch.mockRejectedValueOnce(networkError);

      await expect(fetchMovieCredits(456)).rejects.toThrow('Network error');
    });

    it('uses default language when not specified', async () => {
      const mockResponse = { cast: [] };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await fetchMovieCredits(456);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('language=en-US'),
        expect.any(Object)
      );
    });

    it('uses custom language when specified', async () => {
      const mockResponse = { cast: [] };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await fetchMovieCredits(456, 'es-ES');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('language=es-ES'),
        expect.any(Object)
      );
    });

    it('constructs correct movie endpoint URL', async () => {
      const mockResponse = { cast: [] };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await fetchMovieCredits(123);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/movie/123/credits'),
        expect.any(Object)
      );
    });
  });

  describe('getImageUrl', () => {
    it('returns full image URL when path is provided', () => {
      const imagePath = '/movie-image.jpg';
      const result = getImageUrl(imagePath);

      expect(result).toContain('/movie-image.jpg');
      expect(result).toMatch(/^https?:\/\//);
    });

    it('returns placeholder URL when path is null', () => {
      const result = getImageUrl(null);

      expect(result).toBe('https://via.placeholder.com/500x750?text=No+Image');
    });

    it('returns placeholder URL when path is undefined', () => {
      const result = getImageUrl(undefined);

      expect(result).toBe('https://via.placeholder.com/500x750?text=No+Image');
    });

    it('returns placeholder URL when path is empty string', () => {
      const result = getImageUrl('');

      expect(result).toBe('https://via.placeholder.com/500x750?text=No+Image');
    });

    it('handles movie poster paths correctly', () => {
      const testPaths = [
        '/movie-poster.jpg',
        '/character-headshot.png',
        '/actor-profile.webp',
        '/poster/high-res.jpg',
      ];

      testPaths.forEach((path) => {
        const result = getImageUrl(path);
        expect(result).toContain(path);
        expect(result).toMatch(/^https?:\/\//);
      });
    });

    it('maintains consistent placeholder format', () => {
      const result = getImageUrl(null);
      expect(result).toMatch(/placeholder\.com/);
      expect(result).toContain('No+Image');
    });
  });
});
