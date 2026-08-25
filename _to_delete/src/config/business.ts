/**
 * business.ts
 * ---------------------------------------------------------------------------
 * Central, single-source-of-truth configuration for business details.
 *
 * IMPORTANT: Every value wrapped in square brackets, e.g. "[BUSINESS NAME]",
 * is a PLACEHOLDER. Replace it with real, verified information before
 * launch. Do not invent certifications, insurance, review counts, or
 * completed-project numbers — leave the placeholder and a note for the
 * business owner instead.
 *
 * A non-developer can update the whole site by editing this file (and the
 * sibling files in this folder) without touching any component code.
 * ---------------------------------------------------------------------------
 */

export const business = {
  /** Trading / brand name shown in the header, footer and metadata. */
  name: '[BUSINESS NAME]',

  /** Full legal name of the professional (used in About + legal pages). */
  fullName: '[FULL NAME]',

  /** Primary phone number, Moldovan format, e.g. +373 6X XXX XXX */
  phone: '[+373 NUMĂR DE TELEFON]',
  /** Same number, digits only, for tel: links. Update alongside `phone`. */
  phoneHref: 'tel:+373XXXXXXXX',

  /** Contact e-mail address. */
  email: '[EMAIL ADDRESS]',

  /** WhatsApp number, international format without spaces, for wa.me links. */
  whatsappNumber: '+373XXXXXXXX',
  whatsappHref: 'https://wa.me/373XXXXXXXX',
  whatsappPrefillMessage:
    'Bună ziua! Aș dori o ofertă pentru montaj de mobilă. Detalii: ',

  /** Base town/area of operation. */
  baseLocation: '[LOCALITATE – de exemplu, Chișinău]',

  /** Sectors, raioane or nearby localities served. */
  servedAreas: '[ZONE DESERVITE – de exemplu, sectoarele Chișinău + localități apropiate]',

  /** Maximum travel distance from the base location, in km or description. */
  serviceRadius: '[RAZA DE DEPLASARE]',

  /** How travel cost is handled — do not claim "free" unless confirmed. */
  travelCostPolicy:
    '[GRATUIT ÎN RAZA DE BAZĂ / CALCULAT ÎN FUNCȚIE DE DISTANȚĂ — de confirmat]',

  /** Working hours, shown in footer, contact section and JSON-LD. */
  workingHours: '[PROGRAM DE LUCRU – de exemplu, Luni–Sâmbătă, 09:00–18:00]',

  /** Minimum years of hands-on experience (verified, not invented). */
  yearsExperience: 2,

  /** Languages spoken with clients. */
  languagesSpoken: '[LIMBI VORBITE – de exemplu, română, rusă]',

  /** IANA timezone used for date/time localisation across the site. */
  timezone: 'Europe/Chisinau',

  /** Locale used for Intl.DateTimeFormat / Intl.NumberFormat calls. */
  locale: 'ro-MD',

  /** ISO 4217 currency code, used only if/when real prices are shown. */
  currency: 'MDL',

  /** ISO 3166-1 alpha-2 country code, used in JSON-LD structured data. */
  countryCode: 'MD',

  /** International calling code prefix used to validate phone input. */
  phonePrefix: '+373',

  /**
   * Optional social links. Leave the array empty (or remove an entry) if a
   * profile does not exist — never fabricate a social presence.
   */
  socialLinks: [
    // { label: 'Facebook', href: '[LINK FACEBOOK]' },
    // { label: 'Instagram', href: '[LINK INSTAGRAM]' },
  ] as { label: string; href: string }[],

  /** Optional business registration / IDNO details, shown only if supplied. */
  registrationDetails: '', // e.g. 'IDNO: [NUMĂR IDNO]' — leave empty if not supplied

  /** Canonical production site URL — update once the real domain is live. */
  siteUrl: 'https://example-montaj-mobila.md',

  /** Pricing policy shown across the site unless real prices are supplied. */
  pricingPolicy: 'Solicitați o ofertă gratuită și fără obligații',
} as const;

export type Business = typeof business;
