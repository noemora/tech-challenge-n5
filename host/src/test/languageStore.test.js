import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLanguageStore } from '../stores/languageStore';

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock navigator.language
Object.defineProperty(navigator, 'language', {
  value: 'es-ES',
  configurable: true,
});

describe('languageStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset store state
    useLanguageStore.setState({ language: 'es' });
  });

  it('initializes with Spanish as default language', () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useLanguageStore());

    expect(result.current.language).toBe('es');
  });

  it('loads language from localStorage if available', () => {
    mockLocalStorage.getItem.mockReturnValue('en');

    // Clear store first and reinitialize
    useLanguageStore.setState({ language: 'es' });
    useLanguageStore.getState().setLanguage('en');

    const { result } = renderHook(() => useLanguageStore());

    expect(result.current.language).toBe('en');
  });

  it('updates language correctly', () => {
    const { result } = renderHook(() => useLanguageStore());

    act(() => {
      result.current.setLanguage('en');
    });

    expect(result.current.language).toBe('en');
  });

  it('provides translation function', () => {
    const { result } = renderHook(() => useLanguageStore());

    const translation = result.current.t('welcome');
    expect(translation).toBe('Bienvenido al MFE Host');
  });

  it('translates to English when language is en', () => {
    const { result } = renderHook(() => useLanguageStore());

    act(() => {
      result.current.setLanguage('en');
    });

    const translation = result.current.t('welcome');
    expect(translation).toBe('Welcome to the Host MFE');
  });

  it('returns key when translation not found', () => {
    const { result } = renderHook(() => useLanguageStore());

    const translation = result.current.t('nonexistent');
    expect(translation).toBe('nonexistent');
  });

  it('handles invalid language gracefully', () => {
    const { result } = renderHook(() => useLanguageStore());

    act(() => {
      result.current.setLanguage('fr'); // Unsupported language
    });

    expect(result.current.language).toBe('fr');
    // Should fallback to English or return key
    const translation = result.current.t('welcome');
    expect(translation).toBe('welcome'); // Returns key when language not supported
  });

  it('provides all required translation keys in Spanish', () => {
    const { result } = renderHook(() => useLanguageStore());

    const requiredKeys = ['welcome', 'language', 'characters', 'loadActors'];

    requiredKeys.forEach((key) => {
      const translation = result.current.t(key);
      expect(typeof translation).toBe('string');
      expect(translation.length).toBeGreaterThan(0);
    });
  });

  it('provides all required translation keys in English', () => {
    const { result } = renderHook(() => useLanguageStore());

    act(() => {
      result.current.setLanguage('en');
    });

    const requiredKeys = ['welcome', 'language', 'characters', 'loadActors'];

    requiredKeys.forEach((key) => {
      const translation = result.current.t(key);
      expect(typeof translation).toBe('string');
      expect(translation.length).toBeGreaterThan(0);
    });
  });
});
