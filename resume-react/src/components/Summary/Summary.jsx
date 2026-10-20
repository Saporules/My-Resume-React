import Section from '../Section/Section';
import { useContent } from '../../i18n/LanguageContext';

const Summary = () => {
  const { summary } = useContent();
  return (
    <Section id="summary" number="01" label={summary.label}>
      <p className="lead">{summary.text}</p>
    </Section>
  );
};

export default Summary;
