import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';
const THEMES = ['light', 'dark'];

// Stored choice wins, then the system preference; storage may be unavailable.
// index.html runs the same rule inline before first paint to avoid a flash.
export function detectInitialTheme({ storage, prefersDark }) {
  try {
    const stored = storage?.getItem(STORAGE_KEY);
    if (THEMES.includes(stored)) return stored;
  } catch {
    // storage blocked — fall through
  }
  return prefersDark ? 'dark' : 'light';
}

const safeStorage = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export function useTheme() {
  const [theme, setTheme] = useState(() =>
    detectInitialTheme({
      storage: safeStorage(),
      prefersDark: window.matchMedia?.('(prefers-color-scheme: dark)').matches,
    })
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        safeStorage()?.setItem(STORAGE_KEY, next);
      } catch {
        // not persisted — the toggle still works for this visit
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
