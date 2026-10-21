import './Nav.scss';
import profile from '../../content/profile';
import { useContent, useLanguage } from '../../i18n/LanguageContext';
import { useTheme } from '../../theme/theme';

const Nav = () => {
  const { nav } = useContent();
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const links = [
    ['#work', nav.work],
    ['#skills', nav.skills],
    ['#about', nav.about],
    ['#contact', nav.contact],
  ];

  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="nav__mark" href="#top">{profile.name}</a>
        <nav className="nav__links" aria-label={nav.sectionsLabel}>
          {links.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="nav__actions">
          <button
            type="button"
            className="nav__theme"
            aria-pressed={theme === 'dark'}
            onClick={toggleTheme}
          >
            {/* Half-filled disc: the same mark reads as "contrast" in either mode */}
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
              <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M10 1.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" />
            </svg>
            <span className="visually-hidden">{nav.themeToggleLabel}</span>
          </button>
          <button
            type="button"
            className="nav__lang"
            onClick={toggleLang}
          >
            <b className={lang === 'en' ? 'is-on' : ''}>EN</b>
            <b className={lang === 'es' ? 'is-on' : ''}>ES</b>
            <span className="visually-hidden">{nav.langToggleLabel}</span>
          </button>
          <a className="btn btn--signal nav__cv" href={profile.cvUrl} download>
            {nav.downloadCv} <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Nav;
