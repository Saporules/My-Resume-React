// English copy — source of truth: CV, September 2026
const en = {
  meta: {
    title: 'Asaf Lopez — Senior Frontend Engineer & Software Architect',
    description:
      'Senior Frontend Engineer, Software Architect and AI Engineer with 13+ years modernizing enterprise web platforms. Angular, React, TypeScript. Remote-ready across US, EU and LATAM.',
  },
  nav: {
    work: 'Work',
    skills: 'Skills',
    about: 'About',
    contact: 'Contact',
    downloadCv: 'Download CV',
    langToggleLabel: 'Ver en español',
    themeToggleLabel: 'Dark mode',
  },
  hero: {
    titles: ['Senior Frontend Engineer', 'Software Architect', 'AI Engineer'],
    location: 'San Luis Potosí, MX · Remote-ready US / EU / LATAM',
    hook: 'I take on the migration nobody wants to own — and ship it with zero downtime.',
    ctaTalk: "Let's talk",
    ctaCv: 'Download CV',
    photoAlt: 'Portrait of Asaf Lopez',
    stats: [
      { value: '13+', label: 'years building for the web' },
      { value: '0', label: 'downtime on live migrations' },
      { value: '20×', label: 'faster code reviews with AI' },
    ],
  },
  summary: {
    label: 'Summary',
    text: 'Senior software engineer with 13+ years building and modernizing web applications for enterprise clients in banking, biotech and wealth management. Deep specialist in Angular, React and TypeScript, with a track record of zero-downtime migrations and legacy modernization on live enterprise platforms. Currently acting CTO at an AI consultancy, turning AI-generated prototypes into maintainable production software with real architecture, CI/CD and DevOps behind them. Known for taking on the hard, ambiguous problems — the migration nobody wants to own, the legacy code that can’t be touched — and for working effectively across distributed teams in English.',
  },
  experience: {
    label: 'Experience',
    items: [
      {
        company: 'SoberanIA',
        location: 'Madrid, Spain (remote)',
        title: 'Software Architect / Acting CTO · AI Engineering',
        dates: 'Mar 2026 – Present',
        context: 'AI solutions for private-sector enterprises in legal, accounting and healthcare.',
        bullets: [
          'Own the technical architecture and development operating model; lead a 3-person engineering team and run hiring, candidate evaluation and team composition.',
          'Delivered 2 client platforms from zero in the first 5 months, across the legal/accounting and healthcare sectors.',
          'Introduced AI spec-driven and AI harness development to eliminate rework and model hallucination, converting AI output from working demos into production software with maintenance paths, DevOps and CI/CD.',
          'Defined the full frontend stack and standards and integrated them with existing AI model and agent infrastructure.',
        ],
      },
      {
        company: 'The Web Factory',
        location: 'Guadalajara, Mexico',
        title: 'Full-Stack Developer & Server Operations · Escalation Engineer',
        dates: 'Oct 2025 – Mar 2026',
        context: 'Web agency serving 5–6 concurrent client accounts.',
        bullets: [
          'Escalation point for frontend and backend problems the rest of the team could not resolve, across 5–6 concurrent client accounts.',
          'Administered a Linux VPS hosting ~100 production sites (Apache, nginx, PHP): malware remediation after attacks, server migrations, and data recovery incidents.',
          'Diagnosed and fixed complex JavaScript and CSS defects — animation behavior, fixed-position layout failures, cross-browser rendering.',
        ],
      },
      {
        company: 'Globant',
        location: 'Mexico City, Mexico',
        title: 'Senior Frontend Developer',
        dates: '2017 – 2025',
        context:
          'Eight years delivering modernization programs for Fortune-scale US clients in finance, biotech and banking, working daily in English with distributed teams across the US East and West Coasts, India and Sweden.',
        bullets: [],
        engagements: [
          {
            client: 'Global Biotech & Pharmaceutical Company (NDA)',
            bullets: [
              'Migrated 2 of the 4 micro-frontends in a complex enterprise application from Angular 17 to Angular 19 in ~2 months with zero production downtime, resolving deep dependency conflicts.',
              'Completed the final phase of the migration solo after the rest of the team rolled off, retaining full ownership of delivery.',
              'Introduced AI tooling for file-by-file code analysis, cutting a full-day review cycle to ~20 minutes — roughly a 20x reduction.',
              'Authored the migration documentation used as the program reference.',
            ],
          },
          {
            client: 'US Retirement & Wealth Management Platform — top-tier national provider (NDA)',
            bullets: [
              'Maintained and extended core features throughout a major platform merger following an acquisition between two financial services companies.',
              'Integrated existing Backbone.js/jQuery components into a modern React environment under a hard constraint that legacy code could not be modified — a strangler-fig modernization that kept both systems running in parallel without a rewrite.',
            ],
          },
          {
            client: 'Global Investment Bank — Tier 1, US market (NDA)',
            bullets: [
              'Built a mortgage module with interactive multi-step forms and data visualizations in Angular for the US market.',
              'Designed and shipped an A/B test segmenting users by age and wealth bracket via a slider-based questionnaire, serving differentiated content and measuring conversion impact; implemented with Google Tag Manager and feature flags.',
              'Fixed visual and rendering defects in the hybrid iOS/Android application (Ionic), improving quality across subsequent releases.',
            ],
          },
        ],
      },
    ],
  },
  skills: {
    label: 'Skills',
    groups: [
      { name: 'Core', items: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'SCSS'] },
      { name: 'Frameworks & Libraries', items: ['Angular (through v19)', 'React', 'Svelte', 'Vue', 'Ionic', 'Backbone.js', 'jQuery'] },
      { name: 'State & Data', items: ['RxJS', 'NgRx', 'Redux', 'REST APIs'] },
      { name: 'Architecture', items: ['Micro-frontends', 'Legacy modernization / strangler-fig integration', 'Component design systems', 'SPA architecture'] },
      { name: 'UI & Quality', items: ['Tailwind CSS', 'Material UI', 'Bootstrap', 'Accessibility (WCAG)', 'Internationalization / localization (i18n)'] },
      { name: 'AI Engineering', items: ['AI spec-driven development', 'AI harness development', 'Agent workflow orchestration', 'Claude', 'Cursor', 'Antigravity'] },
      { name: 'DevOps & Infra', items: ['Docker', 'Node.js', 'Webpack', 'Git', 'Git Flow', 'GitHub Actions (CI/CD)', 'Linux VPS administration', 'Apache', 'nginx', 'PHP environments', 'Incident response and data recovery'] },
      { name: 'Testing', items: ['Jest', 'Jasmine', 'Karma'] },
      { name: 'Analytics & Experimentation', items: ['Google Tag Manager', 'Feature flags', 'A/B testing'] },
      { name: 'CMS', items: ['WordPress (custom themes and templates)'] },
      { name: 'Methodologies', items: ['Agile', 'Scrum', 'Kanban', 'Code review', 'Technical mentoring'] },
      { name: 'Working knowledge', items: ['Vite', 'Kubernetes', 'Storybook', 'Testing Library', 'Playwright', 'Python'] },
    ],
  },
  leadership: {
    label: 'Leadership',
    bullets: [
      'Mentored 3 semi-senior developers, all of whom advanced in seniority.',
      'Hire and evaluate engineering candidates; assemble project teams.',
      'Daily working English with US, European and Indian stakeholders; experienced translating technical constraints for non-technical audiences and mediating between design, engineering and business.',
    ],
  },
  earlier: {
    label: 'Earlier & Education',
    roles: [
      {
        company: 'OMAKASE Tech & Design',
        title: 'Frontend & Mobile Developer / Project Manager',
        dates: '2015 – 2017',
        text: 'Independent consultancy for small and mid-size businesses. Built informative sites, e-commerce and landing pages on WordPress; shipped Android and iOS applications with Ionic. Owned requirements gathering, project management and client relationships.',
      },
      {
        company: 'MG Radio',
        title: 'Frontend Developer',
        dates: '2014 – 2015',
        text: 'Built WordPress sites and custom templates with pixel-perfect UI implementation from graphic design specs.',
      },
      {
        company: 'Niumedia',
        title: 'Web & Mobile Developer',
        dates: '2012 – 2014',
        text: 'First professional role. Angular and Ionic for web and mobile delivery; WordPress site development.',
      },
    ],
    educationLabel: 'Education',
    education: {
      institution: 'Universidad Politécnica de San Luis Potosí',
      degree: 'B.S. Information Technology',
      date: 'Dec 2014',
    },
    languagesLabel: 'Languages',
    languages: 'Spanish (native) · English (C1 working proficiency; Cambridge FCE B2 certified)',
  },
  contact: {
    heading: 'Interested in my profile, or need help with your startup or project?',
    nameLabel: 'Name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    send: 'Send message',
    sending: 'Sending…',
    success: 'Thanks — your message is on its way. I’ll get back to you soon.',
    error: 'Something went wrong and your message wasn’t sent.',
    fallback: 'Email me directly',
    requiredError: 'This field is required.',
    emailError: 'Please enter a valid email address.',
    directLabel: 'Or reach me directly',
  },
  footer: {
    rights: 'Designed and built by Asaf Lopez',
    faith: 'Jesus is King ✝︎',
  },
};

export default en;
