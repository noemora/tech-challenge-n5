import { useQuery } from '@tanstack/react-query';
import { fetchMovieCredits } from '../services/movieApi.js';
import { transformCreditsToActors } from '../utils/actorTransforms.js';
import { QUERY_CONFIG } from '../constants/app.js';

// TanStack Query hook for fetching actors - only when enabled
export const useActors = (movieId, limit = 10, enabled = false) => {
  return useQuery({
    queryKey: ['actors', movieId, limit],
    queryFn: async () => {
      const creditsData = await fetchMovieCredits(movieId);
      return transformCreditsToActors(creditsData, limit);
    },
    enabled: enabled && !!movieId, // Only fetch when explicitly enabled and movieId exists
    staleTime: QUERY_CONFIG.STALE_TIME,
    select: (data) => data || [], // Ensure we always return an array
  });
};
