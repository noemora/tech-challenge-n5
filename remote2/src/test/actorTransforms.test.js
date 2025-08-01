import { describe, it, expect, vi } from 'vitest';
import {
  transformActor,
  transformCreditsToActors,
} from '../utils/actorTransforms';

// Mock the movieApi module
vi.mock('../services/movieApi.js', () => ({
  getImageUrl: vi.fn((path) =>
    path
      ? `https://example.com${path}`
      : 'https://via.placeholder.com/500x750?text=No+Image'
  ),
}));

describe('actorTransforms - Remote2', () => {
  const mockT = vi.fn((key) => {
    const translations = {
      character: 'Character',
      unknown: 'Unknown',
    };
    return translations[key] || key;
  });

  describe('transformActor', () => {
    it('transforms movie actor data correctly', () => {
      const apiActor = {
        id: 1,
        name: 'Adam Sandler',
        profile_path: '/adam-sandler.jpg',
        character: 'Michael Newman',
      };

      const result = transformActor(apiActor, mockT);

      expect(result).toEqual({
        id: 1,
        name: 'Adam Sandler',
        image: 'https://example.com/adam-sandler.jpg',
        description: 'Character: Michael Newman',
      });
    });

    it('handles missing profile path for movie characters', () => {
      const apiActor = {
        id: 1,
        name: 'Kate Beckinsale',
        profile_path: null,
        character: 'Donna Newman',
      };

      const result = transformActor(apiActor, mockT);

      expect(result.image).toBe(
        'https://via.placeholder.com/500x750?text=No+Image'
      );
      expect(result.description).toBe('Character: Donna Newman');
    });

    it('handles missing character information for movies', () => {
      const apiActor = {
        id: 1,
        name: 'Christopher Walken',
        profile_path: '/christopher-walken.jpg',
        character: null,
      };

      const result = transformActor(apiActor, mockT);

      expect(result.description).toBe('Character: Unknown');
    });

    it('handles empty character string for movies', () => {
      const apiActor = {
        id: 1,
        name: 'David Hasselhoff',
        profile_path: '/david-hasselhoff.jpg',
        character: '',
      };

      const result = transformActor(apiActor, mockT);

      expect(result.description).toBe('Character: Unknown');
    });

    it('preserves actor ID correctly', () => {
      const apiActor = {
        id: 999,
        name: 'Sean Astin',
        profile_path: '/sean-astin.jpg',
        character: 'Bill Newman',
      };

      const result = transformActor(apiActor, mockT);

      expect(result.id).toBe(999);
    });
  });

  describe('transformCreditsToActors', () => {
    it('transforms movie credits data to actors array', () => {
      const creditsData = {
        cast: [
          {
            id: 1,
            name: 'Adam Sandler',
            profile_path: '/adam.jpg',
            character: 'Michael Newman',
          },
          {
            id: 2,
            name: 'Kate Beckinsale',
            profile_path: '/kate.jpg',
            character: 'Donna Newman',
          },
        ],
      };

      const result = transformCreditsToActors(creditsData, mockT, 2);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 1,
        name: 'Adam Sandler',
        image: 'https://example.com/adam.jpg',
        description: 'Character: Michael Newman',
      });
      expect(result[1]).toEqual({
        id: 2,
        name: 'Kate Beckinsale',
        image: 'https://example.com/kate.jpg',
        description: 'Character: Donna Newman',
      });
    });

    it('respects the limit parameter for movie cast', () => {
      const creditsData = {
        cast: Array.from({ length: 15 }, (_, i) => ({
          id: i + 1,
          name: `Movie Actor ${i + 1}`,
          profile_path: `/movie-actor${i + 1}.jpg`,
          character: `Movie Character ${i + 1}`,
        })),
      };

      const result = transformCreditsToActors(creditsData, mockT, 3);

      expect(result).toHaveLength(3);
      expect(result[0].name).toBe('Movie Actor 1');
      expect(result[2].name).toBe('Movie Actor 3');
    });

    it('handles missing cast data for movies', () => {
      const creditsData = {};

      const result = transformCreditsToActors(creditsData, mockT);

      expect(result).toEqual([]);
    });

    it('handles null movie credits data', () => {
      const result = transformCreditsToActors(null, mockT);

      expect(result).toEqual([]);
    });

    it('handles empty movie cast array', () => {
      const creditsData = {
        cast: [],
      };

      const result = transformCreditsToActors(creditsData, mockT);

      expect(result).toEqual([]);
    });

    it('uses default limit for movie cast when not specified', () => {
      const creditsData = {
        cast: Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          name: `Movie Actor ${i + 1}`,
          profile_path: `/movie-actor${i + 1}.jpg`,
          character: `Movie Character ${i + 1}`,
        })),
      };

      const result = transformCreditsToActors(creditsData, mockT);

      expect(result).toHaveLength(10); // Default limit
    });

    it('handles movie cast with mixed data quality', () => {
      const creditsData = {
        cast: [
          {
            id: 1,
            name: 'Complete Actor',
            profile_path: '/complete.jpg',
            character: 'Complete Character',
          },
          {
            id: 2,
            name: 'No Image Actor',
            profile_path: null,
            character: 'No Image Character',
          },
          {
            id: 3,
            name: 'No Character Actor',
            profile_path: '/no-char.jpg',
            character: '',
          },
        ],
      };

      const result = transformCreditsToActors(creditsData, mockT, 3);

      expect(result).toHaveLength(3);
      expect(result[0].image).toBe('https://example.com/complete.jpg');
      expect(result[1].image).toBe(
        'https://via.placeholder.com/500x750?text=No+Image'
      );
      expect(result[2].description).toBe('Character: Unknown');
    });
  });
});
