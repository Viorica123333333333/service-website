import { useEffect } from 'react';
import { business } from '../../config/business';

interface PageMetaProps {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/" or "/politica-de-confidentialitate". */
  path: string;
  /** Optional JSON-LD structured data object, injected as a script tag. */
  jsonLd?: Record<string, unknown>;
  /** Set to prevent indexing (used by the 404 page). */
  noindex?: boolean;
}

const JSON_LD_SCRIPT_ID = 'page-json-ld';

/**
 * Lightweight, dependency-free per-page <head> manager. Sets document
 * title, meta description, canonical link, and (optionally) a single
 * JSON-LD script — enough for this single-page site without pulling in a
 * full head-management library.
 */
export default function PageMeta({ title, description, path, jsonLd, noindex }: PageMetaProps) {
  useEffect(() => {
    document.title = title;

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', `${business.siteUrl}${path}`);
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${business.siteUrl}${path}`;

    const previousScript = document.getElementById(JSON_LD_SCRIPT_ID);
    previousScript?.remove();

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = JSON_LD_SCRIPT_ID;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(JSON_LD_SCRIPT_ID)?.remove();
    };
  }, [title, description, path, jsonLd, noindex]);

  return null;
}

function setMetaTag(attribute: 'name' | 'property', value: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${value}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  tag.content = content;
}
