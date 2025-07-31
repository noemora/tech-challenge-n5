import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Zustand store for global app state
export const useAppStore = create(
  devtools(
    (set) => ({
      // UI State
      showActors: false,

      // Actions
      setShowActors: (show) =>
        set({ showActors: show }, false, 'setShowActors'),

      // Reset to initial state
      reset: () => set({ showActors: false }, false, 'reset'),
    }),
    {
      name: 'app-store', // DevTools name
    }
  )
);
