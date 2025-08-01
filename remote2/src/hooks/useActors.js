import { useQuery } from '@tanstack/react-query';
import { fetchMovieCredits } from '../services/movieApi.js';
import { transformCreditsToActors } from '../utils/actorTransforms.js';
import { QUERY_CONFIG } from '../constants/app.js';
import { useLanguageStore } from 'host/LanguageStore';

// TanStack Query hook for fetching actors
export const useActors = (movieId, limit = 10) => {
  const { language, t } = useLanguageStore();
  const apiLanguage = language === 'es' ? 'es-ES' : 'en-US';

  const query = useQuery({
    queryKey: ['actors', movieId, limit, language],
    queryFn: async () => {
      const creditsData = await fetchMovieCredits(movieId, apiLanguage);
      return transformCreditsToActors(creditsData, t, limit);
    },
    enabled: !!movieId, // Only fetch when movieId exists
    staleTime: QUERY_CONFIG.STALE_TIME,
    select: (data) => data || [], // Ensure we always return an array
  });

  return query;
};
