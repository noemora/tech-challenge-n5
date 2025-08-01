import { getImageUrl } from '../services/seriesApi.js';

// Pure function to transform actor data from API response
export const transformActor = (apiActor, t) => {
  return {
    id: apiActor.id,
    name: apiActor.name,
    image: getImageUrl(apiActor.profile_path),
    description: `${t('character')}: ${apiActor.character || t('unknown')}`,
  };
};

// Pure function to transform credits data to actors array
export const transformCreditsToActors = (creditsData, t, limit = 10) => {
  if (!creditsData?.cast) {
    return [];
  }

  return creditsData.cast
    .slice(0, limit)
    .map((actor) => transformActor(actor, t));
};
