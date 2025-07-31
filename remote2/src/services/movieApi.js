// API service with pure functions for TMDB API
const API_CONFIG = {
  baseUrl: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p/w500',
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZWMwZTM0MGM5MDRjNzUzMmE3MGI0ZDllZDJmMTE5NiIsIm5iZiI6MTc1Mzg4OTk0Ni4yMjUsInN1YiI6IjY4OGEzYzlhNWEyNDA0NWY5OGIyNmNjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SYCxaFQene9SN4OqHM4cllAsj5dLu_zRdHhUv3CIy-o',
};

// Pure function to fetch movie credits
export const fetchMovieCredits = async (movieId, language = 'en-US') => {
  try {
    const response = await fetch(
      `${API_CONFIG.baseUrl}/movie/${movieId}/credits?language=${language}`,
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
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};

// Pure function to get image URL
export const getImageUrl = (imagePath) => {
  return imagePath
    ? `${API_CONFIG.imageBaseUrl}${imagePath}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
};
