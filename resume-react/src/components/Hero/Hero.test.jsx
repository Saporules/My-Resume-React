import { render, screen } from '@testing-library/react';
import Hero from './Hero';
import { LanguageProvider } from '../../i18n/LanguageContext';
import en from '../../content/en';

beforeEach(() => {
  localStorage.setItem('lang', 'en');
  render(<LanguageProvider><Hero /></LanguageProvider>);
});

test('has a single h1 with the name', () => {
  const [h1] = screen.getAllByRole('heading', { level: 1 });
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(h1).toHaveTextContent(/Asaf/);
  expect(h1).toHaveTextContent(/Lopez/);
});

test('shows the three titles', () => {
  for (const title of en.hero.titles) expect(screen.getByText(title)).toBeInTheDocument();
});

test('shows the photo with alt text', () => {
  const img = screen.getByRole('img', { name: en.hero.photoAlt });
  expect(img).toHaveAttribute('src', '/profile-pic.jpg');
});

test('calls to action go to contact and the CV', () => {
  expect(screen.getByRole('link', { name: en.hero.ctaTalk })).toHaveAttribute('href', '#contact');
  const cv = screen.getByRole('link', { name: new RegExp(en.hero.ctaCv) });
  expect(cv).toHaveAttribute('href', '/Asaf_Lopez_CV.pdf');
  expect(cv).toHaveAttribute('download');
});

test('shows the three stats', () => {
  for (const { value, label } of en.hero.stats) {
    expect(screen.getByText(value)).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
  }
});
