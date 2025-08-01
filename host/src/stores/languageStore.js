import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

function getInitialLanguage() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language');
    if (stored && ['es', 'en'].includes(stored)) return stored;
    const browserLang = navigator.language?.slice(0, 2);
    if (['es', 'en'].includes(browserLang)) return browserLang;
  }
  return 'es';
}

export const useLanguageStore = create(
  subscribeWithSelector((set, get) => ({
    language: getInitialLanguage(),
    translations: {
      es: {
        welcome: 'Bienvenido al MFE Host',
        language: 'Idioma',
        toggleLanguage: 'English',
        characters: 'Personajes',
        loadActors: 'Cargar Actores',
        series: 'Serie',
        movie: 'Película',
        welcomeRemote: 'Bienvenido al MFE Remoto',
        welcomeRemote2: 'Bienvenido al MFE Remoto2',
        // UI Messages
        loadingActors: 'Cargando actores...',
        scroll: 'Desplázate para ver más actores',
        somethingWentWrong: 'Algo salió mal',
        // Actor descriptions
        character: 'Personaje',
        unknown: 'Desconocido',
      },
      en: {
        welcome: 'Welcome to the Host MFE',
        language: 'Language',
        toggleLanguage: 'Español',
        characters: 'Characters',
        loadActors: 'Load Actors',
        series: 'Series',
        movie: 'Movie',
        welcomeRemote: 'Welcome to the Remote MFE',
        welcomeRemote2: 'Welcome to the Remote2 MFE',
        // UI Messages
        loadingActors: 'Loading actors...',
        scroll: 'Scroll to see more actors',
        somethingWentWrong: 'Something went wrong',
        // Actor descriptions
        character: 'Character',
        unknown: 'Unknown',
      },
    },
    setLanguage: (language) => set({ language }),
    toggleLanguage: () =>
      set((state) => ({
        language: state.language === 'es' ? 'en' : 'es',
      })),
    t: (key) => {
      const { language, translations } = get();
      if (translations[language] && translations[language][key]) {
        return translations[language][key];
      } else {
        console.warn(
          `Missing translation for key "${key}" in language "${language}"`
        );
        return key;
      }
    },
  }))
);
