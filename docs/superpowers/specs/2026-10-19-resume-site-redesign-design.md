# asaflopez.com — Redesign 2026

**Date:** 2026-10-19
**Status:** Draft, pending owner approval

## Intent

asaflopez.com is Asaf Lopez's personal resume site. It is a year old and out of date in two ways:

1. **Content.** It stops at Globant (2025), uses the title "Senior Front-End Developer", and describes Globant work with generic bullets. The current CV (September 2026) positions the owner as *Senior Frontend Engineer · Software Architect · AI Engineer*, adds two newer roles (SoberanIA, The Web Factory), and rewrites Globant around measurable achievements.
2. **Visuals.** The current look (Russo One / DM Mono, shadow-dance title, soft-skill cards) no longer matches the seniority the owner wants to project.

**Primary audience:** recruiters. **Success:** a recruiter leaves the page wanting to contact the owner for an interview, and can do so (contact form or downloaded CV) without leaving the page.

**Secondary audience (new):** founders/companies who need help with a startup or project. The contact block speaks to both: *"Interested in my profile, or need help with your startup or project?"*

## Goals

- Content mirrors the September 2026 CV (source of truth: `Asaf_Lopez_CV_09_2026.docx`, text reproduced in the Appendix).
- Visual direction "C · Swiss / Bold" (chosen by owner from three mockups).
- A **Download CV** button, always reachable.
- A **contact form** that delivers messages to the owner's email.
- English site with an **EN / ES** toggle.
- Works well on phones (recruiters often open links from LinkedIn on mobile).

## Non-goals

- No blog, no project gallery, no CMS, no backend of our own.
- No multi-page routing; it stays a single page.
- No analytics work in this iteration (can be added later).

## Anti-goals (would be a failure even if it "works")

- Looks like a generic template / default Tailwind portfolio.
- Content that drifts from the CV (titles, dates, numbers must match).
- The contact form silently fails or sends to spam.
- Naming confidential Globant clients — they stay anonymized exactly as in the CV ("Global Biotech & Pharmaceutical Company (NDA)", etc.).

## Constraints

- Hosting: **Banahosting** shared hosting (cPanel, Apache, PHP available). The site is deployed as static files. No Node runtime on the server.
- Existing repo: `resume-react/` — React 19 + Create React App + SCSS, data in `src/resumeData.js`, components in `src/components/`, breakpoint mixins in `src/_breakpoints.scss`.
- Owner's photo: `resume-react/public/profile-pic.jpg` (square, orange t-shirt, light wall with plants). Use it.
- The owner asked that the visual work use the **frontend-design** skill/plugin.

## Visual direction — "C · Swiss / Bold"

Reference mockups: `.superpowers/brainstorm/3465-1792452171/content/visual-direction.html` (option C) and `page-structure.html`.

