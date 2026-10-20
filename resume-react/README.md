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

## Release checklist

1. `public/Asaf_Lopez_CV.pdf` exists and is the current CV.
2. `.env` has the real `VITE_WEB3FORMS_KEY`.
3. `npm test` passes, then `npm run build`.
4. `npm run preview`, send a test message, confirm it lands in the inbox (not spam) with reply-to set to the sender.
5. Upload the **contents** of `dist/` to `public_html` on Banahosting (cPanel File Manager or FTP).
