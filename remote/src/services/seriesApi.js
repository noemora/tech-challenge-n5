// API service with pure functions for TMDB API
const API_CONFIG = {
  baseUrl:
    import.meta.env.VITE_TMDB_API_BASE_URL || 'https://api.themoviedb.org/3',
  imageBaseUrl:
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL ||
    'https://image.tmdb.org/t/p/w500',
  token: import.meta.env.VITE_TMDB_API_TOKEN,
};

// Validate required environment variables
if (!API_CONFIG.token) {
  throw new Error('VITE_TMDB_API_TOKEN is required but not provided');
}

// Pure function to fetch series credits
export const fetchSeriesCredits = async (seriesId, language = 'en-US') => {
  try {
    const response = await fetch(
      `${API_CONFIG.baseUrl}/tv/${seriesId}/credits?language=${language}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_CONFIG.token}`,
          accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching series credits:', error);
    throw error;
  }
};

// Pure function to get image URL
export const getImageUrl = (imagePath) => {
  return imagePath
    ? `${API_CONFIG.imageBaseUrl}${imagePath}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
};
