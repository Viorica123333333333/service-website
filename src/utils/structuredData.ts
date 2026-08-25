import { business } from '../config/business';

/**
 * Builds a HomeAndConstructionBusiness JSON-LD object using only the
 * truthful, configured business data above — no fabricated ratings,
 * review counts, or certifications. Placeholder values (business name,
 * phone, etc.) will naturally flow through into the structured data
 * until the owner fills in real details in src/config/business.ts.
 */
export function buildLocalBusinessJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: business.name,
    description:
      'Independent furniture assembly services, specialising in wardrobes, in Chișinău and other localities across Moldova.',
    url: business.siteUrl,
    telephone: business.phone,
    email: business.email,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: business.servedAreas,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.baseLocation,
      addressCountry: business.countryCode,
    },
    priceRange: business.pricingPolicy,
    knowsLanguage: business.languagesSpoken,
  };
}
