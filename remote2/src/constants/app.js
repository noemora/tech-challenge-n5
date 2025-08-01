// Application constants
export const MOVIE_IDS = {
  DEFAULT: parseInt(import.meta.env.VITE_DEFAULT_MOVIE_ID) || 9339,
  FEATURED_MOVIE_TITLE: import.meta.env.VITE_FEATURED_MOVIE_TITLE || 'Click',
};

export const DISPLAY_LIMITS = {
  ACTORS: 10,
};

export const UI_MESSAGES = {
  LOADING_ACTORS: 'Loading actors...',
  SCROLL: 'Scroll to see more actors',
  LOAD_ACTORS: 'Load Actors',
};

export const QUERY_CONFIG = {
  STALE_TIME: parseInt(import.meta.env.VITE_QUERY_STALE_TIME) || 5 * 60 * 1000, // 5 minutes
  GC_TIME: parseInt(import.meta.env.VITE_QUERY_GC_TIME) || 10 * 60 * 1000, // 10 minutes
};
