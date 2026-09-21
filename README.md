# Manav Sehgal — Portfolio

Premium dark portfolio built with React + Vite, Framer Motion, Recharts, and Lucide.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Edit content

Most personal content is centralized in:

```text
src/data.js
```

Update:
- name/title/location/email
- resume URL
- LinkedIn/GitHub
- bio
- skills
- projects
- experience and education
- chart datasets

For a real profile image, replace the initials placeholder in `src/App.jsx` with an `<img>` and add the image under `public/`.

## Deploy to Vercel

1. Push the project to GitHub.
2. Open Vercel and import the repository.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

Update the `og:url`, `robots.txt`, and `sitemap.xml` URLs after you have your final domain.
