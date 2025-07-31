import { useState, useEffect } from 'react';
import actorRepository from '../repositories/ActorRepository.js';

// Custom hook responsible for managing actor data state
export const useActors = (movieId, limit = 10) => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        setLoading(true);
        setError(null);
        const actorsData = await actorRepository.getActorsByMovieId(
          movieId,
          limit
        );
        setActors(actorsData);
      } catch (err) {
        setError(err.message);
        setActors([]);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchActors();
    }
  }, [movieId, limit]);

  return { actors, loading, error };
};
