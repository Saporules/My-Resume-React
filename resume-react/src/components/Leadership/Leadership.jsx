import Section from '../Section/Section';
import { useContent } from '../../i18n/LanguageContext';

const Leadership = () => {
  const { leadership } = useContent();
  return (
    <Section id="about" number="04" label={leadership.label}>
      <ul className="bullets lead">
        {leadership.bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
    </Section>
  );
};

export default Leadership;
