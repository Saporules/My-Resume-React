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

test('sections appear in order 01 to 05', () => {
  renderApp();
  const numbers = [...document.querySelectorAll('.section__number')].map((n) => n.textContent);
  expect(numbers).toEqual(['01', '02', '03', '04', '05']);
});

test('every skill group is rendered', async () => {
  const { default: en } = await import('./content/en');
  renderApp();
  for (const group of en.skills.groups) expect(screen.getByText(group.name)).toBeInTheDocument();
});

test('switching language renders the Spanish summary', async () => {
  const { default: es } = await import('./content/es');
  const { fireEvent } = await import('@testing-library/react');
  renderApp();
  fireEvent.click(screen.getByRole('button', { name: /Ver en español/ }));
  expect(screen.getByText(es.summary.text)).toBeInTheDocument();
});

test('a skip link is the first focusable element and targets main', () => {
  renderApp();
  const first = document.querySelector('a[href], button');
  expect(first).toHaveTextContent('Skip to content');
  expect(first).toHaveAttribute('href', '#top');
  expect(document.querySelector('main')).toHaveAttribute('tabindex', '-1');
});
