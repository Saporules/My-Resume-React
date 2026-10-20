import React from 'react';
import './TechStack.scss';
import Card from '../UI/Card/Card';

const TechStack = ({ data }) => {
  if (!data) return null;

  const { technicalSkills } = data;

  const featuredTechs = [
    { name: 'Angular', logo: '/logos/angular_gradient.png' },
    { name: 'React', logo: '/logos/React.png' },
    { name: 'JavaScript', logo: '/logos/JavaScript-logo.png' },
    { name: 'TypeScript', logo: '/logos/ts-logo-256.png' }
  ];

  return (
    <Card className="tech-stack">
      <h2>Technical Stack</h2>
      <div className="featured-tech">
        {featuredTechs.map((tech) => (
          <div key={tech.name} className="tech-item">
            <img src={tech.logo} alt={tech.name} className="tech-logo" />
            <p className="tech-name">{tech.name}</p>
          </div>
        ))}
      </div>

      <div className="skills-container">
        {technicalSkills && Object.entries(technicalSkills).map(([category, skills]) => (
          <div key={category} className="skill-category">
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <ul>
              {Array.isArray(skills) && skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TechStack;
