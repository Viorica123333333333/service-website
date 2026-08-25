# Pre-launch checklist

Organised by category, so it's clear who needs to act on each item. This file describes what
it would take to turn this **portfolio prototype** into a genuine production deployment for a
real business — it is not itself a to-do list for the demo as currently published.

## ✅ Already implemented (no action needed)

- [x] Full React + TypeScript + Vite structure, with reusable components.
- [x] Responsive, mobile-first design, using the specified colour system and typography.
- [x] Sticky header, accessible mobile menu (focus trap, Escape, scroll lock, correct ARIA).
- [x] Sticky/crossfade scroll sequence for the "specialist wardrobe assembly" section, with a
      working no-JavaScript fallback and respect for `prefers-reduced-motion`.
- [x] Gallery with category filters and an accessible lightbox (keyboard, focus trap, labels).
- [x] Accessible FAQ accordion (correct `aria-expanded`/`aria-controls`).
- [x] Full contact/quote form, with client-side validation, loading/success/error states,
      duplicate-submission prevention, a honeypot field, and a Netlify Forms integration —
      **currently rendered fully `disabled`** for this public demo, with a visible on-page
      notice, so no visitor can submit real personal data to it (see `SECURITY.md`).
- [x] Legal page templates (privacy, cookies, terms) plus an accessible 404 page.
- [x] SEO meta tags, Open Graph, `HomeAndConstructionBusiness` JSON-LD, `robots.txt`,
      `sitemap.xml`.
- [x] Security headers + CSP in `netlify.toml` (no `'unsafe-inline'` in `style-src`),
      `.gitignore`, `.env.example` with no real secrets.
- [x] Skip link, visible focus states, `lang="en-GB"`, semantic landmark structure.
- [x] All UI copy in British English; Moldova-specific business facts (Chișinău base
      location, MDL currency, `+373` phone format) intentionally retained as content.

## 🟡 Needs your real business details

All in `src/config/business.ts` unless noted otherwise:

- [ ] Business name (`name`) and the professional's full name (`fullName`).
- [ ] Phone number (`phone`, `phoneHref`) — Moldova format, `+373`.
- [ ] Email address (`email`).
- [ ] WhatsApp number (`whatsappNumber`, `whatsappHref`).
- [ ] Base location (`baseLocation`), areas served (`servedAreas`), travel radius
      (`serviceRadius`), and the travel-cost policy (`travelCostPolicy`).
- [ ] Working hours (`workingHours`).
- [ ] Languages spoken (`languagesSpoken`).
- [ ] Real social links, if any (`socialLinks`) — leave the list empty if none.
- [ ] Business registration details, if you want them displayed (`registrationDetails`).
- [ ] Real production domain (`siteUrl`), kept in sync with `index.html` (`canonical`,
      `og:url`), `public/sitemap.xml`, and `public/robots.txt`.
- [ ] Real photographs in place of the placeholder SVGs in `public/images/gallery/` and
      `public/images/about/` (see README — "Replacing the images"). The hero and "specialist
      wardrobe assembly" sections already use real reference photography
      (`public/images/real/`).
- [ ] Real testimonials, with explicit client consent, in `src/config/testimonials.ts` (set
      `isPlaceholderData = false` after replacing), or remove the section from
      `src/pages/HomePage.tsx` if none are available.
- [ ] Policies marked "[POLICY TO CONFIRM]" in `src/config/faq.ts` (missing/damaged parts,
      cancellations/rescheduling) and in `src/pages/TermsPage.tsx`.
- [ ] Estimated response time shown in the contact section
      (`src/components/Contact/Contact.tsx`, the "Estimated response time" text).
- [ ] Re-enable the contact form: set `PROTOTYPE_FORM_DISABLED = false` in
      `src/components/Contact/Contact.tsx` once this becomes a genuine deployment collecting
      real enquiries — and only after Netlify Forms notifications are configured (below).
- [ ] Replace the placeholder Open Graph image (`public/og-image.svg`, referenced from
      `index.html`) with a real 1200×630 JPG/PNG — most social platforms don't render SVG
      link-preview images.

## 🟠 Needs configuration in the Netlify dashboard

- [ ] Connect the Git repository and confirm the build (`npm run build`, publish `dist`)
      succeeds on Netlify.
- [ ] Turn on email notifications for the `solicitare-oferta` form (Site configuration →
      Forms → Form notifications).
- [ ] Configure a custom domain and confirm HTTPS is issued automatically.
- [ ] Only after confirming HTTPS on the final domain: decide whether to enable the HSTS
      header (off by default in `netlify.toml`, with the reasoning in `SECURITY.md`).
- [ ] If you add the optional Netlify Function for attachments/email: set the environment
      variables in Site configuration → Environment variables (never in code).

## 🔴 Needs legal review (Republic of Moldova specific)

- [ ] Full review of `src/pages/PrivacyPolicyPage.tsx` by a specialist familiar with Moldovan
      personal data protection law — especially the legal basis for processing (section 3)
      and the retention period (section 6), both marked "[TO CONFIRM]".
- [ ] Confirm the actual providers used (hosting, any email provider) and complete the
      section on international data transfers, if applicable.
- [ ] Review `src/pages/TermsPage.tsx` against Moldovan e-commerce and consumer-protection
      law.
- [ ] Confirm that the site, as configured (no non-essential cookies, no analytics), doesn't
      require a cookie-consent banner — and add one if analytics or other tracking
      technologies are enabled later (see `src/pages/CookiePolicyPage.tsx`).

## Technical checks to run locally before every launch

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
npm run audit
```

Plus the manual checks described in README.md ("Testing and verification"): keyboard
navigation, `prefers-reduced-motion`, responsive layout at 375px/768px/1280px+ and at 200%
zoom, a Lighthouse audit (accessibility, performance, best practices, SEO), link checking,
the form's success/error flow, and Netlify's headers/redirects (a `netlify deploy` preview,
then verification with a tool such as securityheaders.com).
