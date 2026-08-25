# Listă de verificare înainte de lansare

Organizată pe categorii, astfel încât să fie clar cine trebuie să acționeze pentru fiecare
punct.

## ✅ Complet implementat (nu necesită acțiune)

- [x] Structură completă React + TypeScript + Vite, cu componente reutilizabile.
- [x] Design responsive, mobile-first, cu sistemul de culori și tipografia specificate.
- [x] Header sticky, meniu mobil accesibil (focus trap, Escape, scroll lock, ARIA corect).
- [x] Secvență de derulare cu efect sticky/crossfade pentru secțiunea „specialist dulapuri”,
      cu fallback funcțional fără JavaScript și respectarea `prefers-reduced-motion`.
- [x] Galerie cu filtre pe categorii și lightbox accesibil (tastatură, focus trap, etichete).
- [x] Acordeon FAQ accesibil (ARIA `aria-expanded`/`aria-controls`).
- [x] Formular de contact complet, cu validare client-side, stări de încărcare/succes/eroare,
      prevenirea trimiterilor duble, câmp honeypot, integrare Netlify Forms.
- [x] Pagini legale model (confidențialitate, cookie-uri, termeni) + pagină 404 accesibilă.
- [x] Meta tags SEO, Open Graph, JSON-LD `HomeAndConstructionBusiness`, `robots.txt`,
      `sitemap.xml`.
- [x] Headere de securitate + CSP în `netlify.toml`, `.gitignore`, `.env.example` fără
      secrete reale.
- [x] Skip link, focus vizibil, `lang="ro-MD"`, structură semantică de landmark-uri.

## 🟡 Necesită informațiile dumneavoastră reale de afacere

Toate în `src/config/business.ts`, în afară de unde este indicat altfel:

- [ ] Numele afacerii (`name`) și numele complet al profesionistului (`fullName`).
- [ ] Numărul de telefon (`phone`, `phoneHref`) — format Republica Moldova, `+373`.
- [ ] Adresa de e-mail (`email`).
- [ ] Numărul de WhatsApp (`whatsappNumber`, `whatsappHref`).
- [ ] Localitatea de bază (`baseLocation`), zonele deservite (`servedAreas`), raza de
      deplasare (`serviceRadius`) și politica privind costul deplasării
      (`travelCostPolicy`).
- [ ] Programul de lucru (`workingHours`).
- [ ] Limbile vorbite (`languagesSpoken`).
- [ ] Linkuri sociale reale, dacă există (`socialLinks`) — lăsați lista goală dacă nu există.
- [ ] Detalii de înregistrare a afacerii, dacă doriți să le afișați (`registrationDetails`).
- [ ] Domeniul real de producție (`siteUrl`), sincronizat și în `index.html`
      (`canonical`, `og:url`), `public/sitemap.xml` și `public/robots.txt`.
- [ ] Fotografii reale în locul plasatoarelor SVG din `public/images/` (vezi README —
      „Înlocuirea imaginilor”).
- [ ] Testimoniale reale, cu acordul explicit al clienților, în `src/config/testimonials.ts`
      (setați `isPlaceholderData = false` după înlocuire), sau eliminați secțiunea din
      `src/pages/HomePage.tsx` dacă nu aveți testimoniale disponibile.
- [ ] Politicile marcate „[POLITICĂ DE CONFIRMAT]” din `src/config/faq.ts` (piese
      lipsă/deteriorate, anulări/reprogramări) și din `src/pages/TermsPage.tsx`.
- [ ] Timpul estimat de răspuns afișat în secțiunea de contact
      (`src/components/Contact/Contact.tsx`, textul „Timp estimat de răspuns”).

## 🟠 Necesită configurare din panoul Netlify

- [ ] Conectarea repozitoriului Git și confirmarea că build-ul (`npm run build`, publish
      `dist`) rulează cu succes pe Netlify.
- [ ] Activarea notificărilor prin e-mail pentru formularul „solicitare-oferta”
      (Site configuration → Forms → Form notifications).
- [ ] Configurarea domeniului propriu și confirmarea activării automate HTTPS.
- [ ] Abia după confirmarea HTTPS pe domeniul final: decizia dacă activați headerul HSTS
      (dezactivat implicit în `netlify.toml`, cu explicație în `SECURITY.md`).
- [ ] Dacă adăugați funcția opțională Netlify pentru atașamente/e-mail: setarea variabilelor
      de mediu în Site configuration → Environment variables (niciodată în cod).

## 🔴 Necesită verificare juridică (specific Republicii Moldova)

- [ ] Revizuirea completă a `src/pages/PrivacyPolicyPage.tsx` de către un specialist
      familiarizat cu legislația din Republica Moldova privind protecția datelor cu caracter
      personal — în special temeiul juridic al prelucrării (secțiunea 3) și perioada de
      păstrare (secțiunea 6), ambele marcate „[DE CONFIRMAT]”.
- [ ] Confirmarea furnizorilor efectivi folosiți (hosting, eventual provider de e-mail) și
      completarea secțiunii despre transferuri internaționale de date, dacă este cazul.
- [ ] Revizuirea `src/pages/TermsPage.tsx` din perspectiva legislației privind comerțul
      electronic și drepturile consumatorilor din Republica Moldova.
- [ ] Confirmarea faptului că site-ul, în configurația actuală (fără cookie-uri neesențiale,
      fără analytics), nu necesită banner de consimțământ pentru cookie-uri — și adăugarea
      unui astfel de banner dacă, ulterior, se activează analytics sau alte tehnologii de
      urmărire (vezi `src/pages/CookiePolicyPage.tsx`).

## Verificări tehnice, de rulat local înainte de fiecare lansare

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
npm run audit
```

Plus verificările manuale descrise în README.md (`Testare și verificare`): navigare cu
tastatura, `prefers-reduced-motion`, layout responsive la 375px/768px/1280px+ și la zoom
200%, audit Lighthouse (accesibilitate, performanță, best practices, SEO), linkuri, fluxul
formularului de succes/eroare, și headerele/redirect-urile Netlify (`netlify deploy` de tip
preview, apoi verificare cu instrumente precum securityheaders.com).
