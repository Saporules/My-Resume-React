import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from '../content/en';
import es from '../content/es';

const STORAGE_KEY = 'lang';
const CONTENT = { en, es };

const LanguageContext = createContext(null);

// Stored choice wins, then the browser language; storage may be unavailable.
export function detectInitialLang({ storage, navigatorLanguage }) {
  try {
    const stored = storage?.getItem(STORAGE_KEY);
    if (stored in CONTENT) return stored;
  } catch {
    // storage blocked (private mode, disabled cookies) — fall through
  }
  return navigatorLanguage?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

const safeStorage = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() =>
    detectInitialLang({ storage: safeStorage(), navigatorLanguage: navigator.language })
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = CONTENT[lang].meta.title;
    try {
      safeStorage()?.setItem(STORAGE_KEY, lang);
    } catch {
      // not persisted — the toggle still works for this visit
    }
  }, [lang]);

  const toggleLang = useCallback(() => setLang((l) => (l === 'en' ? 'es' : 'en')), []);
  const value = useMemo(() => ({ lang, setLang, toggleLang }), [lang, toggleLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}

export function useContent() {
  return CONTENT[useLanguage().lang];
}
