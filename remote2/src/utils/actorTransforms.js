import { getImageUrl } from '../services/movieApi.js';
import { useLanguageStore } from 'host/LanguageStore';

// Pure function to transform actor data from API response
export const transformActor = (apiActor) => {
  const { t } = useLanguageStore.getState();

  return {
    id: apiActor.id,
    name: apiActor.name,
    image: getImageUrl(apiActor.profile_path),
    description: `${t('character')}: ${apiActor.character || t('unknown')}`,
  };
};

// Pure function to transform credits data to actors array
export const transformCreditsToActors = (creditsData, limit = 10) => {
  if (!creditsData?.cast) {
    return [];
  }

  return creditsData.cast.slice(0, limit).map(transformActor);
};
