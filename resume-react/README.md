# asaflopez.com

Personal resume site. React 19 + Vite + SCSS, single page, English/Spanish.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # Vitest
```

## Content

All copy lives in `src/content/`:

- `profile.js` — name, email, phone, LinkedIn, photo and CV paths (same in both languages)
- `en.js` / `es.js` — every visible string; both files must keep the same shape (a test enforces it)

## Contact form

The form posts to [Web3Forms](https://web3forms.com). Create an access key for the
inbox that should receive messages, then:

```bash
cp .env.example .env
# set VITE_WEB3FORMS_KEY=<your key>
```

The key is baked into the build, so set it before `npm run build`.

## Security headers

`public/.htaccess` ships inside `dist/` and makes Apache/LiteSpeed redirect to HTTPS,
block dotfiles and send a Content-Security-Policy plus the usual hardening headers.

The CSP allows the one-line theme script in `index.html` by its sha256. If you edit
that script, update the hash in `.htaccess` — `npm test` fails until they match.
If you add a third-party service (analytics, another form provider), add its domain
to the matching CSP directive or the browser will block it.

## Release checklist

1. `public/Asaf_Lopez_CV.pdf` exists and is the current CV.
2. `.env` has the real `VITE_WEB3FORMS_KEY`.
3. `npm test` passes, then `npm run build`.
4. `npm run preview`, send a test message, confirm it lands in the inbox (not spam) with reply-to set to the sender.
5. Upload the **contents** of `dist/` to `public_html` on Banahosting (cPanel File Manager or FTP),
   including the hidden `.htaccess` (enable "Show Hidden Files" in File Manager).
6. Open `http://asaflopez.com` and confirm it redirects to `https://`; check the headers at
   [securityheaders.com](https://securityheaders.com/?q=asaflopez.com).
