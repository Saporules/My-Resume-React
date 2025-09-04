import React, { useState } from 'react';

// Hardcoded resume data based on the provided PDF content
const resumeData = {
  name: "ASAF EDUARDO LOPEZ GOVEA",
  title: "Senior Front-End Developer",
  contact: {
    location: "San Luis Potosí, México",
    email: "asaf.eduardo@gmail.com",
    phone: "+52 55 7346 9088",
    linkedin: "https://www.linkedin.com/in/asaf-lopez-govea"
  },
  summary: "Front-End Developer with 13+ years of experience building scalable web applications, with a strong focus on JavaScript as the core of my development approach. Confident working across modern libraries and frameworks as Angular, and React. Skilled in Agile environments, UI/UX design, and AI-enhanced workflows. Known for clean code, a collaborative mindset, and delivering high-impact digital solutions.",
  technicalSkills: {
    languages: ["JavaScript (ES6+)", "HTML5", "CSS3", "SCSS"],
    frameworks: ["Angular", "React", "Svelte"],
    cms: ["Wordpress"],
    testing: ["Jest", "Jasmine", "Karma"],
    tools: ["Git", "Copilot", "Chat GPT", "Gemini"],
    methodologies: ["Agile", "Scrum"]
  },
  softSkills: [
    "Communication: Clear, concise, and bilingual (English/Spanish); skilled in translating technical concepts for diverse audiences.",
    "Leadership: Experience guiding cross-functional teams and mentoring junior developers in Agile environments.",
    "Proactivity: Self-driven and solution-oriented; anticipates challenges and takes initiative to resolve them.",
    "Flexibility: Adapts quickly to changing priorities, technologies, and team dynamics.",
    "Mediation: Effective at facilitating dialogue and resolving conflicts between stakeholders, designers, and developers."
  ],
  experience: [
    {
      company: "Globant",
      location: "Mexico City, Mexico",
      duration: "2017-2025",
      roles: [
        {
          title: "Front-End Developer",
          dates: "Jan 2024-Jul 2025",
          client: "Confidential (Global Biotech & Pharmaceutical Company)",
          details: [
            "Migrated enterprise apps from Angular 17 to 19, resolving complex dependencies.",
            "Integrated AI tools to streamline development and reduce debugging time.",
            "Collaborated with backend and AI teams to deliver responsive interfaces."
          ]
        },
        {
          title: "Front-End Developer",
          dates: "Apr 2023-Jan 2024",
          client: "Confidential (National Banking Group)",
          details: [
            "Developed a secure Angular wrapper library for enterprise-wide use.",
            "Delivered documentation and supported cross-team implementation."
          ]
        },
        {
          title: "Front-End Developer",
          dates: "May 2021 - Mar 2023",
          client: "Confidential (Digital Wealth Management Platform)",
          details: [
            "Maintained core features during integration of two financial platforms.",
            "Modernized legacy systems with React components in Backbone.js/jQuery.",
            "Designed data recovery strategies to improve user retention."
          ]
        },
        {
          title: "Front-End Developer",
          dates: "Oct 2019 - May 2021",
          client: "Confidential (Global Banking Institution)",
          details: [
            "Built region-specific components for a wealth management platform using Svelte.",
            "Localized features for the Mexican market in collaboration with global teams."
          ]
        },
        {
          title: "Front-End Developer",
          dates: "Mar 2019 - Oct 2019",
          client: "Confidential (Wealth Management Firm)",
          details: [
            "Created a CRM module for financial services, enhancing broker workflows.",
            "Delivered scalable Angular components and post-launch optimizations."
          ]
        },
        {
          title: "Front-End Developer",
          dates: "Aug 2017 - Mar 2019",
          client: "Confidential (Global Investment Bank)",
          details: [
            "Developed a mortgage module with interactive forms and visualizations.",
            "Resolved bugs in hybrid mobile apps (iOS/Android), improving reliability."
          ]
        }
      ]
    }
  ],
  earlyCareer: [
    { title: "Web & Mobile Developer / Project Manager", company: "OMAKASE Tech & Design", duration: "2015-2017" },
    { title: "Webmaster", company: "MG Radio", duration: "2014-2015" },
    { title: "Web & Mobile Developer", company: "Niumedia", duration: "2012-2014" }
  ],
  education: {
    institution: "Universidad Politécnica de San Luis Potosí",
    degree: "Bachelor of Engineering in Information Technology",
    graduation: "Dec 2014"
  }
};

// Main App component for the digital resume
const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 p-4 md:p-8">
      
      {/* Resume Container */}
      <div className="container mx-auto max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-10">
        
        {/* Header Section */}
        <header className="text-center border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-2">
            {resumeData.name}
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {resumeData.title}
          </h2>
          <div className="flex flex-wrap justify-center gap-x-4 text-sm text-gray-500">
            <span>{resumeData.contact.location}</span>
            <span className="hidden md:inline">•</span>
            <span>{resumeData.contact.email}</span>
            <span className="hidden md:inline">•</span>
            <span>{resumeData.contact.phone}</span>
            <span className="hidden md:inline">•</span>
            <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">LinkedIn</a>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3">
            Professional Summary
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {resumeData.summary}
          </p>
        </section>
        
        {/* Technical Skills */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(resumeData.technicalSkills).map(([category, skills]) => (
              <div key={category} className="bg-gray-50 p-4 rounded-lg shadow-inner">
                <h4 className="font-semibold text-lg text-gray-700 mb-2 capitalize">
                  {category}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Soft Skills */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">
            Soft Skills
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            {resumeData.softSkills.map((skill, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-inner flex items-start">
                <span className="text-blue-500 mr-2 mt-1">
                  {/* Icon for a skill/bullet point */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Professional Experience */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">
            Professional Experience
          </h3>
          {resumeData.experience.map((job, jobIndex) => (
            <div key={jobIndex} className="bg-white p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-xl font-bold text-gray-800">
                  {job.company}
                </h4>
                <span className="text-sm text-gray-500">{job.duration}</span>
              </div>
              {job.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="ml-4 border-l-2 border-gray-200 pl-4 mb-4">
                  <div className="flex justify-between items-baseline">
                    <h5 className="font-semibold text-lg text-gray-700">
                      {role.title}
                    </h5>
                    <span className="text-xs text-gray-400">{role.dates}</span>
                  </div>
                  {role.client && <p className="text-sm italic text-gray-500 mb-2">Client: {role.client}</p>}
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {role.details.map((detail, detailIndex) => (
                      <li key={detailIndex}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Early Career */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">
            Early Career
          </h3>
          <ul className="space-y-4">
            {resumeData.earlyCareer.map((job, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                <div>
                  <h4 className="font-semibold text-gray-700">{job.title}</h4>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
                <span className="text-sm text-gray-500">{job.duration}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">
            Education
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h4 className="text-lg font-semibold text-gray-700">{resumeData.education.institution}</h4>
            <p className="text-gray-600">{resumeData.education.degree}</p>
            <p className="text-sm text-gray-500 mt-1">{resumeData.education.graduation}</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default App;
