# Montaj mobilă & dulapuri — site informativ (Republica Moldova)

Website pe o singură pagină pentru un serviciu independent de montaj mobilă, cu specializare
în dulapuri, destinat clienților din Republica Moldova. Construit cu React + TypeScript +
Vite, text integral în limba română (`ro-MD`), pregătit pentru deploy pe Netlify.

> **Stare:** proiect funcțional, complet, dar conține date de afacere PLASATOARE (nume,
> telefon, e-mail, adresă etc.) și conținut juridic model. Vezi „Ce trebuie completat înainte
> de lansare” mai jos.

## Cuprins

- [Cerințe și instalare](#cerințe-și-instalare)
- [Comenzi disponibile](#comenzi-disponibile)
- [Structura proiectului](#structura-proiectului)
- [Editarea conținutului (fără cod)](#editarea-conținutului-fără-cod)
- [Înlocuirea imaginilor](#înlocuirea-imaginilor)
- [Formularul de contact (Netlify Forms)](#formularul-de-contact-netlify-forms)
- [Testare și verificare](#testare-și-verificare)
- [Build și deploy pe Netlify](#build-și-deploy-pe-netlify)
- [Ce trebuie completat înainte de lansare](#ce-trebuie-completat-înainte-de-lansare)

## Cerințe și instalare

- Node.js 20 sau mai recent
- npm 10 sau mai recent

```bash
npm install
cp .env.example .env   # opțional pentru dezvoltare locală
npm run dev
```

Site-ul pornește implicit la `http://localhost:5173`.

## Comenzi disponibile

| Comandă                | Ce face                                                             |
| ----------------------- | -------------------------------------------------------------------- |
| `npm run dev`           | Pornește serverul de dezvoltare Vite, cu reîncărcare instantă.       |
| `npm run build`         | Verifică tipurile TypeScript și construiește build-ul de producție (`dist/`). |
| `npm run preview`       | Servește local build-ul de producție, pentru verificare finală.      |
| `npm run lint`          | Rulează ESLint (reguli React, hooks, accesibilitate JSX).            |
| `npm run lint:fix`      | La fel ca mai sus, dar corectează automat ce poate fi corectat.      |
| `npm run format`        | Formatează codul cu Prettier.                                        |
| `npm run format:check`  | Verifică formatarea fără să modifice fișierele.                      |
| `npm run typecheck`     | Verifică doar tipurile TypeScript, fără build.                       |
| `npm run test`          | Rulează testele (Vitest).                                            |
| `npm run test:watch`    | Rulează testele în mod „watch”.                                      |
| `npm run audit`         | Verifică dependențele de producție pentru vulnerabilități cunoscute. |

## Structura proiectului

```
├── index.html                  # Punct de intrare HTML, meta tags, formular static Netlify
├── netlify.toml                # Build, redirect-uri, headere de securitate/CSP
├── public/
│   ├── robots.txt, sitemap.xml, favicon.svg, _redirects, early.js
│   └── images/                 # Imagini plasatoare (hero, galerie, poveste dulapuri, portret)
├── scripts/
│   └── generate-placeholders.mjs  # Regenerează imaginile SVG plasatoare, la nevoie
├── src/
│   ├── config/                 # ⭐ Fișiere de conținut editabile (vezi mai jos)
│   ├── components/             # Componente React, fiecare cu propriul CSS Module
│   ├── pages/                  # HomePage + pagini legale + 404, folosite de React Router
│   ├── hooks/                  # Hooks reutilizabile (focus trap, scroll lock, IO, etc.)
│   ├── utils/                  # Validare, sanitizare, structured data, linkuri sigure
│   └── styles/                 # tokens.css (variabile de design) + global.css (reset, utilitare)
├── SECURITY.md
├── .env.example
└── package.json
```

## Editarea conținutului (fără cod)

Aproape tot conținutul editorial este centralizat în `src/config/`, astfel încât cineva fără
experiență de programare poate actualiza site-ul modificând text simplu în aceste fișiere:

- `business.ts` — nume, telefon, e-mail, WhatsApp, localitate, rază de deplasare, program,
  limbi vorbite, linkuri sociale, prefix telefonic, monedă, fus orar.
- `services.ts` — lista de servicii + textul de clarificare privind fixarea în perete etc.
- `process.ts` — pașii „Cum lucrăm” + cele șase beneficii.
- `faq.ts` — întrebările frecvente.
- `gallery.ts` — elementele galeriei (titlu, descriere, categorie, imagine, text alternativ).
- `testimonials.ts` — testimoniale PLASATOARE. **Nu publicați aceste texte ca recenzii
  reale.** Înlocuiți-le doar cu recenzii autentice, cu acordul explicit al clienților, apoi
  setați `isPlaceholderData = false`.
- `wardrobeStory.ts` — textele secvenței de derulare pentru secțiunea „specialist dulapuri”.
- `nav.ts` — linkurile din meniul de navigare.

Orice text marcat cu paranteze pătrate, de exemplu `[BUSINESS NAME]`, este un PLASATOR și
trebuie înlocuit cu informația reală și verificată.

## Înlocuirea imaginilor

Site-ul folosește acum două tipuri de imagini:

```
public/images/real/wardrobe-assembled.jpg   — fotografie finală, folosită în Hero (capătul animației de asamblare)
public/images/real/dulapuri.jpg             — folosită în Servicii ("Dulapuri")
public/images/real/mobilier-dormitor.jpg    — folosită în Servicii ("Mobilier pentru dormitor")
public/images/real/mobilier-modular.jpg     — folosită în Servicii ("Mobilier modular")
public/images/real/story-nivelare.jpg       — pasul „Nivelare atentă” din secțiunea „specialist dulapuri”
public/images/real/story-aliniere.jpg       — pasul „Alinierea ușilor”
public/images/real/story-interior.jpg       — pasul „Organizare interioară”
public/images/real/story-verificare.jpg     — pasul „Verificare finală”
public/images/gallery/*.svg                 — plasatoare SVG generate local, folosite în Galerie
public/images/about/portret.svg             — plasator SVG
public/og-image.svg                         — plasator SVG
```

**Important:** fotografiile din `public/images/real/` sunt imagini de referință generice
(nu sunt fotografii ale unor lucrări reale efectuate de această afacere). Înlocuiți-le cu
fotografii reale ale propriilor lucrări de îndată ce sunt disponibile, păstrând aceleași
nume de fișier (sau actualizând referința din `src/config/services.ts` /
`src/config/wardrobeStory.ts` / `src/components/Hero/WardrobeAssembly.tsx` dacă schimbați
numele sau extensia).

**Animația din Hero** (`src/components/Hero/WardrobeAssembly.tsx` +
`src/hooks/useWardrobeAssembly.ts`): panouri ilustrate zboară de-a lungul unor linii
punctate-ghid și se asamblează într-un dulap ilustrat, care apoi se estompează treptat în
fotografia reală `wardrobe-assembled.jpg` — starea finală, permanentă. Este o interpretare
ilustrată (nu fotorealistă) a mișcării de asamblare, deoarece nu există fotografii reale ale
panourilor demontate ale acestui dulap; dacă deveniți disponibile astfel de fotografii pe
straturi separate, animația poate fi refăcută pentru un rezultat fotorealist.

Pentru imaginile din Galerie și portret, care rămân SVG-uri plasatoare: salvați o fotografie
reală, optimizată (JPG sau WebP, ideal sub 300 KB), cu **exact același nume de fișier**
(schimbând doar extensia dacă e nevoie — actualizați și referința din `src/config/gallery.ts`
dacă schimbați extensia). Păstrați un raport de aspect similar celui original pentru un
layout curat.

Dacă doriți să regenerați plasatoarele SVG (de exemplu, după ce ștergeți din greșeală un
fișier), rulați:

```bash
node scripts/generate-placeholders.mjs
```

## Formularul de contact (Netlify Forms)

Site-ul folosește **Netlify Forms**, fără server sau backend propriu:

1. `index.html` conține un formular static ascuns (`name="solicitare-oferta"`), cu
   `data-netlify="true"` și `netlify-honeypot="bot-field"`. Netlify îl detectează la
   build-time și înregistrează formularul.
2. Formularul real, vizibil, este componenta React `src/components/Contact/Contact.tsx`. La
   trimitere, acesta face `fetch('/', { method: 'POST', ... })` cu datele encodate, folosind
   același `form-name`.
3. Submisiile apar în **Netlify dashboard → Site configuration → Forms**.

### Configurarea notificărilor prin e-mail (din Netlify, nu din cod)

1. În Netlify dashboard, deschideți site-ul → **Site configuration → Forms → Form
   notifications**.
2. Adăugați o notificare de tip „Email notification” către adresa de e-mail a afacerii.
3. Nu sunt necesare chei API sau credențiale SMTP în cod — Netlify gestionează integral acest
   flux.

### Dacă aveți nevoie de atașamente (fotografii) la formular

Netlify Forms nu suportă în mod fiabil încărcarea de fișiere mari direct din formular pentru
acest tip de configurare simplă. Formularul curent instruiește clientul să trimită fotografiile
separat, prin e-mail sau WhatsApp, după trimiterea formularului.

Dacă doriți totuși încărcare de fișiere prin site: opțiunea recomandată este o **funcție
Netlify (serverless)** care primește fișierul, validează tipul MIME (listă albă: imagini
JPG/PNG/WebP), limitează dimensiunea, generează un nume de fișier aleatoriu și îl trimite către
un provider de stocare/e-mail tranzacțional aprobat (de exemplu, Resend, Postmark sau un bucket
S3-compatible). Vezi `SECURITY.md` pentru cerințele de securitate ale unei astfel de funcții.
**Nu am inclus această funcție în proiect implicit**, deoarece Netlify Forms acoperă cerința
de bază fără a introduce complexitate sau costuri suplimentare; adăugați-o doar dacă aveți
nevoie reală de atașamente.

## Testare și verificare

Înainte de a considera site-ul gata de lansare, rulați local:

```bash
npm run typecheck     # Compilare TypeScript fără erori
npm run lint           # Fără erori/avertismente ESLint
npm run build           # Build de producție reușit
npm run preview         # Verificare vizuală a build-ului de producție
npm run audit            # Verificare vulnerabilități în dependențe
```

Verificări manuale recomandate (vezi și `PRE_LAUNCH_CHECKLIST.md`):

- **Navigare cu tastatura**: Tab/Shift+Tab prin tot site-ul, inclusiv meniul mobil, galeria și
  acordeonul FAQ; Escape închide meniul mobil și lightbox-ul galeriei.
- **`prefers-reduced-motion`**: activați această preferință în sistemul de operare sau în
  DevTools și verificați că animațiile (reveal la scroll, secvența de dulapuri, acordeon) sunt
  reduse sau eliminate.
- **Responsive**: verificați layout-ul pe mobil (~375px), tabletă (~768px) și desktop
  (~1280px+), inclusiv la zoom 200%.
- **Lighthouse**: rulați un audit (Chrome DevTools → Lighthouse) pentru Accesibilitate,
  Performanță, Best Practices și SEO pe build-ul de producție (`npm run preview`).
- **Linkuri**: verificați manual că linkurile din footer, header și butoanele CTA duc unde
  trebuie.
- **Formular**: testați trimiterea cu date valide și invalide, verificați mesajele de eroare,
  mesajul de succes și starea de încărcare/dezactivare a butonului în timpul trimiterii.

## Build și deploy pe Netlify

### Opțiunea A — prin interfața Netlify (recomandat pentru început)

1. Creați un repozitoriu Git (GitHub/GitLab/Bitbucket) cu acest cod.
2. În Netlify: **Add new site → Import an existing project**, selectați repozitoriul.
3. Build command: `npm run build` · Publish directory: `dist` (deja configurate în
   `netlify.toml`, Netlify le va detecta automat).
4. Deploy. Netlify va detecta automat formularul static descris mai sus.
5. Configurați notificările formularului (vezi secțiunea de mai sus).
6. Actualizați domeniul real în `index.html` (canonical, Open Graph), `public/sitemap.xml`,
   `public/robots.txt` și `src/config/business.ts` (`siteUrl`).
7. Activați HTTPS (Netlify îl gestionează automat prin Let's Encrypt) și, doar după ce
   confirmați că HTTPS funcționează corect pe domeniul final, luați în considerare activarea
   headerului HSTS (vezi comentariul din `netlify.toml` și `SECURITY.md`).

### Opțiunea B — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --build            # preview deploy
netlify deploy --build --prod     # deploy în producție
```

## Ce trebuie completat înainte de lansare

Vezi și fișierul separat `PRE_LAUNCH_CHECKLIST.md` pentru o listă completă. Pe scurt:

- **Date de afacere reale** (`src/config/business.ts`): nume, nume complet, telefon, e-mail,
  WhatsApp, localitate, zonă deservită, rază de deplasare, cost deplasare, program, limbi.
- **Imagini reale**, în locul plasatoarelor SVG din `public/images/`.
- **Testimoniale reale**, cu acordul explicit al clienților, sau eliminarea secțiunii.
- **Politici editabile** din `faq.ts` (piese lipsă, anulări) — completați variantele marcate
  „[POLITICĂ DE CONFIRMAT]”.
- **Verificare juridică** a paginilor din `src/pages/PrivacyPolicyPage.tsx`,
  `CookiePolicyPage.tsx` și `TermsPage.tsx` de către un specialist familiarizat cu legislația
  din Republica Moldova.
- **Configurare Netlify**: notificări formular, domeniu propriu, variabile de mediu (dacă se
  adaugă funcția opțională de e-mail).
