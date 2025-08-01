import { useQuery } from '@tanstack/react-query';
import { fetchSeriesCredits } from '../services/seriesApi.js';
import { transformCreditsToActors } from '../utils/actorTransforms.js';
import { QUERY_CONFIG } from '../constants/app.js';
import { useLanguageStore } from 'host/LanguageStore';

// TanStack Query hook for fetching actors
export const useActors = (seriesId, limit = 10) => {
  const { language } = useLanguageStore();
  const apiLanguage = language === 'es' ? 'es-ES' : 'en-US';

  const query = useQuery({
    queryKey: ['actors', seriesId, limit, language],
    queryFn: async () => {
      const creditsData = await fetchSeriesCredits(seriesId, apiLanguage);
      return transformCreditsToActors(creditsData, limit);
    },
    enabled: !!seriesId, // Only fetch when seriesId exists
    staleTime: QUERY_CONFIG.STALE_TIME,
    select: (data) => data || [], // Ensure we always return an array
  });

  return query;
};
