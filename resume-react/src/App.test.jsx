import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the owner name', () => {
  render(<App />);
  expect(screen.getAllByText(/Asaf Lopez/i).length).toBeGreaterThan(0);
});
