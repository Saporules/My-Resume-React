import './Earlier.scss';
import Section from '../Section/Section';
import { useContent } from '../../i18n/LanguageContext';

const Earlier = () => {
  const { earlier } = useContent();
  const { education } = earlier;

  return (
    <Section id="earlier" number="05" label={earlier.label}>
      <ul className="earlier">
        {earlier.roles.map((r) => (
          <li key={r.company} className="earlier__role">
            <div className="earlier__head">
              <h3>{r.company}</h3>
              <span>{r.dates}</span>
            </div>
            <p className="earlier__title">{r.title}</p>
            <p>{r.text}</p>
          </li>
        ))}
      </ul>
      <div className="earlier__facts">
        <div>
          <h3>{earlier.educationLabel}</h3>
          <p>{education.institution}</p>
          <p>{education.degree}, {education.date}</p>
        </div>
        <div>
          <h3>{earlier.languagesLabel}</h3>
          <p>{earlier.languages}</p>
        </div>
      </div>
    </Section>
  );
};

export default Earlier;
