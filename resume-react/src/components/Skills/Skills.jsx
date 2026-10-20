import './Skills.scss';
import Section from '../Section/Section';
import { useContent } from '../../i18n/LanguageContext';

const Skills = () => {
  const { skills } = useContent();

  return (
    <Section id="skills" number="03" label={skills.label}>
      <dl className="skills">
        {skills.groups.map((g) => (
          <div key={g.name} className="skills__group">
            <dt>{g.name}</dt>
            <dd>
              <ul className="skills__chips">
                {g.items.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
};

export default Skills;
