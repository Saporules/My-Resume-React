import { render, screen, fireEvent, within } from '@testing-library/react';
import Nav from './Nav';
import { LanguageProvider } from '../../i18n/LanguageContext';
import en from '../../content/en';
import es from '../../content/es';

const renderNav = () => {
  localStorage.setItem('lang', 'en');
  return render(<LanguageProvider><Nav /></LanguageProvider>);
};

test('Download CV links to the PDF as a download', () => {
  renderNav();
  const link = screen.getByRole('link', { name: new RegExp(en.nav.downloadCv) });
  expect(link).toHaveAttribute('href', '/Asaf_Lopez_CV.pdf');
  expect(link).toHaveAttribute('download');
});

test('anchor links point at the page sections', () => {
  renderNav();
  const nav = screen.getByRole('navigation');
  expect(within(nav).getByRole('link', { name: en.nav.work })).toHaveAttribute('href', '#work');
  expect(within(nav).getByRole('link', { name: en.nav.skills })).toHaveAttribute('href', '#skills');
  expect(within(nav).getByRole('link', { name: en.nav.about })).toHaveAttribute('href', '#about');
  expect(within(nav).getByRole('link', { name: en.nav.contact })).toHaveAttribute('href', '#contact');
});

test('language button switches the nav to Spanish', () => {
  renderNav();
  fireEvent.click(screen.getByRole('button', { name: new RegExp(en.nav.langToggleLabel) }));
  expect(screen.getByRole('link', { name: es.nav.work })).toBeInTheDocument();
});

test('language button accessible name includes its visible EN/ES text', () => {
  renderNav();
  const button = screen.getByRole('button', { name: new RegExp(en.nav.langToggleLabel) });
  expect(button).toHaveAccessibleName(/EN.*ES/);
});

test('theme button switches to dark mode and reports its state', () => {
  localStorage.setItem('theme', 'light');
  renderNav();
  const button = screen.getByRole('button', { name: en.nav.themeToggleLabel });
  expect(button).toHaveAttribute('aria-pressed', 'false');

  fireEvent.click(button);

  expect(button).toHaveAttribute('aria-pressed', 'true');
  expect(document.documentElement.dataset.theme).toBe('dark');
});
