# SECURITY.md

Security posture and decisions for this site — a public informational/marketing website for
an independent furniture-assembly service, with a contact/quote form as its only user input
surface. This document explains what is implemented, why, and what remains the site owner's
responsibility. It does not claim the site is "unhackable" or perfectly secure; no such claim
is honest for any software.

## Threat model summary

This is a low-attack-surface static site: no user accounts, no database, no server-rendered
dynamic content, and (by default) no custom backend. The realistic risks are:

1. **Spam/abuse of the contact form** (bots submitting junk or malicious payloads).
2. **Cross-site scripting (XSS)** if user-submitted text were ever rendered unsafely.
3. **Secret leakage** if credentials were ever committed or shipped to the browser.
4. **Clickjacking / MIME-sniffing / referrer leakage**, mitigated by response headers.
5. **Open redirects** via configuration-driven links.
6. **Supply-chain risk** from npm dependencies.

## What is implemented

### No hardcoded secrets

- No API keys, SMTP credentials, or private keys exist anywhere in this repository.
- `.env.example` lists variable **names** only, with no real values, and is safe to commit.
- `.gitignore` excludes `.env`, `.env.local`, and all build/output directories.
- The default contact-form flow (Netlify Forms) requires **zero** secrets in the frontend —
  Netlify stores submissions and can send email notifications entirely from its dashboard.

### Input validation

- `src/utils/validation.ts` enforces type, length, and format checks (name, email, phone,
  location, message, etc.) client-side, for user experience only.
- **This validation is not a security boundary.** Netlify's own form processing is the
  authoritative check for the default flow. If the optional serverless function (see below)
  is added, it must re-validate every field independently server-side — never trust the
  client.
- The "preferred contact method" field uses an explicit allow-list check
  (`isAllowedContactMethod` in `src/utils/sanitize.ts`) rather than accepting arbitrary
  strings.

### Output encoding / XSS

- React escapes all text interpolated via JSX expressions by default — this is the site's
  primary XSS defense, and it is never bypassed.
- `dangerouslySetInnerHTML` is **not used anywhere** in this codebase, and must not be
  introduced for any user-supplied content.
- `src/utils/sanitize.ts` provides `cleanText` (strips control characters, caps length) and
  `escapeHtml` (manual entity escaping) as defense-in-depth for the rare case text must be
  built outside of JSX. `cleanText` is applied to form values before they're submitted or
  echoed back in the success state.

### Honeypot + anti-spam

- The quote form includes a honeypot field (`bot-field`, matching Netlify's
  `netlify-honeypot` convention) that is hidden from sighted users (off-screen CSS) **and**
  from assistive technology (`aria-hidden="true"`, `tabindex="-1"`) so no real visitor can
  stumble into it. A filled honeypot is treated as a spam signal.
- **Rate limiting**: the default Netlify Forms flow relies on Netlify's own platform-level
  spam filtering (Akismet-based) and honeypot detection. If the optional serverless function
  is added instead, it must implement its own request-size limits, timeouts, and rate
  limiting (see below) since Netlify Functions do not rate-limit by default.

### Duplicate submissions

- The submit button is disabled and its label changes to "Se trimite…" while a request is in
  flight; the submit handler also short-circuits if a submission is already pending. This
  prevents accidental double-submits from a slow connection or repeated clicks/taps.

### No sensitive data in browser storage

- The contact form's values live only in React component state. **Nothing from the contact
  form is ever written to `localStorage`, `sessionStorage`, cookies, or any other persistent
  browser storage.**
- No analytics are enabled by default (see Privacy Policy / Cookie Policy notes), so no
  personal data flows into any analytics tool out of the box.

### Safe links

- All external links (WhatsApp, social links if configured) use
  `target="_blank" rel="noopener noreferrer"`.
- `src/utils/links.ts` provides `safeHref`, a guard against open-redirect / unsafe-scheme
  issues for any link whose target comes from configuration data rather than a literal in
  JSX — it allow-lists `https:`, `http:`, `tel:`, `mailto:`, plus same-site paths/hashes, and
  falls back to `#` for anything else.

### No unsafe execution

- No use of `eval`, `new Function(...)`, or equivalent dynamic code execution anywhere in the
  codebase.
- No third-party scripts are loaded except Google Fonts stylesheets/font files, which serve
  static font assets and do not execute arbitrary code in this page's context.

### Security headers & CSP (`netlify.toml`)

Applied to every response:

- `X-Content-Type-Options: nosniff` — stops browsers from MIME-sniffing responses into an
  executable type.
