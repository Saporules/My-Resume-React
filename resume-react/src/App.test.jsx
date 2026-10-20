import { render, screen } from '@testing-library/react';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';

const renderApp = () => {
  localStorage.setItem('lang', 'en');
  return render(<LanguageProvider><App /></LanguageProvider>);
};

test('renders the owner name', () => {
  renderApp();
  expect(screen.getAllByText(/Asaf Lopez/i).length).toBeGreaterThan(0);
});
