import { useQuery } from '@tanstack/react-query';
import { fetchMovieCredits } from '../services/movieApi.js';
import { transformCreditsToActors } from '../utils/actorTransforms.js';
import { QUERY_CONFIG } from '../constants/app.js';

// TanStack Query hook for fetching actors
export const useActors = (movieId, limit = 10) => {
  return useQuery({
    queryKey: ['actors', movieId, limit],
    queryFn: async () => {
      const creditsData = await fetchMovieCredits(movieId);
      return transformCreditsToActors(creditsData, limit);
    },
    enabled: !!movieId, // Only fetch when movieId exists
    staleTime: QUERY_CONFIG.STALE_TIME,
    select: (data) => data || [], // Ensure we always return an array
  });
};
