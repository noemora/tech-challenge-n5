import { describe, it, expect, vi } from 'vitest';
import {
  transformActor,
  transformCreditsToActors,
} from '../utils/actorTransforms';

// Mock the seriesApi module
vi.mock('../services/seriesApi.js', () => ({
  getImageUrl: vi.fn((path) =>
    path
      ? `https://example.com${path}`
      : 'https://via.placeholder.com/500x750?text=No+Image'
  ),
}));

describe('actorTransforms', () => {
  const mockT = vi.fn((key) => {
    const translations = {
      character: 'Character',
      unknown: 'Unknown',
    };
    return translations[key] || key;
  });

  describe('transformActor', () => {
    it('transforms actor data correctly', () => {
      const apiActor = {
        id: 1,
        name: 'William H. Macy',
        profile_path: '/william-macy.jpg',
        character: 'Frank Gallagher',
      };

      const result = transformActor(apiActor, mockT);

      expect(result).toEqual({
        id: 1,
        name: 'William H. Macy',
        image: 'https://example.com/william-macy.jpg',
        description: 'Character: Frank Gallagher',
      });
    });

    it('handles missing profile path', () => {
      const apiActor = {
        id: 1,
        name: 'Emmy Rossum',
        profile_path: null,
        character: 'Fiona Gallagher',
      };

      const result = transformActor(apiActor, mockT);

      expect(result.image).toBe(
        'https://via.placeholder.com/500x750?text=No+Image'
      );
    });

    it('handles missing character information', () => {
      const apiActor = {
        id: 1,
        name: 'Jeremy Allen White',
        profile_path: '/jeremy-white.jpg',
        character: null,
      };

      const result = transformActor(apiActor, mockT);

      expect(result.description).toBe('Character: Unknown');
    });

    it('handles empty character string', () => {
      const apiActor = {
        id: 1,
        name: 'Cameron Monaghan',
        profile_path: '/cameron.jpg',
        character: '',
      };

      const result = transformActor(apiActor, mockT);

      expect(result.description).toBe('Character: Unknown');
    });
  });

  describe('transformCreditsToActors', () => {
    it('transforms credits data to actors array', () => {
      const creditsData = {
        cast: [
          {
            id: 1,
            name: 'William H. Macy',
            profile_path: '/william-macy.jpg',
            character: 'Frank Gallagher',
          },
          {
            id: 2,
            name: 'Emmy Rossum',
            profile_path: '/emmy-rossum.jpg',
            character: 'Fiona Gallagher',
          },
        ],
      };

      const result = transformCreditsToActors(creditsData, mockT, 2);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 1,
        name: 'William H. Macy',
        image: 'https://example.com/william-macy.jpg',
        description: 'Character: Frank Gallagher',
      });
      expect(result[1]).toEqual({
        id: 2,
        name: 'Emmy Rossum',
        image: 'https://example.com/emmy-rossum.jpg',
        description: 'Character: Fiona Gallagher',
      });
    });

    it('respects the limit parameter', () => {
      const creditsData = {
        cast: Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          name: `Actor ${i + 1}`,
          profile_path: `/actor${i + 1}.jpg`,
          character: `Character ${i + 1}`,
        })),
      };

      const result = transformCreditsToActors(creditsData, mockT, 5);

      expect(result).toHaveLength(5);
    });

    it('handles missing cast data', () => {
      const creditsData = {};

      const result = transformCreditsToActors(creditsData, mockT);

      expect(result).toEqual([]);
    });

    it('handles null credits data', () => {
      const result = transformCreditsToActors(null, mockT);

      expect(result).toEqual([]);
    });

    it('handles empty cast array', () => {
      const creditsData = {
        cast: [],
      };

      const result = transformCreditsToActors(creditsData, mockT);

      expect(result).toEqual([]);
    });

    it('uses default limit when not specified', () => {
      const creditsData = {
        cast: Array.from({ length: 15 }, (_, i) => ({
          id: i + 1,
          name: `Actor ${i + 1}`,
          profile_path: `/actor${i + 1}.jpg`,
          character: `Character ${i + 1}`,
        })),
      };

      const result = transformCreditsToActors(creditsData, mockT);

      expect(result).toHaveLength(10); // Default limit
    });
  });
});
