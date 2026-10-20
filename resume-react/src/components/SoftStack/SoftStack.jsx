import React from 'react';
import './SoftStack.scss';
import Card from '../UI/Card/Card';

const SoftStack = ({ data }) => {
  if (!data || !data.softSkills) {
    return null;
  }

  const { softSkills } = data;

  return (
    <div className="soft-stack">
      <h2>Soft Skills</h2>
      <div className="soft-skills-container">
        {Array.isArray(softSkills) && softSkills.map((skill, index) => (
          <Card key={index} className="soft-skill-card">
            <h3 className="soft-skill-title">{skill.title}</h3>
            <p className="soft-skill-text">{skill.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SoftStack;
