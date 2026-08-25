/**
 * nav.ts — primary site navigation, used by the header and mobile menu.
 * `href` values starting with "#" scroll to a section on the home page.
 */
export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Services', href: '#servicii' },
  { label: 'About me', href: '#despre' },
  { label: 'How we work', href: '#proces' },
  { label: 'Our work', href: '#galerie' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];
