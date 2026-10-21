import { renderHook, act } from '@testing-library/react';
import { detectInitialTheme, useTheme } from './theme';

const storageWith = (value) => ({ getItem: () => value });

describe('detectInitialTheme', () => {
  test('a stored choice wins over the system preference', () => {
    expect(detectInitialTheme({ storage: storageWith('light'), prefersDark: true })).toBe('light');
    expect(detectInitialTheme({ storage: storageWith('dark'), prefersDark: false })).toBe('dark');
  });

  test('follows the system preference when nothing is stored', () => {
    expect(detectInitialTheme({ storage: storageWith(null), prefersDark: true })).toBe('dark');
    expect(detectInitialTheme({ storage: storageWith(null), prefersDark: false })).toBe('light');
  });

  test('ignores unknown stored values', () => {
    expect(detectInitialTheme({ storage: storageWith('toString'), prefersDark: false })).toBe('light');
  });

  test('falls back to the system preference when storage throws', () => {
    const storage = { getItem: () => { throw new Error('blocked'); } };
    expect(detectInitialTheme({ storage, prefersDark: true })).toBe('dark');
  });
});

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  test('toggling applies the theme to <html> and remembers it', () => {
    localStorage.setItem('theme', 'light');
    const { result } = renderHook(() => useTheme());
    expect(document.documentElement.dataset.theme).toBe('light');

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  test('works where matchMedia is unavailable', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });
});
