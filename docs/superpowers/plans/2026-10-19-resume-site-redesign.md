# asaflopez.com Redesign 2026 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the single-page resume site with the September 2026 CV content, the "Swiss / Bold" look, an EN/ES toggle, a Download CV button and a Web3Forms contact form.

**Architecture:** React 19 SPA built with Vite into static files for Banahosting. All copy lives in per-language content modules (`src/content/en.js`, `es.js`) plus a language-independent `profile.js`; a `LanguageProvider` context selects the active one. Section components are presentational and read only from `useContent()`. The contact form calls a small, separately tested `submitContact()` module.

**Tech Stack:** React 19, Vite, SCSS (sass), Vitest + @testing-library/react + jsdom, Web3Forms, Google Fonts.

**Spec:** `docs/superpowers/specs/2026-10-19-resume-site-redesign-design.md`

## Global Constraints

- All work on branch `redesign-2026`; `main` is untouched until the owner approves.
- App root stays `resume-react/`. Run all commands from there.
- Copy must come from the spec Appendix (CV text). No new claims, numbers, employers. Globant clients stay anonymized exactly as in the CV.
- Contact data: `asaf.eduardo@gmail.com`, `+52 55 7346 9088`, `https://www.linkedin.com/in/asaf-lopez-govea`, location `San Luis Potosí, México`.
- Section numbering/order: 01 Summary, 02 Experience, 03 Skills, 04 Leadership, 05 Earlier career & Education, then Contact, then Footer.
- Visual: white background, text `#0a0a0a`, single accent `#2b3bff` (fine-tune allowed, must keep WCAG AA with white both ways), black contact block, square corners, no shadows/gradients, 3px black rules. Old shadow-dance effect removed. Respect `prefers-reduced-motion`.
- Contact heading copy (EN): "Interested in my profile, or need help with your startup or project?"
- Footer faith line: `Jesus is King` + `✝︎` (text-presentation cross, never emoji), site font and colour.
- CV download: `/Asaf_Lopez_CV.pdf` with `download` attribute; same file in both languages.
- Web3Forms key read from `import.meta.env.VITE_WEB3FORMS_KEY`.
- Use the `frontend-design` skill for visual work (Tasks 4–7).
- Pronouns: the site owner is referred to by name; copy is first-person or impersonal, as in the CV.

## Review Focus

