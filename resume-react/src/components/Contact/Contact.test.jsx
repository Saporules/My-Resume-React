import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from './Contact';
import { LanguageProvider } from '../../i18n/LanguageContext';
import en from '../../content/en';

const fill = () => {
  fireEvent.change(screen.getByLabelText(en.contact.nameLabel), { target: { value: 'Ana' } });
  fireEvent.change(screen.getByLabelText(en.contact.emailLabel), { target: { value: 'ana@example.com' } });
  fireEvent.change(screen.getByLabelText(en.contact.messageLabel), { target: { value: 'Hello' } });
};
const sendButton = () => screen.getByRole('button', { name: new RegExp(`${en.contact.send}|${en.contact.sending}`) });

beforeEach(() => {
  localStorage.setItem('lang', 'en');
  vi.stubEnv('VITE_WEB3FORMS_KEY', 'test-key');
  render(<LanguageProvider><Contact /></LanguageProvider>);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

test('shows the owner heading and labelled fields', () => {
  expect(screen.getByRole('heading', { name: en.contact.heading })).toBeInTheDocument();
  expect(screen.getByLabelText(en.contact.nameLabel)).toBeInTheDocument();
  expect(screen.getByLabelText(en.contact.emailLabel)).toBeInTheDocument();
  expect(screen.getByLabelText(en.contact.messageLabel)).toBeInTheDocument();
});

test('empty submit shows field errors and sends nothing', () => {
  const fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);
  fireEvent.click(sendButton());
  expect(screen.getAllByText(en.contact.requiredError)).toHaveLength(3);
  expect(fetchMock).not.toHaveBeenCalled();
});

test('disables sending while in flight, then confirms and clears the form', async () => {
  let resolve;
  const fetchMock = vi.fn(() => new Promise((r) => { resolve = r; }));
  vi.stubGlobal('fetch', fetchMock);
  fill();
  fireEvent.click(sendButton());
  expect(sendButton()).toBeDisabled();
  expect(sendButton()).toHaveTextContent(en.contact.sending);
  fireEvent.click(sendButton());
  expect(fetchMock).toHaveBeenCalledTimes(1);

  resolve({ ok: true, json: async () => ({ success: true }) });
  expect(await screen.findByText(en.contact.success)).toBeInTheDocument();
  expect(screen.getByLabelText(en.contact.nameLabel)).toHaveValue('');
});

test('a failed send shows the error with a direct email link', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
  fill();
  fireEvent.click(sendButton());
  expect(await screen.findByText(en.contact.error)).toBeInTheDocument();
  const fallback = screen.getByRole('link', { name: en.contact.fallback });
  expect(fallback).toHaveAttribute('href', 'mailto:asaf.eduardo@gmail.com');
  await waitFor(() => expect(sendButton()).not.toBeDisabled());
});

test('has a hidden honeypot that keyboard users cannot reach', () => {
  const honeypot = document.querySelector('input[name="botcheck"]');
  expect(honeypot).toHaveAttribute('tabindex', '-1');
  expect(honeypot.closest('.visually-hidden')).not.toBeNull();
});

test('marks every field as required for assistive tech', () => {
  for (const label of [en.contact.nameLabel, en.contact.emailLabel, en.contact.messageLabel]) {
    expect(screen.getByLabelText(label)).toBeRequired();
  }
});

test('moves focus to the first invalid field when sending fails validation', () => {
  fireEvent.change(screen.getByLabelText(en.contact.nameLabel), { target: { value: 'Ana' } });
  fireEvent.click(sendButton());
  expect(screen.getByLabelText(en.contact.emailLabel)).toHaveFocus();
});
