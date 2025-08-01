import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchSeriesCredits, getImageUrl } from '../services/seriesApi';

// Mock fetch globally
globalThis.fetch = vi.fn();

describe('seriesApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchSeriesCredits', () => {
    it('fetches series credits successfully', async () => {
      const mockResponse = {
        cast: [
          {
            id: 1,
            name: 'Test Actor',
            character: 'Test Character',
            profile_path: '/test.jpg',
          },
        ],
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchSeriesCredits(123, 'en-US');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/tv/123/credits?language=en-US'),
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

      await expect(fetchSeriesCredits(999)).rejects.toThrow(
        'HTTP error! status: 404'
      );
    });

    it('handles network errors correctly', async () => {
      const networkError = new Error('Network error');
      fetch.mockRejectedValueOnce(networkError);

      await expect(fetchSeriesCredits(123)).rejects.toThrow('Network error');
    });

    it('uses default language when not specified', async () => {
      const mockResponse = { cast: [] };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await fetchSeriesCredits(123);

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

      await fetchSeriesCredits(123, 'es-ES');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('language=es-ES'),
        expect.any(Object)
      );
    });
  });

  describe('getImageUrl', () => {
    it('returns full image URL when path is provided', () => {
      const imagePath = '/test-image.jpg';
      const result = getImageUrl(imagePath);

      expect(result).toContain('/test-image.jpg');
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

    it('handles image paths with different formats', () => {
      const testPaths = [
        '/image.jpg',
        '/image.png',
        '/subfolder/image.webp',
        '/very/deep/folder/structure/image.gif',
      ];

      testPaths.forEach((path) => {
        const result = getImageUrl(path);
        expect(result).toContain(path);
        expect(result).toMatch(/^https?:\/\//);
      });
    });
  });
});
