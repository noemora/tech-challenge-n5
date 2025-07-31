import { useQuery } from '@tanstack/react-query';
import { fetchMovieCredits } from '../services/movieApi.js';
import { transformCreditsToActors } from '../utils/actorTransforms.js';

// TanStack Query hook for fetching actors
export const useActors = (movieId, limit = 10) => {
  return useQuery({
    queryKey: ['actors', movieId, limit],
    queryFn: async () => {
      const creditsData = await fetchMovieCredits(movieId);
      return transformCreditsToActors(creditsData, limit);
    },
    enabled: !!movieId, // Only fetch if movieId exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => data || [], // Ensure we always return an array
  });
};
