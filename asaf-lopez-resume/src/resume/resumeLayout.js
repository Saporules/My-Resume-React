import React, { useState, useEffect } from "react";
import Prism from "../Prism/Prism";
import "./resumeLayout.scss";

const ResumeLayout = ({ resumeData }) => {
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  useEffect(() => {
    const onResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="prism-bg" style={{ height: `${windowHeight}px` }}>
      <Prism
        animationType="3drotate"
        timeScale={0.1}
        height={3.5}
        baseWidth={5.5}
        scale={4.2}
        hueShift={-0.04}
        colorFrequency={2}
        noise={0}
        glow={1}
      />
      <div className="container is-max-desktop">
      
        <section className="section">
          <div className="resume-wrapper box p-6">
            {/* Header */}
            <div className="has-text-centered mb-5 resume-header">
              <div className="resume-name-container my-6">
                  <h1 className="title is-1 has-text-weight-bold resume-name">{resumeData.name}</h1>
                  <h6 className="subtitle is-6 resume-fullname">{resumeData.fullname}</h6>
              </div>
              <h2 className="subtitle is-4 has-text-link">{resumeData.title}</h2>
              <div className="is-flex is-flex-wrap is-justify-content-center is-align-items-center mb-4">
                <span className="icon-text mx-2">
                  <span className="icon"><i className="fas fa-map-marker-alt"></i></span>
                  <span>{resumeData.contact.location}</span>
                </span>
                <span className="icon-text mx-2">
                  <span className="icon"><i className="fas fa-envelope"></i></span>
                  <span>{resumeData.contact.email}</span>
                </span>
                <span className="icon-text mx-2">
                  <span className="icon"><i className="fas fa-phone"></i></span>
                  <span>{resumeData.contact.phone}</span>
                </span>
                <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="icon-text mx-2 has-text-info">
                  <span className="icon"><i className="fab fa-linkedin"></i></span>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <hr />

            {/* Professional Summary */}
            <div className="content mb-5">
              <h3 className="title is-4 has-text-weight-semibold has-text-primary">Professional Summary</h3>
              <p>{resumeData.summary}</p>
            </div>

            <hr />

            <div className="columns is-multiline">
              {/* Technical Skills */}
              <div className="column is-one-half-desktop">
                <div className="content mb-5">
                  <h3 className="title is-4 has-text-weight-semibold has-text-primary">Technical Skills</h3>
                  {Object.entries(resumeData.technicalSkills).map(([category, skills]) => (
                    <div key={category} className="mb-4">
                      <p className="subtitle is-6 has-text-weight-semibold has-text-grey mb-2 is-capitalized">
                        {category}
                      </p>
                      <div className="tags">
                        {skills.map((skill, index) => (
                          <span key={index} className="tag is-info is-light">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="column is-one-half-desktop">
                <div className="content mb-5">
                  <h3 className="title is-4 has-text-weight-semibold has-text-primary">Soft Skills</h3>
                  <div className="tags is-flex is-flex-wrap">
                    {resumeData.softSkills.map((skill, index) => (
                      <span key={index} className="tag is-success is-light is-medium">
                        <span className="icon is-small mr-1"><i className="fas fa-check-circle"></i></span>
                        {skill.split(':')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <hr />

            {/* Professional Experience */}
            <div className="content mb-5">
              <h3 className="title is-4 has-text-weight-semibold has-text-primary">Professional Experience</h3>
              {resumeData.experience.map((job, jobIndex) => (
                <div key={jobIndex} className="card mb-4">
                  <div className="card-header">
                    <p className="card-header-title is-size-5 has-text-weight-bold has-text-link">
                      {job.company}
                    </p>
                    <p className="card-header-icon is-size-6 has-text-weight-medium">
                      {job.duration}
                    </p>
                  </div>
                  <div className="card-content">
                    {job.roles.map((role, roleIndex) => (
                      <div key={roleIndex} className="mb-3 pl-4 is-relative" style={{ borderLeft: '2px solid #dbdbdb' }}>
                        <p className="title is-5 mb-1">{role.title}</p>
                        <p className="subtitle is-6 has-text-grey">{role.dates}</p>
                        {role.client && <p className="is-size-7 has-text-grey mb-2">Client: {role.client}</p>}
                        <ul>
                          {role.details.map((detail, detailIndex) => (
                            <li key={detailIndex}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <hr />

            {/* Early Career & Education */}
            <div className="columns">
              <div className="column is-one-half-desktop">
                <div className="content mb-5">
                  <h3 className="title is-4 has-text-weight-semibold has-text-primary">Early Career</h3>
                  {resumeData.earlyCareer.map((job, index) => (
                    <div key={index} className="box is-shadowless p-3 mb-3">
                      <p className="title is-6 mb-1">{job.title}</p>
                      <p className="subtitle is-7 has-text-grey mb-1">{job.company}</p>
                      <p className="is-size-7 has-text-grey">{job.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="column is-one-half-desktop">
                <div className="content mb-5">
                  <h3 className="title is-4 has-text-weight-semibold has-text-primary">Education</h3>
                  <div className="box is-shadowless p-3">
                    <p className="title is-6 mb-1">{resumeData.education.institution}</p>
                    <p className="subtitle is-7 has-text-grey mb-1">{resumeData.education.degree}</p>
                    <p className="is-size-7 has-text-grey">{resumeData.education.graduation}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>  
    </div>
  );
};

export default ResumeLayout;