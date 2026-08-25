/**
 * nav.ts — primary site navigation, used by the header and mobile menu.
 * `href` values starting with "#" scroll to a section on the home page.
 */
export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Servicii', href: '#servicii' },
  { label: 'Despre mine', href: '#despre' },
  { label: 'Cum lucrăm', href: '#proces' },
  { label: 'Lucrări', href: '#galerie' },
  { label: 'Întrebări frecvente', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];
