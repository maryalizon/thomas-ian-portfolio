# Thomas Ian A. Portfolio

Premium, responsive portfolio for Thomas Ian A., Video Editor and Creative
Strategist.

## Edit the content

Open `src/App.jsx`. The editable showreel, portrait, portfolio projects,
services, testimonials, links, and contact details are all in this file.

## Add local media

Upload images or short videos to `public/media`.

Use paths such as:

```js
const PORTRAIT_URL = "/media/portrait.webp";
const SHOWREEL_URL = "/media/showreel.mp4";
```

You may also paste YouTube, Vimeo, Google Drive, or Cloudinary embed URLs.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Netlify

1. Import this GitHub repository in Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`

The included `netlify.toml` normally fills these settings automatically.
