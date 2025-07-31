// Application constants
export const MOVIE_IDS = {
  DEFAULT: parseInt(import.meta.env.VITE_DEFAULT_MOVIE_ID) || 9339,
};

export const DISPLAY_LIMITS = {
  ACTORS: 10,
};

export const UI_MESSAGES = {
  LOADING_ACTORS: 'Loading actors...',
};

export const QUERY_CONFIG = {
  STALE_TIME: parseInt(import.meta.env.VITE_QUERY_STALE_TIME) || 5 * 60 * 1000, // 5 minutes
  CACHE_TIME: parseInt(import.meta.env.VITE_QUERY_CACHE_TIME) || 10 * 60 * 1000, // 10 minutes
};
