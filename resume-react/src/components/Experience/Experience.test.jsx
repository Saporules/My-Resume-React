import { render, screen } from '@testing-library/react';
import Experience from './Experience';
import { LanguageProvider } from '../../i18n/LanguageContext';

beforeEach(() => {
  localStorage.setItem('lang', 'en');
  render(<LanguageProvider><Experience /></LanguageProvider>);
});

test('lists the three companies newest first', () => {
  const companies = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
  expect(companies).toEqual(['SoberanIA', 'The Web Factory', 'Globant']);
});

test('Globant shows its three client engagements', () => {
  expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(3);
  expect(screen.getByText('Global Biotech & Pharmaceutical Company (NDA)')).toBeInTheDocument();
});

test('each role shows its dates', () => {
  expect(screen.getByText('Mar 2026 – Present')).toBeInTheDocument();
  expect(screen.getByText('2017 – 2025')).toBeInTheDocument();
});
