# Furniture & wardrobe assembly — informational website

A single-page marketing site for an independent furniture-assembly service in Chișinău,
Moldova, built with React, TypeScript and Vite. This is a **portfolio / practice project** —
I built it end to end (design tokens, layout, animation, accessibility, security headers,
tests, deployment config) as a demonstration of front-end engineering practice, and I'm
actively iterating on it while I look for a UI/front-end engineering role.

**Live demo:**

## Contents

- [Project status](#project-status)
- [Highlights](#highlights)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Editing content (no code required)](#editing-content-no-code-required)
- [Replacing the images](#replacing-the-images)
- [The contact form](#the-contact-form)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [Security](#security)
- [Deploying](#deploying)
- [Before this goes live for real](#before-this-goes-live-for-real)
- [License](#license)

## Project status

This repository is published as a **working prototype**, not a live business:

- All business details (name, phone, email, address) are bracketed placeholders, e.g.
  `[BUSINESS NAME]` — see `src/config/business.ts`.
- The gallery and about-page photos are generated placeholder illustrations, clearly labelled
  as such. The hero and "specialist wardrobe assembly" sections use real reference
  photography that isn't of this fictional business's own work.
- Testimonials are placeholder data (`isPlaceholderData = true` in
  `src/config/testimonials.ts`) and are never presented as genuine reviews.
- **The contact/quote form is intentionally disabled.** Every field and the submit button are
  rendered `disabled`, with a visible on-page notice, so nobody can submit real personal data
  through this deployment. The full validation and Netlify Forms integration is left in place
  and readable — it's a deliberate demonstration of a working implementation, not something
  half-built. See [The contact form](#the-contact-form) and `SECURITY.md`.
- Legal pages (privacy policy, cookie policy, terms) are structured templates with explicit
  "[TO CONFIRM]" markers where real legal review would be required — they are not legal
  advice and aren't meant to be used as-is.

## Highlights

A few things this project is meant to demonstrate:

- **Accessibility as a default, not an afterthought** — semantic landmarks, a skip link,
  visible `:focus-visible` states throughout, a focus-trapped mobile menu and lightbox,
  `aria-live` regions for async form status, keyboard-operable everything, and full
  `prefers-reduced-motion` support (including for a hand-built Web Animations API sequence,
  not just CSS transitions).
- **Security-conscious defaults** — a strict Content-Security-Policy and other hardening
  headers in `netlify.toml`, no inline styles/scripts, no `dangerouslySetInnerHTML` anywhere,
  input sanitisation helpers, a honeypot field, and a written threat model in `SECURITY.md`.
- **Progressive enhancement** — the site's essential content and contact details are reachable
  without JavaScript (see the `<noscript>` block in `index.html`), and the sticky-scroll
  storytelling section degrades to plain document flow rather than breaking.

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Vite 5](https://vitejs.dev/) for dev server and build
- [React Router 6](https://reactrouter.com/) (static routes only — no data APIs in use)
- CSS Modules — no CSS framework or component library; a small design-token system in
  `src/styles/tokens.css`
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for tests
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) for linting/formatting
- Deployed as a static site on [Netlify](https://www.netlify.com/), using Netlify Forms for
  the contact form (no custom backend)

## Getting started

Requirements: Node.js 20+ and npm 10+.

```bash
npm install
cp .env.example .env   # optional, only needed for local dev overrides
npm run dev
```

The site runs at `http://localhost:5173` by default.

## Available scripts

| Script                 | What it does                                                        |
| ---------------------- | ------------------------------------------------------------------- |
| `npm run dev`          | Starts the Vite dev server with hot module reload.                  |
| `npm run build`        | Type-checks the project and builds the production bundle (`dist/`). |
| `npm run preview`      | Serves the production build locally for a final check.              |
| `npm run lint`         | Runs ESLint (React, hooks, and JSX accessibility rules).            |
| `npm run lint:fix`     | Same as above, auto-fixing what it can.                             |
| `npm run format`       | Formats the codebase with Prettier.                                 |
| `npm run format:check` | Checks formatting without modifying files.                          |
| `npm run typecheck`    | Type-checks only, without building.                                 |
| `npm run test`         | Runs the test suite once (Vitest).                                  |
| `npm run test:watch`   | Runs tests in watch mode.                                           |
| `npm run audit`        | Checks production dependencies for known vulnerabilities.           |

## Project structure

```
├── index.html                  # HTML entry point, meta tags, static Netlify-detection form
├── netlify.toml                # Build config, redirects, security headers/CSP
├── public/
│   ├── robots.txt, sitemap.xml, favicon.svg, _redirects, early.js
│   └── images/                 # Real reference photos + generated placeholder SVGs
├── scripts/
│   └── generate-placeholders.mjs  # Regenerates the placeholder gallery/about SVGs
├── src/
│   ├── config/                 # Editable content files (see below)
│   ├── components/             # React components, each with its own CSS Module
│   ├── pages/                  # HomePage + legal pages + 404, wired up via React Router
│   ├── hooks/                  # Reusable hooks (focus trap, scroll lock, intersection, etc.)
│   ├── utils/                  # Validation, sanitisation, structured data, safe links
│   │   └── *.test.ts           # Unit tests for the pure utility functions
│   └── styles/                 # tokens.css (design variables) + global.css (reset, utilities)
├── SECURITY.md
├── PRE_LAUNCH_CHECKLIST.md
├── .env.example
└── package.json
```

## Replacing the images

The site currently uses two kinds of images:

```
public/images/real/wardrobe-assembled.jpg   — final photo, used in the Hero (end of the assembly animation)
public/images/real/dulapuri.jpg             — used in Services ("Wardrobes")
public/images/real/mobilier-dormitor.jpg    — used in Services ("Bedroom furniture")
public/images/real/mobilier-modular.jpg     — used in Services ("Modular furniture")
public/images/real/story-nivelare.jpg       — "Careful levelling" step in the wardrobe story
public/images/real/story-aliniere.jpg       — "Door alignment" step
public/images/real/story-interior.jpg       — "Interior organisation" step
public/images/real/story-verificare.jpg     — "Final check" step
public/images/gallery/*.svg                 — generated placeholder SVGs, used in the Gallery
public/images/about/portret.svg             — placeholder SVG
public/og-image.svg                         — placeholder SVG (social share image)
```

## The contact form

The site uses **Netlify Forms**, with no custom backend:

1. `index.html` contains a hidden static form (`name="solicitare-oferta"`) with
   `data-netlify="true"` and `netlify-honeypot="bot-field"`. Netlify parses this at build time
   and registers the form.
2. The real, visible form is the React component `src/components/Contact/Contact.tsx`. On
   submit, it would `fetch('/', { method: 'POST', ... })` with URL-encoded data, using the
   same `form-name`.
3. Submissions would appear under **Netlify dashboard → Site configuration → Forms**.

**In this deployment, the form is switched off.**

## Testing

```bash
npm run test        # run once
npm run test:watch  # watch mode
```

`src/utils/validation.test.ts` and `src/utils/sanitize.test.ts` cover the form-validation
rules and the text-sanitisation helpers with Vitest — pure functions with no DOM dependency,
so they run fast and need no extra test environment configuration. They're a starting point
rather than full coverage; the natural next additions would be component tests (Testing
Library is already a dependency) for the accordion, lightbox, and mobile menu interactions.

## Accessibility

Manual checks worth doing on any change, alongside the automated tests:

- **Keyboard navigation**: Tab/Shift+Tab through the whole site, including the mobile menu,
  gallery, and FAQ accordion; Escape closes the mobile menu and the gallery lightbox.
- **`prefers-reduced-motion`**: enable this OS/DevTools preference and confirm animations
  (scroll reveals, the wardrobe sequence, the accordion) are reduced or removed.
- **Responsive layout**: check mobile (~375px), tablet (~768px), and desktop (~1280px+),
  including at 200% browser zoom.
- **Lighthouse**: run an audit (Chrome DevTools → Lighthouse) for Accessibility, Performance,
  Best Practices, and SEO against the production build (`npm run preview`).

## Security

See `SECURITY.md` for the full threat model and a detailed list of what's implemented (CSP
and other headers, input handling, honeypot, no secrets in the repo, dependency hygiene, and
why the contact form ships disabled in this deployment). The short version: this is a static
site with no user accounts, no database, and no custom backend by default, which keeps the
realistic attack surface small.
