import './Footer.scss';
import profile from '../../content/profile';
import { useContent } from '../../i18n/LanguageContext';

const Footer = () => {
  const { footer } = useContent();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>© {new Date().getFullYear()} {footer.rights}</p>
        <p className="footer__links">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <p className="footer__faith">{footer.faith}</p>
      </div>
    </footer>
  );
};

export default Footer;
