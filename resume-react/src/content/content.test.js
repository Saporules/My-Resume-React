import en from './en';
import es from './es';
import profile from './profile';

const CROSS = '✝︎';

// Maps every leaf to its type while keeping keys and array lengths, so two
// languages with the same structure produce identical shapes.
const shape = (value) => {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  }
  return typeof value;
};

const leaves = (value) => {
  if (Array.isArray(value)) return value.flatMap(leaves);
  if (value && typeof value === 'object') return Object.values(value).flatMap(leaves);
  return [value];
};

test('ES content has exactly the same shape as EN', () => {
  expect(shape(es)).toEqual(shape(en));
});

test('experience lists the three employers newest first', () => {
  expect(en.experience.items.map((i) => i.company)).toEqual([
    'SoberanIA',
    'The Web Factory',
    'Globant',
  ]);
});

test('Globant shows the three anonymized client engagements', () => {
  const globant = en.experience.items.find((i) => i.company === 'Globant');
  expect(globant.engagements.map((e) => e.client)).toEqual([
    'Global Biotech & Pharmaceutical Company (NDA)',
    'US Retirement & Wealth Management Platform — top-tier national provider (NDA)',
    'Global Investment Bank — Tier 1, US market (NDA)',
  ]);
});

test('sections have the CV counts', () => {
  expect(en.skills.groups).toHaveLength(12);
  expect(en.leadership.bullets).toHaveLength(3);
  expect(en.earlier.roles).toHaveLength(3);
  expect(en.hero.titles).toEqual(['Senior Frontend Engineer', 'Software Architect', 'AI Engineer']);
  expect(en.hero.stats).toHaveLength(3);
});

test('contact heading matches the owner copy', () => {
  expect(en.contact.heading).toBe(
    'Interested in my profile, or need help with your startup or project?'
  );
});

test('footer faith line ends with a text-presentation cross in both languages', () => {
  expect(en.footer.faith.endsWith(CROSS)).toBe(true);
  expect(es.footer.faith.endsWith(CROSS)).toBe(true);
});

test('no copy string is empty', () => {
  for (const s of [...leaves(en), ...leaves(es)]) {
    expect(typeof s === 'string' ? s.trim() : s).toBeTruthy();
  }
});

test('profile carries the contact data', () => {
  expect(profile).toMatchObject({
    email: 'asaf.eduardo@gmail.com',
    phone: '+52 55 7346 9088',
    linkedin: 'https://www.linkedin.com/in/asaf-lopez-govea',
    photo: '/profile-pic.jpg',
    cvUrl: '/Asaf_Lopez_CV.pdf',
  });
});
