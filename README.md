# Aniruddha Chaudhari: portfolio

Next.js 16 (App Router, TypeScript) with an isometric theme.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Layout

- `app/`: routes (`/` and `/projects`), the root layout (fonts, metadata, theme) and `globals.css`.
- `components/`: page sections and client components (header and theme toggle, project list with hover preview, GitHub card, copy-email button).
- `components/figures/`: the isometric drawings. `*-svg.ts` hold the generated markup; `*-behavior.ts` hold their interactions (typing desk, spinning gears).
- `lib/`: site constants, project and contribution helpers.
- `data/`: `projects.json` (edit this to change the project list) and `contributions.json` (GitHub activity snapshot).
- `public/`: images, favicon, `og.png`, `robots.txt`.
- `archive/`: the previous dither version and the static-page generator, zipped for reference.

Set `NEXT_PUBLIC_SITE_URL` to the production origin so link previews use absolute URLs.

## Adding things

- New project: add an entry to `data/projects.json` and drop its screenshot in `public/images/`.
- New page: add `app/<name>/page.tsx`; reuse `SiteHeader` and `SiteFooter`.
- API route (visitor counter, live GitHub stats): add `app/api/<name>/route.ts`, then fetch it from a client component or replace `getContributionGraph()` in `lib/contributions.ts`.

## Contact form

The freelance form on the home page sends through [Web3Forms](https://web3forms.com). Create a free access key for your email, then set it as `NEXT_PUBLIC_WEB3FORMS_KEY` (in `.env.local` and in the Vercel project settings). Without the key the form falls back to opening an email draft.
