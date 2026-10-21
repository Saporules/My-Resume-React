// Static files that ship next to the app: crawler hints and the Apache security config.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const read = (path) => readFileSync(resolve(__dirname, '../..', path), 'utf8');
const indexHtml = read('index.html');

test('the CSP allows exactly the inline theme script in index.html', () => {
  const inline = [...indexHtml.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  expect(inline).toHaveLength(1);
  const hash = createHash('sha256').update(inline[0]).digest('base64');
  expect(read('public/.htaccess')).toContain(`'sha256-${hash}'`);
});

test('the Apache config forces HTTPS and sends the core security headers', () => {
  const htaccess = read('public/.htaccess');
  expect(htaccess).toMatch(/RewriteRule .*https:\/\/%\{HTTP_HOST\}/);
  for (const header of [
    'Content-Security-Policy',
    'Strict-Transport-Security',
    'X-Content-Type-Options',
    'Referrer-Policy',
    'Permissions-Policy',
    'X-Frame-Options',
  ]) {
    expect(htaccess).toContain(`Header always set ${header}`);
  }
  expect(htaccess).toContain('https://api.web3forms.com');
});

test('robots.txt points crawlers at the sitemap', () => {
  expect(read('public/robots.txt')).toContain('Sitemap: https://asaflopez.com/sitemap.xml');
  expect(read('public/sitemap.xml')).toContain('<loc>https://asaflopez.com/</loc>');
});

test('index.html describes the owner as structured data', () => {
  const json = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  const person = JSON.parse(json);
  expect(person['@type']).toBe('Person');
  expect(person.name).toBe('Asaf Lopez');
  expect(person.url).toBe('https://asaflopez.com/');
  expect(person.sameAs).toContain('https://www.linkedin.com/in/asaf-lopez-govea');
});

test('llms.txt is markdown with a title', () => {
  expect(read('public/llms.txt')).toMatch(/^# Asaf Lopez/);
});
