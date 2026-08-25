/**
 * sanitize.ts
 * ---------------------------------------------------------------------------
 * Small helpers for safely handling user-submitted text before it is ever
 * echoed back in the UI (e.g. "Thank you, {name}" on the success screen).
 *
 * React escapes all text content by default when rendered via JSX
 * expressions (`{value}`), which is the primary defense against XSS on
 * this site — the codebase never uses `dangerouslySetInnerHTML` with
 * user-supplied content. These helpers add a belt-and-braces layer: they
 * strip control characters and cap length before values are stored in
 * state or displayed, and provide an explicit HTML-escape utility for the
 * rare case content must be built outside of JSX.
 * ---------------------------------------------------------------------------
 */

/**
 * Removes non-printable/control characters (keeping tab, newline, and
 * carriage return, which are legitimate in a free-text message) and trims
 * surrounding whitespace.
 */
export function cleanText(value: string, maxLength = 2000): string {
  let result = '';
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    const isAllowedWhitespace = char === '\t' || char === '\n' || char === '\r';
    const isControl = (code <= 0x1f && !isAllowedWhitespace) || code === 0x7f;
    if (!isControl) result += char;
  }
  return result.trim().slice(0, maxLength);
}

const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escapes HTML-significant characters. Use only when text must be placed
 * outside of a normal JSX expression (JSX already escapes automatically).
 * Never used with `dangerouslySetInnerHTML` in this codebase.
 */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char] ?? char);
}

/** Strict allow-list check for the "preferred contact method" field. */
export function isAllowedContactMethod(
  value: string,
): value is 'telefon' | 'email' | 'whatsapp' {
  return value === 'telefon' || value === 'email' || value === 'whatsapp';
}
