import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useContent, useLanguage, detectInitialLang } from './LanguageContext';
import en from '../content/en';
import es from '../content/es';

const storageWith = (value) => ({ getItem: () => value });

describe('detectInitialLang', () => {
  test('stored language wins over the browser language', () => {
    expect(detectInitialLang({ storage: storageWith('es'), navigatorLanguage: 'en-US' })).toBe('es');
  });

  test('Spanish browser language selects es', () => {
    expect(detectInitialLang({ storage: storageWith(null), navigatorLanguage: 'es-MX' })).toBe('es');
  });

  test('any other browser language selects en', () => {
    expect(detectInitialLang({ storage: storageWith(null), navigatorLanguage: 'fr-FR' })).toBe('en');
  });

  test('ignores unknown stored values', () => {
    expect(detectInitialLang({ storage: storageWith('de'), navigatorLanguage: 'en-US' })).toBe('en');
  });

  test('storage that throws falls back to the browser language', () => {
    const storage = { getItem: () => { throw new Error('blocked'); } };
    expect(detectInitialLang({ storage, navigatorLanguage: 'es-ES' })).toBe('es');
  });
});

function Probe() {
  const content = useContent();
  const { toggleLang } = useLanguage();
  return <button onClick={toggleLang}>{content.nav.work}</button>;
}

describe('LanguageProvider', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  test('toggle switches content and html lang', () => {
    localStorage.setItem('lang', 'en');
    render(<LanguageProvider><Probe /></LanguageProvider>);
    expect(document.documentElement.lang).toBe('en');
    fireEvent.click(screen.getByRole('button', { name: en.nav.work }));
    expect(screen.getByRole('button', { name: es.nav.work })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('es');
    expect(localStorage.getItem('lang')).toBe('es');
  });

  test('toggle still works when storage writes throw', () => {
    localStorage.setItem('lang', 'en');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    render(<LanguageProvider><Probe /></LanguageProvider>);
    fireEvent.click(screen.getByRole('button', { name: en.nav.work }));
    expect(screen.getByRole('button', { name: es.nav.work })).toBeInTheDocument();
  });
});
