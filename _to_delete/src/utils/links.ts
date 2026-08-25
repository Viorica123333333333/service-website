/**
 * links.ts — helpers for safe outbound links and in-page navigation.
 */

/** Recognised safe schemes for outbound links rendered from configuration data. */
const SAFE_SCHEMES = ['https:', 'http:', 'tel:', 'mailto:'];

/**
 * Guards against open-redirect / unsafe-scheme issues when a link's target
 * ultimately comes from configuration data rather than a string literal in
 * JSX. Returns a safe fallback ("#") for anything that isn't an allow-listed
 * scheme or a same-site path/hash.
 */
export function safeHref(href: string): string {
  if (href.startsWith('#') || href.startsWith('/')) return href;
  try {
    const url = new URL(href);
    return SAFE_SCHEMES.includes(url.protocol) ? href : '#';
  } catch {
    return '#';
  }
}

/** Smoothly scrolls to an in-page section, respecting reduced-motion. */
export function scrollToHash(hash: string, prefersReducedMotion: boolean): void {
  const id = hash.replace('#', '');
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}
