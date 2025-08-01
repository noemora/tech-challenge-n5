import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguageStore } from '../stores/languageStore';

// Mock store
vi.mock('../stores/languageStore');

describe('LanguageSelector', () => {
  const mockSetLanguage = vi.fn();
  const mockT = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useLanguageStore.mockReturnValue({
      language: 'es',
      setLanguage: mockSetLanguage,
      t: mockT,
    });
    mockT.mockImplementation((key) => {
      const translations = {
        language: 'Idioma',
      };
      return translations[key] || key;
    });
  });

  it('renders language selector with correct label', () => {
    render(<LanguageSelector />);

    expect(screen.getByText('Idioma:')).toBeInTheDocument();
  });

  it('displays current language correctly', () => {
    render(<LanguageSelector />);

    const select = screen.getByRole('combobox');
    expect(select.value).toBe('es');
  });

  it('shows both language options', () => {
    render(<LanguageSelector />);

    expect(screen.getByText('🇪🇸 Español')).toBeInTheDocument();
    expect(screen.getByText('🇺🇸 English')).toBeInTheDocument();
  });

  it('calls setLanguage when option is changed', async () => {
    const user = userEvent.setup();
    render(<LanguageSelector />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'en');

    expect(mockSetLanguage).toHaveBeenCalledWith('en');
  });

  it('works with English language', () => {
    useLanguageStore.mockReturnValue({
      language: 'en',
      setLanguage: mockSetLanguage,
      t: mockT,
    });
    mockT.mockImplementation((key) => {
      const translations = {
        language: 'Language',
      };
      return translations[key] || key;
    });

    render(<LanguageSelector />);

    expect(screen.getByText('Language:')).toBeInTheDocument();
    const select = screen.getByRole('combobox');
    expect(select.value).toBe('en');
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<LanguageSelector />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'en');

    expect(mockSetLanguage).toHaveBeenCalledWith('en');
  });
});
