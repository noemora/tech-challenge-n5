import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Zustand store for global app state
export const useAppStore = create(
  devtools(
    (set) => ({
      // UI State
      showActors: false,
      shouldFetchActors: false,

      // Actions
      setShowActors: (show) =>
        set({ showActors: show }, false, 'setShowActors'),

      setShouldFetchActors: (should) =>
        set({ shouldFetchActors: should }, false, 'setShouldFetchActors'),

      // Trigger both show and fetch
      loadActors: () =>
        set(
          {
            showActors: true,
            shouldFetchActors: true,
          },
          false,
          'loadActors'
        ),

      // Reset to initial state
      reset: () =>
        set(
          {
            showActors: false,
            shouldFetchActors: false,
          },
          false,
          'reset'
        ),
    }),
    {
      name: 'app-store', // DevTools name
    }
  )
);