- White background, near-black text (#0a0a0a), **one** electric accent (blue ~#2b3bff). Black used as a second "surface" for the contact block.
- Very large, tight display type for the name (Space Grotesk 700 or a comparable grotesk, negative tracking); a clean sans (e.g. Inter) for body text.
- Strong grid: thick rules (3px black) separating major areas; numbered section labels (01–05) in the accent color in a left column.
- Square corners, no soft shadows, no gradients. Buttons are solid black or outlined black.
- Motion: restrained (e.g. subtle reveal on scroll, hover states). Respect `prefers-reduced-motion`. The old shadow-dance effect goes.
- Final type/colour choices and detailing are refined with the frontend-design skill during implementation; the above is the direction, not a pixel spec.

## Page structure (single page, top to bottom)

1. **Top nav (sticky):** "ASAF LOPEZ" wordmark · anchor links (Work, Skills, About, Contact) · EN/ES toggle · **Download CV ↓** button (accent colour). On mobile the anchor links may collapse; the Download CV button stays visible.
2. **Hero:** name ("Asaf / Lopez.") huge; the three titles; "San Luis Potosí, MX · Remote-ready US / EU / LATAM"; buttons **Let's talk →** (scrolls to contact) and **Download CV ↓**; photo; accent-coloured stat column with key numbers: **13+ years**, **0 downtime** (zero-downtime migrations), **20× faster** AI-assisted reviews. A one-line hook such as *"I take on the migration nobody wants to own — and ship it with zero downtime."* (wording can be refined; must stay truthful to the CV).
3. **01 Summary** — the CV's Professional Summary.
4. **02 Experience** — SoberanIA → The Web Factory → Globant. Globant shows its intro line and the three anonymized client engagements with their bullets. Each role: company, location, title, dates, one-line context, bullets.
5. **03 Skills** — grouped exactly like the CV (Core, Frameworks & Libraries, State & Data, Architecture, UI & Quality, AI Engineering, DevOps & Infra, Testing, Analytics & Experimentation, CMS, Methodologies, Working knowledge). Rendered as group label + chips.
6. **04 Leadership & Collaboration** — the three CV bullets.
7. **05 Earlier career & Education** — OMAKASE, MG Radio, Niumedia (short), UPSLP degree, languages.
8. **Contact (black block):** heading *"Interested in my profile, or need help with your startup or project?"* + form (name, email, message, send) + direct links (email, LinkedIn, phone).
9. **Footer:** © 2026 Asaf Lopez · LinkedIn · Email. Keep the personal line "Jesus is King" from the current footer, followed by a **text-style cross, never an emoji**: the character ✝ (U+271D) followed by the text-presentation selector U+FE0E (`&#x271D;&#xFE0E;`), set in the site font and colour so it reads as a typographic glyph on every OS.

Removed from the current site: the soft-skills card grid (replaced by Leadership), tech-logo images, the old six-role Globant breakdown.

## Content

- **Source of truth:** the September 2026 CV (Appendix). English copy is taken from it verbatim or lightly tightened for the web; no new claims, numbers or employers.
- **Spanish (ES):** a faithful translation of the same content, produced during implementation. Technical terms commonly used in English in Mexican tech (micro-frontends, CI/CD, strangler-fig, A/B testing) stay in English.
- Data lives in a structured data module (replacing `resumeData.js`), with EN and ES versions, so components never hard-code copy.
- Contact: asaf.eduardo@gmail.com · +52 55 7346 9088 · LinkedIn https://www.linkedin.com/in/asaf-lopez-govea

## Download CV

- A PDF of the September 2026 CV is placed in `public/` as `Asaf_Lopez_CV.pdf` and linked with the `download` attribute. One PDF (English) for both language modes.
- **The owner exports the PDF** from the .docx (Word or Google Docs "Save as PDF") so it keeps the original formatting; no Word/LibreOffice is available on the build machine. The original upload is at `C:\Users\Asaf_\.claude\uploads\d78cadf5-9977-41bb-b320-5c4953b456f8\845e898e-Asaf_Lopez_CV_09_2026.docx`. Until the PDF arrives, the link points at that filename and the build proceeds; the PDF being present is a pre-deploy check.

## Contact form

- **Web3Forms** (free tier, no server code): the form POSTs to Web3Forms with an access key tied to asaf.eduardo@gmail.com; messages arrive in that Gmail inbox with the sender's email as reply-to.
  - *Builder's call recorded here:* chosen over a PHP `mail()` script on Banahosting because shared-hosting mail often lands in spam.
- The owner must create the Web3Forms access key (one-time, by email). The key is public by design and can live in the client code or a build-time env var.
- States: idle → sending → success message / error message with a fallback "email me directly" link. Basic validation (required fields, email format) and Web3Forms' honeypot field for spam.
- The key is read from a Vite env var (`VITE_WEB3FORMS_KEY`); the build works with a placeholder. **Pre-deploy gate:** with the real key, the owner sends a test message and confirms it lands in the Gmail inbox (not spam) with the sender as reply-to.

## Tech decisions

- **Stay on React 19 + SCSS** (owner's existing stack); reuse the breakpoint mixins.
- **Migrate the build from Create React App to Vite.** CRA is deprecated and unmaintained; Vite gives a static `dist/` that uploads to Banahosting the same way. *(Builder's call.)*
- **EN/ES:** simple in-app language state (no i18n library needed for one page), default from `navigator.language`, remembered in `localStorage`, sets `<html lang>`.
- **SEO/sharing basics:** proper `<title>` ("Asaf Lopez — Senior Frontend Engineer & Software Architect"), meta description, Open Graph tags with the photo, favicon refresh.
- **Accessibility:** semantic sections and headings, visible focus states, labelled form fields, WCAG AA contrast (check accent blue on white and white on blue).
- Remove CRA leftovers (logo.svg, reportWebVitals, default tests that no longer apply).

## Deployment

- `npm run build` → upload `dist/` contents to the Banahosting public_html for asaflopez.com (manually via cPanel/FTP, as today). Automating deploy is out of scope.

## Working approach

- Work on a feature branch; `main` stays as the current live site until the owner approves the result. This makes the CRA→Vite move and removals (soft-skills grid, `public/logos`) safe to do.
- Add `.superpowers/` to `.gitignore`.

## Left to the builder

- Exact fonts, sizes, spacing, accent hue fine-tuning, motion details (via frontend-design).
- Component breakdown and file structure.
- Mobile layout of the hero and stat column.
- Hook sentence wording (truthful to CV).
- How the Spanish translation is phrased.

## Appendix — CV text (September 2026)

ASAF EDUARDO LOPEZ GOVEA
Senior Frontend Engineer · Software Architect · AI Engineer
San Luis Potosí, México · asaf.eduardo@gmail.com · +52 55 7346 9088 · LinkedIn · Bilingual EN/ES (English C1) · Remote-ready across US, EU and LATAM time zones

**PROFESSIONAL SUMMARY**
Senior software engineer with 13+ years building and modernizing web applications for enterprise clients in banking, biotech and wealth management. Deep specialist in Angular, React and TypeScript, with a track record of zero-downtime migrations and legacy modernization on live enterprise platforms. Currently acting CTO at an AI consultancy, turning AI-generated prototypes into maintainable production software with real architecture, CI/CD and DevOps behind them. Known for taking on the hard, ambiguous problems — the migration nobody wants to own, the legacy code that can't be touched — and for working effectively across distributed teams in English.

**TECHNICAL SKILLS**
- Core: TypeScript, JavaScript (ES6+), HTML5, CSS3, SCSS
- Frameworks & Libraries: Angular (through v19), React, Svelte, Vue, Ionic, Backbone.js, jQuery
- State & Data: RxJS, NgRx, Redux, REST APIs
- Architecture: Micro-frontends, legacy modernization / strangler-fig integration, component design systems, SPA architecture
- UI & Quality: Tailwind CSS, Material UI, Bootstrap, accessibility (WCAG), internationalization / localization (i18n)
- AI Engineering: AI spec-driven development, AI harness development, agent workflow orchestration, Claude, Cursor, Antigravity
- DevOps & Infra: Docker, Node.js, Webpack, Git, Git Flow, GitHub Actions (CI/CD), Linux VPS administration, Apache, nginx, PHP environments, incident response and data recovery
- Testing: Jest, Jasmine, Karma
- Analytics & Experimentation: Google Tag Manager, feature flags, A/B testing
- CMS: WordPress (custom themes and templates)
- Methodologies: Agile, Scrum, Kanban, code review, technical mentoring
- Working knowledge: Vite, Kubernetes, Storybook, Testing Library, Playwright, Python

**EXPERIENCE**

*SoberanIA — Madrid, Spain (remote)* — Software Architect / Acting CTO · AI Engineering · March 2026 – Present
AI solutions for private-sector enterprises in legal, accounting and healthcare.
- Own the technical architecture and development operating model; lead a 3-person engineering team and run hiring, candidate evaluation and team composition.
- Delivered 2 client platforms from zero in the first 5 months, across the legal/accounting and healthcare sectors.
- Introduced AI spec-driven and AI harness development to eliminate rework and model hallucination, converting AI output from working demos into production software with maintenance paths, DevOps and CI/CD.
- Defined the full frontend stack and standards and integrated them with existing AI model and agent infrastructure.

*The Web Factory — Guadalajara, Mexico* — Full-Stack Developer & Server Operations · Escalation Engineer · October 2025 – March 2026
- Escalation point for frontend and backend problems the rest of the team could not resolve, across 5–6 concurrent client accounts.
- Administered a Linux VPS hosting ~100 production sites (Apache, nginx, PHP): malware remediation after attacks, server migrations, and data recovery incidents.
- Diagnosed and fixed complex JavaScript and CSS defects — animation behavior, fixed-position layout failures, cross-browser rendering.

*Globant — Mexico City, Mexico* — Senior Frontend Developer · 2017 – 2025
Eight years delivering modernization programs for Fortune-scale US clients in finance, biotech and banking, working daily in English with distributed teams across the US East and West Coasts, India and Sweden.

Global Biotech & Pharmaceutical Company (NDA)
- Migrated 2 of the 4 micro-frontends in a complex enterprise application from Angular 17 to Angular 19 in ~2 months with zero production downtime, resolving deep dependency conflicts.
- Completed the final phase of the migration solo after the rest of the team rolled off, retaining full ownership of delivery.
- Introduced AI tooling for file-by-file code analysis, cutting a full-day review cycle to ~20 minutes — roughly a 20x reduction.
- Authored the migration documentation used as the program reference.

US Retirement & Wealth Management Platform — top-tier national provider (NDA)
- Maintained and extended core features throughout a major platform merger following an acquisition between two financial services companies.
- Integrated existing Backbone.js/jQuery components into a modern React environment under a hard constraint that legacy code could not be modified — a strangler-fig modernization that kept both systems running in parallel without a rewrite.

Global Investment Bank — Tier 1, US market (NDA)
- Built a mortgage module with interactive multi-step forms and data visualizations in Angular for the US market.
- Designed and shipped an A/B test segmenting users by age and wealth bracket via a slider-based questionnaire, serving differentiated content and measuring conversion impact; implemented with Google Tag Manager and feature flags.
- Fixed visual and rendering defects in the hybrid iOS/Android application (Ionic), improving quality across subsequent releases.

**EARLY CAREER**
- OMAKASE Tech & Design — Frontend & Mobile Developer / Project Manager (2015–2017). Independent consultancy for small and mid-size businesses. Built informative sites, e-commerce and landing pages on WordPress; shipped Android and iOS applications with Ionic. Owned requirements gathering, project management and client relationships.
- MG Radio — Frontend Developer (2014–2015). Built WordPress sites and custom templates with pixel-perfect UI implementation from graphic design specs.
- Niumedia — Web & Mobile Developer (2012–2014). First professional role. Angular and Ionic for web and mobile delivery; WordPress site development.

**LEADERSHIP & COLLABORATION**
- Mentored 3 semi-senior developers, all of whom advanced in seniority.
- Hire and evaluate engineering candidates; assemble project teams.
- Daily working English with US, European and Indian stakeholders; experienced translating technical constraints for non-technical audiences and mediating between design, engineering and business.

**EDUCATION & LANGUAGES**
- Universidad Politécnica de San Luis Potosí — B.S. Information Technology, December 2014
- Languages: Spanish (native) · English (C1 working proficiency; Cambridge FCE B2 certified)
