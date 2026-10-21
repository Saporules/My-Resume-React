import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { LanguageProvider } from '../../i18n/LanguageContext';
import profile from '../../content/profile';

const renderFooter = () => {
  localStorage.setItem('lang', 'en');
  return render(<LanguageProvider><Footer /></LanguageProvider>);
};

test('links to LinkedIn and email', () => {
  renderFooter();
  expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', profile.linkedin);
  expect(screen.getByRole('link', { name: profile.email })).toHaveAttribute('href', `mailto:${profile.email}`);
});

test('faith line ends with a text-presentation cross, not an emoji', () => {
  renderFooter();
  const line = screen.getByText(/Jesus is King/);
  expect(line.textContent.endsWith('\u271D\uFE0E')).toBe(true);
});

test('shows the current year', () => {
  renderFooter();
  expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument();
});
