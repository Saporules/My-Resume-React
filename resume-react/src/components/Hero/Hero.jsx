import './Hero.scss';
import profile from '../../content/profile';
import { useContent } from '../../i18n/LanguageContext';

const Hero = () => {
  const { hero } = useContent();
  const [first, last] = profile.name.split(' ');

  return (
    <section className="hero" aria-label={profile.name}>
      <div className="hero__inner">
        <div className="hero__text">
          <h1 className="hero__name">
            <span>{first}</span>
            <span>{last}.</span>
          </h1>
          <ul className="hero__titles">
            {hero.titles.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <p className="hero__location">{hero.location}</p>
          <p className="hero__hook">{hero.hook}</p>
          <div className="hero__ctas">
            <a className="btn btn--solid" href="#contact">{hero.ctaTalk}</a>
            <a className="btn" href={profile.cvUrl} download>
              {hero.ctaCv} <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="hero__photo">
          <img src={profile.photo} alt={hero.photoAlt} width="781" height="781" />
        </div>
        <dl className="hero__stats">
          {hero.stats.map(({ value, label }) => (
            <div key={value} className="hero__stat">
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
