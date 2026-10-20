const ENDPOINT = 'https://api.web3forms.com/submit';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns { field: 'required' | 'email' } for each invalid field; {} when valid.
export function validateContact({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = 'required';
  if (!email.trim()) errors.email = 'required';
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'email';
  if (!message.trim()) errors.message = 'required';
  return errors;
}

// Never throws: every failure (no key, network, API refusal) resolves to { ok: false }.
export async function submitContact({ name, email, message, botcheck }, { accessKey, fetchImpl = fetch }) {
  if (!accessKey) return { ok: false };

  try {
    const response = await fetchImpl(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        subject: `asaflopez.com — new message from ${name.trim()}`,
        from_name: 'asaflopez.com',
        replyto: email.trim(),
        // Web3Forms treats any botcheck value as spam, so only a ticked honeypot is sent
        ...(botcheck && { botcheck: true }),
      }),
    });
    if (!response.ok) return { ok: false };
    const data = await response.json();
    return { ok: data.success === true };
  } catch {
    return { ok: false };
  }
}
