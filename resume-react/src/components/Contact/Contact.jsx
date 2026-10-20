import { useRef, useState } from 'react';
import './Contact.scss';
import profile from '../../content/profile';
import { useContent } from '../../i18n/LanguageContext';
import { submitContact, validateContact } from './submitContact';

const EMPTY = { name: '', email: '', message: '' };

const Contact = () => {
  const { contact } = useContent();
  const [values, setValues] = useState(EMPTY);
  const [botcheck, setBotcheck] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const inFlight = useRef(false);

  const errorText = { required: contact.requiredError, email: contact.emailError };

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((errs) => ({ ...errs, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inFlight.current) return;

    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    inFlight.current = true;
    setStatus('sending');
    const { ok } = await submitContact(
      { ...values, botcheck },
      { accessKey: import.meta.env.VITE_WEB3FORMS_KEY }
    );
    inFlight.current = false;
    setStatus(ok ? 'success' : 'error');
    if (ok) setValues(EMPTY);
  };

  const field = (name, label, Tag = 'input', extra = {}) => (
    <div className={`contact__field${errors[name] ? ' has-error' : ''}`}>
      <label htmlFor={`contact-${name}`}>{label}</label>
      <Tag
        id={`contact-${name}`}
        name={name}
        value={values[name]}
        onChange={update(name)}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
        {...extra}
      />
      {errors[name] && (
        <p className="contact__error" id={`contact-${name}-error`}>{errorText[errors[name]]}</p>
      )}
    </div>
  );

  const sending = status === 'sending';

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__inner">
        <div className="contact__intro">
          <h2 id="contact-title">{contact.heading}</h2>
          <div className="contact__direct">
            <p>{contact.directLabel}</p>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          {field('name', contact.nameLabel, 'input', { type: 'text', autoComplete: 'name' })}
          {field('email', contact.emailLabel, 'input', { type: 'email', autoComplete: 'email' })}
          {field('message', contact.messageLabel, 'textarea', { rows: 5 })}

          <div className="visually-hidden" aria-hidden="true">
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              checked={botcheck}
              onChange={(e) => setBotcheck(e.target.checked)}
            />
          </div>

          <button type="submit" className="btn btn--signal contact__send" disabled={sending}>
            {sending ? contact.sending : contact.send}
          </button>

          <div className="contact__status" aria-live="polite">
            {status === 'success' && <p>{contact.success}</p>}
            {status === 'error' && (
              <p>
                {contact.error}{' '}
                <a href={`mailto:${profile.email}`}>{contact.fallback}</a>
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
