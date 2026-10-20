import './Nav.scss';
import profile from '../../content/profile';
import { useContent, useLanguage } from '../../i18n/LanguageContext';

const Nav = () => {
  const { nav } = useContent();
  const { lang, toggleLang } = useLanguage();
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
        <nav className="nav__links" aria-label="Sections">
          {links.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="nav__actions">
          <button
            type="button"
            className="nav__lang"
            onClick={toggleLang}
            aria-label={nav.langToggleLabel}
          >
            <span aria-hidden="true">
              <b className={lang === 'en' ? 'is-on' : ''}>EN</b>
              <b className={lang === 'es' ? 'is-on' : ''}>ES</b>
            </span>
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
