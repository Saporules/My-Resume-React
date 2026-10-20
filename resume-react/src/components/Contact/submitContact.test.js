import { submitContact, validateContact } from './submitContact';

const input = { name: 'Ana Recruiter', email: 'ana@example.com', message: 'Hi Asaf', botcheck: false };
const respond = (body, ok = true) => vi.fn().mockResolvedValue({ ok, json: async () => body });

describe('submitContact', () => {
  test('posts the message to Web3Forms and reports success', async () => {
    const fetchImpl = respond({ success: true });
    await expect(submitContact(input, { accessKey: 'key-123', fetchImpl })).resolves.toEqual({ ok: true });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://api.web3forms.com/submit');
    expect(init.method).toBe('POST');
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({
      access_key: 'key-123',
      name: 'Ana Recruiter',
      email: 'ana@example.com',
      message: 'Hi Asaf',
      replyto: 'ana@example.com',
      botcheck: false,
    });
    expect(body.subject).toContain('Ana Recruiter');
  });

  test('reports failure when Web3Forms says success: false', async () => {
    const fetchImpl = respond({ success: false });
    await expect(submitContact(input, { accessKey: 'k', fetchImpl })).resolves.toEqual({ ok: false });
  });

  test('reports failure on a non-OK HTTP response', async () => {
    const fetchImpl = respond({ success: true }, false);
    await expect(submitContact(input, { accessKey: 'k', fetchImpl })).resolves.toEqual({ ok: false });
  });

  test('reports failure when the network request rejects', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    await expect(submitContact(input, { accessKey: 'k', fetchImpl })).resolves.toEqual({ ok: false });
  });

  test('does not call the network without an access key', async () => {
    const fetchImpl = vi.fn();
    await expect(submitContact(input, { accessKey: '', fetchImpl })).resolves.toEqual({ ok: false });
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});

describe('validateContact', () => {
  test('flags empty and malformed fields', () => {
    expect(validateContact({ name: '', email: 'x', message: '   ' })).toEqual({
      name: 'required',
      email: 'email',
      message: 'required',
    });
  });

  test('flags a missing email as required', () => {
    expect(validateContact({ name: 'A', email: ' ', message: 'B' })).toEqual({ email: 'required' });
  });

  test('accepts valid input', () => {
    expect(validateContact({ name: 'A', email: 'a@b.co', message: 'B' })).toEqual({});
  });
});
