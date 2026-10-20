import './Section.scss';

const Section = ({ id, number, label, children }) => (
  <section className="section" id={id} aria-labelledby={`${id}-title`}>
    <div className="section__inner">
      <h2 className="section__label" id={`${id}-title`}>
        <span className="section__number">{number}</span>
        {label}
      </h2>
      <div className="section__body">{children}</div>
    </div>
  </section>
);

export default Section;
