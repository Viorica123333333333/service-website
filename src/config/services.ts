/**
 * services.ts — service catalogue shown in the Services section.
 * `featured: true` marks wardrobe assembly as the visually prioritized service.
 */
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  featured?: boolean;
}

/**
 * The three editorial highlight categories shown at the top of the
 * Services section (square images, thin rules) — matches the approved
 * target design. The full service list below covers everything else.
 * NOTE: these are real reference photography, not photos of this
 * business's own completed jobs — swap for genuine project photos as they
 * become available (see README).
 */
export interface ServiceHighlight {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export const serviceHighlights: ServiceHighlight[] = [
  {
    id: 'dulapuri',
    title: 'Wardrobes',
    description:
      'Freestanding, with sliding or hinged doors, assembled with careful alignment and a final check.',
    image: '/images/real/dulapuri.jpg',
    alt: 'Open wood-finish wardrobe with hanging clothes and linen organised on shelves — reference image',
  },
  {
    id: 'dormitor',
    title: 'Bedroom furniture',
    description: 'Beds, bedside tables and chests of drawers, assembled with care and checked for stability.',
    image: '/images/real/mobilier-dormitor.jpg',
    alt: 'Upholstered bed with matching bedside tables on either side — reference image',
  },
  {
    id: 'modular',
    title: 'Modular furniture',
    description: 'Multi-unit systems and storage shelving, joined and aligned correctly.',
    image: '/images/real/mobilier-modular.jpg',
    alt: 'Modular bookcase with shelves, drawers and integrated TV unit — reference image',
  },
];

export const services: ServiceItem[] = [
  {
    id: 'dulapuri-freestanding',
    title: 'Freestanding wardrobe assembly',
    description:
      'Complete assembly of freestanding wardrobes, with checks for alignment, stability and smooth door operation.',
    featured: true,
  },
  {
    id: 'dulapuri-glisante',
    title: 'Sliding-door wardrobes',
    description:
      'Careful assembly of sliding-door systems, with tracks and rollers adjusted for smooth, quiet gliding.',
    featured: true,
  },
  {
    id: 'dulapuri-batante',
    title: 'Hinged-door wardrobes',
    description:
      'Precise fitting and alignment of hinges, so doors close evenly, with no rubbing or uneven gaps.',
    featured: true,
  },
  {
    id: 'dulapuri-modulare',
    title: 'Modular and multi-unit wardrobes',
    description:
      'Assembly of modular systems made up of several units, following the manufacturer’s instructions step by step.',
    featured: true,
  },
  {
    id: 'demontare-remontare',
    title: 'Wardrobe disassembly and reassembly',
    description:
      'Careful disassembly of existing wardrobes and reassembly at the same address or a new location, with care taken over every part.',
  },
  {
    id: 'interior-dulap',
    title: 'Shelves, rails and interior fittings',
    description:
      'Fitting and adjustment of shelves, hanging rails, drawers and interior accessories, for a well-organised space.',
  },
  {
    id: 'paturi-noptiere',
    title: 'Beds and bedside tables',
    description:
      'Assembly of beds of various sizes and base types, together with matching bedside tables.',
  },
  {
    id: 'comode-rafturi',
    title: 'Chests of drawers and storage shelving',
    description:
      'Assembly of chests of drawers, bookcases and storage units, with checks for stability and smooth-running drawers.',
  },
  {
    id: 'mese-birouri',
    title: 'Tables, desks and office furniture',
    description:
      'Assembly of tables, desks and office chairs, suited to the home or the workplace.',
  },
  {
    id: 'flatpack-general',
    title: 'General flat-pack furniture',
    description:
      'General assembly of flat-pack furniture from various manufacturers, following the original instructions.',
  },
];

/**
 * Safety / scope clarification shown directly under the services grid.
 * Do not remove — this protects both the business and the customer by
 * setting honest expectations about work requiring separate competence
 * or authorisation.
 */
export const scopeClarification = `Wall fixing, drilling, electrical work, plumbing, structural changes,
furniture modification and waste-removal services are only available where explicitly
offered, where the necessary competence and authorisation exist, and where they have been
agreed in advance. These points are discussed and confirmed before work begins.`;

export const brandDisclaimer = `Furniture manufacturer names may be mentioned solely to describe compatibility with
their products. This service is independent and is not affiliated with, sponsored by,
or endorsed by any furniture manufacturer.`;
