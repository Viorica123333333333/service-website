# Furniture & wardrobe assembly — informational website

A single-page marketing site for an independent furniture-assembly service in Chișinău,
Moldova, built with React, TypeScript and Vite. This is a **portfolio / practice project** —
I built it end to end (design tokens, layout, animation, accessibility, security headers,
tests, deployment config) as a demonstration of front-end engineering practice, and I'm
actively iterating on it while I look for a UI/front-end engineering role.

**Live demo:** _add your deployed Netlify URL here once published_
**Status:** feature-complete as a prototype. All copy, images and business details are
placeholders — see [Project status](#project-status) below before treating this as a real
business's website.

If you're a recruiter or engineer looking at this repo: thank you for taking the time. I'd
genuinely welcome any feedback — feel free to open an issue or reach out directly.

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

`PRE_LAUNCH_CHECKLIST.md` has the full list of what a genuine deployment for a real business
would still need.

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
- **Real automated tests**, not just tooling left unused — see [Testing](#testing).
- **Content/code separation** — nearly all editorial copy lives in typed config files under
  `src/config/`, so content changes never require touching component code.
- **A hand-built hero animation** (`src/components/Hero/WardrobeAssembly.tsx`) using the Web
  Animations API and SVG, with no animation library dependency — illustrated wardrobe panels
  fly in along guide lines and crossfade into a real photograph.

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
| ----------------------- | -------------------------------------------------------------------- |
| `npm run dev`           | Starts the Vite dev server with hot module reload.                   |
| `npm run build`         | Type-checks the project and builds the production bundle (`dist/`). |
| `npm run preview`       | Serves the production build locally for a final check.               |
| `npm run lint`          | Runs ESLint (React, hooks, and JSX accessibility rules).             |
| `npm run lint:fix`      | Same as above, auto-fixing what it can.                              |
| `npm run format`        | Formats the codebase with Prettier.                                  |
| `npm run format:check`  | Checks formatting without modifying files.                           |
| `npm run typecheck`     | Type-checks only, without building.                                  |
| `npm run test`          | Runs the test suite once (Vitest).                                   |
| `npm run test:watch`    | Runs tests in watch mode.                                            |
| `npm run audit`         | Checks production dependencies for known vulnerabilities.            |

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
│   ├── config/                 # ⭐ Editable content files (see below)
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

## Editing content (no code required)

Almost all editorial copy lives in `src/config/`, so updating the site mostly means editing
plain text in these files rather than touching components:

- `business.ts` — name, phone, email, WhatsApp, location, travel radius, hours, languages,
  social links, phone prefix, currency, timezone.
- `services.ts` — the services list and the wall-fixing clarification copy.
- `process.ts` — the "How we work" steps and the six benefit callouts.
- `faq.ts` — frequently asked questions.
- `gallery.ts` — gallery items (title, description, category, image, alt text).
- `testimonials.ts` — placeholder testimonials. **Don't publish this text as real reviews.**
  Replace with genuine reviews, with explicit client consent, then set
  `isPlaceholderData = false`.
- `wardrobeStory.ts` — copy for the "specialist wardrobe assembly" scroll sequence.
- `nav.ts` — navigation menu links.

Any text in square brackets, e.g. `[BUSINESS NAME]`, is a placeholder and needs replacing
with real, verified information before this is used for an actual business.

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

**Important:** the photos in `public/images/real/` are generic reference photography (not
photos of actual completed jobs by this fictional business). Replace them with real photos of
your own work once available, keeping the same filenames (or updating the reference in
`src/config/services.ts` / `src/config/wardrobeStory.ts` /
`src/components/Hero/WardrobeAssembly.tsx` if you rename them).

**The hero animation** (`src/components/Hero/WardrobeAssembly.tsx` +
`src/hooks/useWardrobeAssembly.ts`): illustrated panels fly in along dashed guide lines and
assemble into a flat illustration, which then crossfades into the real photograph
`wardrobe-assembled.jpg` — the animation's final, permanent state. It's an illustrated (not
photorealistic) interpretation of the assembly motion, since there's no real photography of
this particular wardrobe's disassembled parts; if layered photos of a real assembly become
available, the animation can be rebuilt for a photorealistic result.

For the Gallery and portrait images, which are still placeholder SVGs: save a real, optimised
photo (JPG or WebP, ideally under 300 KB) under **exactly the same filename** (only changing
the extension if needed — update the reference in `src/config/gallery.ts` too if you do).
Keep a similar aspect ratio to the original for a clean layout.

To regenerate the placeholder SVGs (for example, after accidentally deleting one):

```bash
node scripts/generate-placeholders.mjs
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

**In this deployment, the form is switched off.** `Contact.tsx` sets a single
`PROTOTYPE_FORM_DISABLED` flag to `true`, which disables every field and the submit button and
shows a visible notice explaining why. A disabled submit button can't be activated by mouse or
keyboard, so the submission handler never runs in practice; the handler also has its own guard
on the same flag as defence-in-depth. The validation and submission code is left fully intact
and readable as a demonstration — flip the flag (and work through
`PRE_LAUNCH_CHECKLIST.md`) before using this for a real deployment that should actually
collect enquiries.

### Setting up email notifications (in Netlify, not in code)

1. In the Netlify dashboard, open the site → **Site configuration → Forms → Form
   notifications**.
2. Add an "Email notification" pointing at the business's email address.
3. No API keys or SMTP credentials are needed in code — Netlify handles this entirely.

### If you need file attachments on the form

Netlify Forms doesn't reliably support large file uploads for this simple a setup, so the
current form asks the customer to send photos separately by email or WhatsApp after
submitting. If you do want in-form uploads, the recommended approach is a small **Netlify
Function** that validates the MIME type (an allow-list of JPG/PNG/WebP), caps the file size,
generates a random filename, and forwards it to an approved storage/email provider (e.g.
Resend, Postmark, or an S3-compatible bucket). See `SECURITY.md` for the security requirements
such a function would need to meet. It isn't included by default, since Netlify Forms covers
the baseline requirement without adding extra complexity or cost.

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

## Deploying

### Option A — Netlify dashboard (recommended to start)

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. In Netlify: **Add new site → Import an existing project**, and select the repository.
3. Build command: `npm run build` · Publish directory: `dist` (already set in `netlify.toml`
   — Netlify will pick these up automatically).
4. Deploy. Netlify detects the static form described above automatically.
5. Set up form notifications (see above).
6. Update the real domain in `index.html` (canonical, Open Graph), `public/sitemap.xml`,
   `public/robots.txt`, and `src/config/business.ts` (`siteUrl`).
7. HTTPS is issued automatically (Let's Encrypt, via Netlify). Only after confirming it's
   working correctly on the final domain, consider enabling the HSTS header (see the comment
   in `netlify.toml` and `SECURITY.md`).

### Option B — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --build            # preview deploy
netlify deploy --build --prod     # production deploy
```

### Do you need a backend (e.g. Render)?

No — not for this project as built. There's no database, no server-rendered content, and the
only "backend" behaviour (handling the contact form) is fully covered by Netlify Forms, which
runs on Netlify's own infrastructure. A separate backend host would only become relevant if
this grew a feature Netlify Forms genuinely can't cover, such as file-upload attachments
handled by a custom API rather than a Netlify Function (see [The contact form](#the-contact-form)
above) — and even that's more naturally solved with a Netlify Function first.

## Before this goes live for real

See `PRE_LAUNCH_CHECKLIST.md` for the full list. In short:

- **Real business details** (`src/config/business.ts`): name, full name, phone, email,
  WhatsApp, location, service area, travel radius/cost policy, hours, languages.
- **Real photos**, replacing the placeholder SVGs in `public/images/`.
- **Real testimonials**, with explicit client consent, or removing the section entirely.
- **Editable policies** in `faq.ts` (missing parts, cancellations) — fill in the sections
  marked "[POLICY TO CONFIRM]".
- **Legal review** of `src/pages/PrivacyPolicyPage.tsx`, `CookiePolicyPage.tsx`, and
  `TermsPage.tsx` by someone familiar with Moldovan law.
- **Netlify configuration**: form notifications, a custom domain, and environment variables
  (only if the optional email/attachment function is added).
- **Re-enabling the contact form**: set `PROTOTYPE_FORM_DISABLED = false` in `Contact.tsx`.

## License

[MIT](LICENSE) — use this code freely, including as a reference for your own projects.
