import './Experience.scss';
import Section from '../Section/Section';
import { useContent } from '../../i18n/LanguageContext';

const Bullets = ({ items }) =>
  items.length > 0 && (
    <ul className="bullets">
      {items.map((b) => <li key={b}>{b}</li>)}
    </ul>
  );

const Experience = () => {
  const { experience } = useContent();

  return (
    <Section id="work" number="02" label={experience.label}>
      <ol className="roles">
        {experience.items.map((role) => (
          <li key={role.company} className="role">
            <div className="role__head">
              <h3 className="role__company">{role.company}</h3>
              <p className="role__dates">{role.dates}</p>
            </div>
            <p className="role__title">{role.title}</p>
            <p className="role__location">{role.location}</p>
            <p className="role__context">{role.context}</p>
            <Bullets items={role.bullets} />
            {role.engagements?.map((e) => (
              <div key={e.client} className="engagement">
                <h4 className="engagement__client">{e.client}</h4>
                <Bullets items={e.bullets} />
              </div>
            ))}
          </li>
        ))}
      </ol>
    </Section>
  );
};

export default Experience;