1. **Contact submission fails** (network down, Web3Forms returns `success:false`, key missing) → user sees an error with a working `mailto:` link, never a silent no-op. Pinned in Task 7.
2. **Double-click on Send** → only one request; button disabled while sending. Pinned in Task 7.
3. **`localStorage` throws** (Safari private mode / blocked storage) → language detection and toggle still work. Pinned in Task 3.
4. **ES content missing a key or array item present in EN** → would render blank sections in Spanish. Pinned by parity test in Task 2.
5. **Phone width (360px)** → no horizontal scroll; hero stacks; Download CV stays visible in nav. Pinned by a manual check in Task 8 (jsdom can't measure layout).

---

## File Structure (end state, under `resume-react/`)

```
index.html                      Vite entry HTML (meta, OG, fonts)
vite.config.js                  Vite + Vitest config (jsdom, setup file)
.env.example                    VITE_WEB3FORMS_KEY=
public/profile-pic.jpg          (existing) hero photo
public/Asaf_Lopez_CV.pdf        provided by owner (pre-deploy)
src/main.jsx                    createRoot + <LanguageProvider><App/>
src/App.jsx                     page composition
src/test/setup.js               jest-dom import
src/content/profile.js          language-independent data
src/content/en.js, es.js        all copy, identical shape
src/content/content.test.js
src/i18n/LanguageContext.jsx    LanguageProvider, useLanguage, useContent, detectInitialLang
src/i18n/LanguageContext.test.jsx
src/styles/_tokens.scss         colours, type scale, spacing
src/styles/_breakpoints.scss    (moved from src/_breakpoints.scss)
src/styles/global.scss          reset, body, focus, reduced-motion
src/components/Nav/             Nav.jsx, Nav.scss, Nav.test.jsx
src/components/Hero/            Hero.jsx, Hero.scss, Hero.test.jsx
src/components/Section/         Section.jsx (numbered label + content grid), Section.scss
src/components/Summary/         Summary.jsx
src/components/Experience/      Experience.jsx, Experience.scss, Experience.test.jsx
src/components/Skills/          Skills.jsx, Skills.scss
src/components/Leadership/      Leadership.jsx
src/components/Earlier/         Earlier.jsx, Earlier.scss
src/components/Contact/         Contact.jsx, Contact.scss, Contact.test.jsx, submitContact.js, submitContact.test.js
src/components/Footer/          Footer.jsx, Footer.scss, Footer.test.jsx
```

Removed: `src/resumeData.js`, `ResumeCover/`, `TechStack/`, `SoftStack/`, `UI/Card/`, old `Experience/*` (rewritten), `App.scss`, `index.scss`, `logo.svg`, `reportWebVitals.js`, `setupTests.js`, `App.test.js`, `public/logos/`, `public/logo192.png`, `public/logo512.png`, `public/manifest.json` (or update manifest — builder's choice), `public/index.html`.

---

### Task 1: Branch + migrate CRA → Vite with Vitest

**Files:**
- Modify: `../.gitignore` (repo root) — add `.superpowers/`
- Modify: `.gitignore` — add `/dist`, `.env`
- Modify: `package.json` — remove `react-scripts`, `web-vitals`, `eslintConfig`, `browserslist`; add devDeps `vite`, `@vitejs/plugin-react`, `vitest`, `jsdom`; scripts `dev: vite`, `build: vite build`, `preview: vite preview`, `test: vitest run`
- Create: `vite.config.js`, `index.html` (from `public/index.html`, `%PUBLIC_URL%` removed, `<script type="module" src="/src/main.jsx">`), `src/main.jsx`, `src/test/setup.js`, `.env.example`
- Rename: `src/App.js` → `src/App.jsx`; every component `.js` containing JSX → `.jsx`
- Delete: `src/index.js`, `src/reportWebVitals.js`, `src/setupTests.js`, `src/logo.svg`, `public/index.html`
- Replace: `src/App.test.js` → `src/App.test.jsx`

**Interfaces:**
- Produces: `npm test`, `npm run build` (→ `dist/`), `npm run dev`. Vitest globals enabled (`test.globals: true`, `environment: 'jsdom'`, `setupFiles: './src/test/setup.js'`).

- [ ] **Step 1:** `git checkout -b redesign-2026` from clean `main`.
- [ ] **Step 2: Write test** `src/App.test.jsx`: `render(<App />)`; `expect(screen.getAllByText(/Asaf Lopez/i).length).toBeGreaterThan(0)`.
- [ ] **Step 3:** Do the package/config/file changes above; `npm install`.
- [ ] **Step 4: Verify** `npm test` → 1 passed. `npm run build` → `dist/index.html` exists. `npm run dev` serves the old site unchanged (spot check in browser).
- [ ] **Step 5: Commit** `chore: migrate from Create React App to Vite and Vitest`.

---

### Task 2: Content modules (EN, ES, profile)

**Files:**
- Create: `src/content/profile.js`, `src/content/en.js`, `src/content/es.js`, `src/content/content.test.js`

**Interfaces:**
- Produces: `profile` default export:
  `{ name: 'Asaf Lopez', fullName: 'Asaf Eduardo Lopez Govea', email, phone, linkedin, photo: '/profile-pic.jpg', cvUrl: '/Asaf_Lopez_CV.pdf' }`
- Produces: `en` / `es` default exports, identical shape:
  ```
  {
    meta: { title, description },
    nav: { work, skills, about, contact, downloadCv, langToggleLabel },
    hero: { titles: [string x3], location, hook, ctaTalk, ctaCv, photoAlt,
            stats: [{ value, label } x3] },
    summary: { label, text },
    experience: { label, items: [{ company, location, title, dates, context,
                  bullets: [string], engagements?: [{ client, bullets: [string] }] }] },
    skills: { label, groups: [{ name, items: [string] }] },
    leadership: { label, bullets: [string] },
    earlier: { label, roles: [{ company, title, dates, text }],
               educationLabel, education: { institution, degree, date },
               languagesLabel, languages },
    contact: { heading, nameLabel, emailLabel, messageLabel, send, sending,
               success, error, fallback, requiredError, emailError, directLabel },
    footer: { rights, faith }
  }
  ```
- Values (EN): titles `Senior Frontend Engineer`, `Software Architect`, `AI Engineer`; location `San Luis Potosí, MX · Remote-ready US / EU / LATAM`; stats `13+ / years`, `0 / downtime migrations`, `20× / faster code reviews with AI`; experience order SoberanIA, The Web Factory, Globant (Globant has `engagements` with the 3 NDA clients in CV order); skills = 12 groups in CV order; footer.faith = `Jesus is King ✝︎`. Hook: one truthful sentence (e.g. "I take on the migration nobody wants to own — and ship it with zero downtime.").
- ES: faithful translation; tech terms (micro-frontends, CI/CD, strangler-fig, A/B testing, skill names) stay English; company names, dates format `Mar 2026 – Presente` style.

- [ ] **Step 1: Write tests** in `content.test.js`:
  - `shape(en)` deep-equals `shape(es)` where `shape` maps every leaf to its type and keeps array lengths (parity test — Review Focus 4).
  - `en.experience.items.map(i => i.company)` equals `['SoberanIA', 'The Web Factory', 'Globant']`.
  - Globant `engagements.length === 3`; `en.skills.groups.length === 12`; `en.leadership.bullets.length === 3`; `en.earlier.roles.length === 3`.
  - `en.contact.heading === 'Interested in my profile, or need help with your startup or project?'`.
  - `en.footer.faith` and `es.footer.faith` end with `'✝︎'`.
  - No string in en/es is empty (walk all leaves).
- [ ] **Step 2: Run** `npm test -- content` → FAIL (modules missing).
- [ ] **Step 3:** Write the three modules from the spec Appendix.
- [ ] **Step 4: Run** `npm test -- content` → PASS.
- [ ] **Step 5: Commit** `feat: add EN/ES content modules from Sept 2026 CV`.

---

### Task 3: Language context

**Files:**
- Create: `src/i18n/LanguageContext.jsx`, `src/i18n/LanguageContext.test.jsx`
- Modify: `src/main.jsx` — wrap `<App/>` in `<LanguageProvider>`

**Interfaces:**
- Produces:
  - `detectInitialLang({ storage, navigatorLanguage }): 'en' | 'es'` — stored `'en'|'es'` wins; else `navigatorLanguage` starting with `es` → `'es'`; else `'en'`. Storage access wrapped in try/catch. Storage key `'lang'`.
  - `LanguageProvider({ children })` — state `lang`; on change writes storage (try/catch) and sets `document.documentElement.lang` and `document.title = content.meta.title`.
  - `useLanguage(): { lang, setLang, toggleLang }`
  - `useContent(): typeof en` — content for active lang.

- [ ] **Step 1: Write tests:**
  - `detectInitialLang({ storage: {getItem: () => 'es'}, navigatorLanguage: 'en-US' })` → `'es'`.
  - no stored value, `'es-MX'` → `'es'`; `'fr-FR'` → `'en'`.
  - `storage.getItem` throws → falls back to navigator, no throw (Review Focus 3).
  - Rendering a consumer inside the provider and calling `toggleLang` flips `useContent().nav.work` from EN to ES and sets `document.documentElement.lang` to `'es'`; with `localStorage.setItem` mocked to throw, toggle still works.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4: Run** `npm test` → PASS.
- [ ] **Step 5: Commit** `feat: add language provider with EN/ES detection`.

---

### Task 4: Design foundation + Nav + Footer

Invoke the `frontend-design` skill first; settle fonts, type scale and spacing tokens within the Global Constraints.

**Files:**
- Create: `src/styles/_tokens.scss`, `src/styles/global.scss`; move `src/_breakpoints.scss` → `src/styles/_breakpoints.scss`
- Create: `src/components/Nav/{Nav.jsx,Nav.scss,Nav.test.jsx}`
- Rewrite: `src/components/Footer/{Footer.jsx,Footer.scss}`; create `Footer.test.jsx`
- Create: `src/components/Section/{Section.jsx,Section.scss}`
- Modify: `index.html` — Google Fonts links for chosen fonts
- Modify: `src/App.jsx` — render `<Nav/>`, `<main>` (empty for now), `<Footer/>`; import `global.scss`

**Interfaces:**
- Consumes: `useContent`, `useLanguage` (Task 3), `profile` (Task 2).
- Produces: `Section({ id, number, label, children })` → `<section id aria-labelledby>` with left label column (`number` in accent, e.g. `'01'`) and content column; stacks on mobile. Section ids: `summary`, `work`, `skills`, `about`, `earlier`; contact id `contact`.

- [ ] **Step 1: Write tests:**
  - Nav: link "Download CV" has `href="/Asaf_Lopez_CV.pdf"` and a `download` attribute; anchor links point to `#work`, `#skills`, `#about`, `#contact`; language button click switches nav text to Spanish (`Trabajo` or whatever `es.nav.work` is — assert against `es.nav.work`).
  - Footer: contains `profile.linkedin` and `mailto:` link; faith line text ends with `✝︎`; current year rendered via `new Date().getFullYear()`.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3:** Implement tokens, global styles (focus-visible outline in accent, reduced-motion disables transitions/animations), Nav (sticky; on <768px anchors hidden, Download CV + lang toggle remain), Footer, Section.
- [ ] **Step 4: Run** `npm test` → PASS; `npm run dev` visual check at 360px and 1440px.
- [ ] **Step 5: Commit** `feat: add design tokens, nav, footer and section shell`.

---

### Task 5: Hero

**Files:**
- Create: `src/components/Hero/{Hero.jsx,Hero.scss,Hero.test.jsx}`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `useContent().hero`, `profile`.

- [ ] **Step 1: Write tests:** single `h1` containing "Asaf" and "Lopez"; all three `hero.titles` rendered; `img` with `src="/profile-pic.jpg"` and non-empty alt; "Let's talk" link `href="#contact"`; CV link `href="/Asaf_Lopez_CV.pdf"` with `download`; three stat values rendered.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3:** Implement per mockup `page-structure.html`: huge name, titles, location, hook, two buttons, photo, accent stat column; on mobile stacks name → photo → stats row. Photo gets explicit width/height to avoid layout shift.
- [ ] **Step 4: Run** → PASS; visual check 360/768/1440.
- [ ] **Step 5: Commit** `feat: add hero section`.

---

### Task 6: Content sections 01–05

**Files:**
- Create: `Summary/Summary.jsx`, `Experience/{Experience.jsx,Experience.scss,Experience.test.jsx}` (replacing old files), `Skills/{Skills.jsx,Skills.scss}`, `Leadership/Leadership.jsx`, `Earlier/{Earlier.jsx,Earlier.scss}`
- Create: `src/App.test.jsx` additions
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `Section` (Task 4), `useContent()` keys `summary`, `experience`, `skills`, `leadership`, `earlier`.

- [ ] **Step 1: Write tests:**
  - Experience: renders 3 company headings in order SoberanIA, The Web Factory, Globant; Globant shows 3 client sub-headings; text "Global Biotech & Pharmaceutical Company (NDA)" present.
  - App: section labels appear in DOM order `01`…`05`; every one of `en.skills.groups[].name` is rendered; toggling language renders `es.summary.text`.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3:** Implement. Experience: role rows (company · title left, dates right), context line, bullets; Globant engagements as indented sub-blocks. Skills: group name + chips (bordered, square). Earlier: compact rows + education + languages.
- [ ] **Step 4: Run** `npm test` → PASS; visual check.
- [ ] **Step 5: Commit** `feat: add summary, experience, skills, leadership and earlier sections`.

---

### Task 7: Contact form + Web3Forms

**Files:**
- Create: `src/components/Contact/{submitContact.js,submitContact.test.js,Contact.jsx,Contact.scss,Contact.test.jsx}`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces:
  - `validateContact({ name, email, message }): { name?: 'required', email?: 'required'|'email', message?: 'required' }` — empty object when valid; trims values; email checked with a simple `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
  - `submitContact({ name, email, message, botcheck }, { accessKey, fetchImpl = fetch }): Promise<{ ok: boolean }>` — throws nothing; returns `{ ok:false }` when `accessKey` is falsy, fetch rejects, response not ok, or JSON `success !== true`. POST `https://api.web3forms.com/submit`, JSON body `{ access_key, name, email, message, subject: 'asaflopez.com — new message from <name>', from_name: 'asaflopez.com', replyto: email, botcheck }`.
  - `Contact()` — states `idle | sending | success | error`.

- [ ] **Step 1: Write tests (`submitContact.test.js`):**
  - valid input + `fetchImpl` resolving `{ ok:true, json: () => ({ success:true }) }` → `{ ok:true }`; assert URL, method, and body includes `access_key`, `replyto: email`.
  - `success:false` → `{ ok:false }`; fetch rejects → `{ ok:false }`; `accessKey: ''` → `{ ok:false }` and fetch not called. (Review Focus 1)
  - `validateContact({name:'',email:'x',message:' '})` → `{ name:'required', email:'email', message:'required' }`.
- [ ] **Step 2: Write tests (`Contact.test.jsx`)** with `vi.stubGlobal('fetch', …)`:
  - heading text equals `en.contact.heading`; inputs have accessible labels.
  - submit empty → field errors shown, fetch not called.
  - valid submit with pending fetch → button disabled and shows `en.contact.sending`; second click doesn't call fetch again (Review Focus 2); resolve → `en.contact.success` shown, fields cleared.
  - fetch rejects → `en.contact.error` shown with link `mailto:asaf.eduardo@gmail.com` (Review Focus 1).
  - hidden honeypot `botcheck` checkbox exists and is not focusable (`tabIndex=-1`, visually hidden).
- [ ] **Step 3: Run** → FAIL.
- [ ] **Step 4:** Implement; key from `import.meta.env.VITE_WEB3FORMS_KEY` (tests inject via `vi.stubEnv`). Black block, two columns on desktop (heading + direct links / form), stacked on mobile; `aria-live="polite"` status region.
- [ ] **Step 5: Run** `npm test` → PASS.
- [ ] **Step 6: Commit** `feat: add contact form with Web3Forms`.

---

### Task 8: Cleanup, SEO, accessibility and release check

**Files:**
- Delete: old components and assets listed under "Removed" above; `src/resumeData.js`
- Modify: `index.html` — `<title>Asaf Lopez — Senior Frontend Engineer & Software Architect</title>`, meta description (from `en.meta.description`), Open Graph (`og:title`, `og:description`, `og:image` = `https://asaflopez.com/profile-pic.jpg`, `og:url` = `https://asaflopez.com/`), `theme-color` `#2b3bff`
- Replace: `public/favicon.ico` (or add `public/favicon.svg`: "AL" in accent square)
- Modify: `resume-react/README.md` — dev/test/build/deploy steps, `.env` key setup, PDF location

- [ ] **Step 1:** Delete dead files; `npm test` → PASS; `npm run build` → succeeds with no warnings about missing imports; `grep -r "resumeData\|react-scripts" src package.json` → no matches.
- [ ] **Step 2: Manual checks** with `npm run preview` (use chrome-devtools MCP if available):
  - 360px, 768px, 1440px: no horizontal scroll (`document.documentElement.scrollWidth <= innerWidth`), nav Download CV visible at 360px (Review Focus 5).
  - Lighthouse accessibility ≥ 95, no contrast failures; keyboard tab order reaches nav, CTAs, form, submit with visible focus.
  - Footer cross renders as monochrome glyph, not emoji, in Chrome on Windows.
  - EN/ES toggle switches all sections; reload remembers choice.
- [ ] **Step 3: Commit** `chore: remove legacy components, add SEO meta and docs`.
- [ ] **Step 4: Release gate (owner involvement, do not skip):**
  - `public/Asaf_Lopez_CV.pdf` exists (owner-exported) — owner reviews it.
  - `.env` has real `VITE_WEB3FORMS_KEY`; rebuild; owner sends a test message from `npm run preview` and confirms it arrives in the Gmail inbox (not spam) with reply-to = sender.
  - Owner approves the site visually; then merge to `main` and upload `dist/` contents to Banahosting `public_html`.
