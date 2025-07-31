import movieApiService from '../services/movieApi.js';
import { ActorFactory } from '../models/Actor.js';

// Repository responsible for fetching and managing actor data
export class ActorRepository {
  constructor(apiService) {
    this.apiService = apiService;
  }

  async getActorsByMovieId(movieId, limit = 10) {
    try {
      const creditsData = await this.apiService.fetchMovieCredits(movieId);
      const actors = ActorFactory.createActorsFromCredits(creditsData, limit);

      return actors.map((actor) =>
        actor.toCardProps(this.apiService.getImageUrl.bind(this.apiService))
      );
    } catch (error) {
      console.error('Error in ActorRepository:', error);
      return [];
    }
  }
}

// Default instance using the movie API service
export default new ActorRepository(movieApiService);
