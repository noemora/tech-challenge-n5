import { getImageUrl } from '../services/seriesApi.js';

// Pure function to transform actor data from API response
export const transformActor = (apiActor) => ({
  id: apiActor.id,
  name: apiActor.name,
  image: getImageUrl(apiActor.profile_path),
  description: `Character: ${apiActor.character || 'Unknown'}`,
});

// Pure function to transform credits data to actors array
export const transformCreditsToActors = (creditsData, limit = 10) => {
  if (!creditsData?.cast) {
    return [];
  }

  return creditsData.cast.slice(0, limit).map(transformActor);
};