- `Referrer-Policy: strict-origin-when-cross-origin` — limits how much of the URL is leaked
  to other origins on outbound navigation/requests.
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(),
  interest-cohort=()` — a restrictive default, since none of these browser features are used
  anywhere on the site.
- `Content-Security-Policy` — frame protection is handled via `frame-ancestors 'none'`
  (the modern replacement for `X-Frame-Options`, which is intentionally **not** set alongside
  it to avoid redundant/obsolete headers). The policy is scoped to what the site actually
  loads:
  - `script-src 'self'` — only same-origin scripts execute. The one tiny inline-looking
    script (the progressive-enhancement `html.js` flag) is deliberately shipped as an
    external same-origin file (`/early.js`) specifically so `'unsafe-inline'` is never
    needed for scripts.
  - `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` — `'unsafe-inline'` is
    required here because a small number of components set inline `style` attributes (e.g.
    animation delay values); this is a common, low-risk tradeoff for React apps. If you
    remove all inline `style` usage, you can tighten this further.
  - `font-src 'self' https://fonts.gstatic.com`, `img-src 'self' data:`,
    `connect-src 'self'`, `form-action 'self'`, `base-uri 'self'`, `object-src 'none'`.
- **HSTS is deliberately commented out** in `netlify.toml`. Enable
  `Strict-Transport-Security` only once you've confirmed HTTPS is correctly serving the final
  production domain (and every subdomain the `includeSubDomains` directive would cover) —
  browsers cache HSTS aggressively, and a premature or misconfigured HSTS header can lock
  visitors out of a domain or subdomain that isn't actually HTTPS-ready yet.
- No obsolete headers (`X-XSS-Protection`, `X-Frame-Options` alongside `frame-ancestors`,
  etc.) are set.

### HTTPS

- Enforced by Netlify automatically (Let's Encrypt-issued certificates, automatic HTTP→HTTPS
  redirect) once the site is deployed and a custom domain is attached. No action needed in
  application code.

### Dependency hygiene

- Run `npm audit --omit=dev` (wired up as `npm run audit`) before each deploy and
  periodically thereafter.
- Keep dependencies current with `npm outdated` and scheduled updates — this is a small,
  low-dependency project by design (React, React Router, Vite, and their build tooling only)
  specifically to minimize supply-chain surface area.
- Review the changelog of any dependency bump that touches `react`, `react-dom`, or
  `react-router-dom` before merging, since these are on the critical path for every page.

### Logging & error handling

- The frontend never displays raw error objects, stack traces, or internal state to users —
  form failures show one generic, friendly message
  ("A apărut o problemă la trimiterea formularului…") alongside a phone/email fallback.
- Since there is no custom backend by default, there are no server logs to manage. If you add
  the optional Netlify Function, log only what's needed to diagnose failures (never full
  submitted form content, and never in a way that ends up in a public location), and return
  generic error messages to the client while keeping detail server-side (Netlify Function
  logs, accessible only to the site's Netlify team).

## If you add the optional Netlify Function (file uploads / custom transactional email)

The default setup (Netlify Forms) requires no custom backend. If you outgrow it — most
commonly, to support real file/photo attachments — and add a Netlify Function, apply all of
the following:

- **Server-side validation is authoritative.** Re-check every field's type, length, and
  format independently of the client; never trust `Content-Type` or file extensions alone.
- **File upload restrictions**: enforce a strict MIME allow-list (e.g. `image/jpeg`,
  `image/png`, `image/webp` only), a maximum file size (e.g. 5–10 MB), reject any executable
  or script-like format, generate a randomized filename server-side (never trust the
  client-supplied name), and store uploads outside the deployed site source (e.g. an object
  storage bucket, not the Git repo or the Netlify Functions bundle).
- **CORS**: restrict `Access-Control-Allow-Origin` to the exact production domain — never
  `*` — and only allow the HTTP methods actually needed (typically just `POST`).
- **CSRF/origin protection**: verify the request `Origin`/`Referer` header matches the
  production domain before processing.
- **Abuse prevention**: add request-size limits, a timeout, and rate limiting (Netlify
  Functions have no built-in per-IP rate limiting — implement this in the function itself,
  e.g. via a small counter in a KV store, or by putting a provider that offers this in
  front of the function).
- **Secrets**: store the email/storage provider's API key only as a Netlify environment
  variable (Site configuration → Environment variables), never in code, never logged, never
  returned in any response body.
- **Honest success/failure reporting**: only report a message as "sent" once the provider's
  API confirms success; surface generic errors to the user and log detail server-side only.
- Document the specific provider and its own security/compliance posture (data residency,
  retention) before relying on it for personal data from Moldovan residents.

## What this document does not cover

- This is not a penetration test or formal security audit. For a business handling real
  customer data, consider an independent review before/after launch.
- Legal/regulatory compliance (data protection law applicable in the Republic of Moldova,
  consumer protection, e-commerce rules) is a legal question, not a purely technical one —
  see the disclaimers in the Privacy Policy, Cookie Policy, and Terms pages, and have them
  reviewed by a qualified professional before launch.
