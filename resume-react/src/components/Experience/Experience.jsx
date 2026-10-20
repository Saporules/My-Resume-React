import React from 'react';
import './Experience.scss';
import Card from '../UI/Card/Card';

const Experience = ({ data }) => {
  if (!data || !data.experience) return null;

  const companies = data.experience;

  return (
    <div className="experience-section">
      <h2>Experience</h2>
      <div className="companies">
        {companies.map((company, idx) => {
          const slug = company.company ? company.company.toLowerCase().replace(/\s+/g, '-') : `company-${idx}`;
          return (
            <Card key={idx} className={`experience-card ${slug}`}>
              <div className="company-header">
                <h3 className="company-name">{company.company}</h3>
                <div className="company-meta">{company.location} • {company.duration}</div>
              </div>
                <h4 className='role-title'>Front-End Developer</h4>
              <div className="roles">
                {company.roles && company.roles.map((role, rIdx) => (
                  <div key={rIdx} className="role">
                    <p className="role-dates">{role.dates}</p>
                    {role.client && <span className="role-client">{role.client}</span>}

                    {/* Render tech stack inline for this role (preferred order) */}
                    {role.techStack && (
                      <div className="role-techline">
                        {role.techStack.frontend && (
                          <span className="tech-item"><strong>Frontend:</strong> {role.techStack.frontend.join(', ')}</span>
                        )}
                        {role.techStack.legacy && (
                          <span className="tech-item"><strong>Legacy:</strong> {role.techStack.legacy.join(', ')}</span>
                        )}
                        {role.techStack.tools && (
                          <span className="tech-item"><strong>Tools:</strong> {role.techStack.tools.join(', ')}</span>
                        )}
                        {role.techStack.purpose && (
                          <span className="tech-item"><strong>Purpose:</strong> {Array.isArray(role.techStack.purpose) ? role.techStack.purpose.join(' / ') : role.techStack.purpose}</span>
                        )}
                      </div>
                    )}

                    <p className="role-summary">Details:</p>
                    <ul className="role-details">
                      {role.details && role.details.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Early Career Section */}
      {data.earlyCareer && data.earlyCareer.length > 0 && (
        <div className="early-career-section">
          <Card className="early-career-card">
            <h3>Early Career</h3>
            <div className="early-career-list">
              {data.earlyCareer.map((job, idx) => (
                <div key={idx} className="early-career-item">
                  <div className="early-career-role">{job.title}</div>
                  <div className="early-career-company">{job.company}</div>
                  <div className="early-career-duration">{job.duration}</div>
                  {job.description && <div className="early-career-description">{job.description}</div>}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Education Section */}
      {data.education && (
        <div className="education-section">
          <Card className="education-card">
            <h3>Education</h3>
            <div className="education-item">
              <div className="education-institution">{data.education.institution}</div>
              <div className="education-degree">{data.education.degree}</div>
              <div className="education-graduation">{data.education.graduation}</div>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
};

export default Experience;
