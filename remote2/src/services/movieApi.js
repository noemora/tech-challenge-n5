// API service responsible only for making HTTP requests to TMDB API
class MovieApiService {
  constructor() {
    this.baseUrl = 'https://api.themoviedb.org/3';
    this.imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    this.token =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZWMwZTM0MGM5MDRjNzUzMmE3MGI0ZDllZDJmMTE5NiIsIm5iZiI6MTc1Mzg4OTk0Ni4yMjUsInN1YiI6IjY4OGEzYzlhNWEyNDA0NWY5OGIyNmNjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SYCxaFQene9SN4OqHM4cllAsj5dLu_zRdHhUv3CIy-o';
  }

  async fetchMovieCredits(movieId, language = 'en-US') {
    try {
      const response = await fetch(
        `${this.baseUrl}/movie/${movieId}/credits?language=${language}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.token}`,
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
  }

  getImageUrl(imagePath) {
    return imagePath
      ? `${this.imageBaseUrl}${imagePath}`
      : 'https://via.placeholder.com/500x750?text=No+Image';
  }
}

export default new MovieApiService();
