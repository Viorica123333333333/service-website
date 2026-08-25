/**
 * gallery.ts — project gallery items.
 *
 * DEVELOPMENT NOTE: `image` values point to local placeholder SVGs in
 * /public/images/gallery/. Replace each with a real, optimized photo of
 * completed work (JPG/WebP, ideally 1200×900px or similar 4:3 ratio) once
 * available. Never hotlink external or copyrighted images.
 */
export type GalleryCategory = 'Wardrobes' | 'Bedroom' | 'Storage' | 'Other furniture';

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export const galleryCategories: GalleryCategory[] = [
  'Wardrobes',
  'Bedroom',
  'Storage',
  'Other furniture',
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    category: 'Wardrobes',
    title: 'Three-door freestanding wardrobe',
    description: 'Complete assembly, with final door alignment and a stability check.',
    image: '/images/gallery/dulap-freestanding.svg',
    alt: 'Three-door freestanding wardrobe assembled in a bright bedroom [PLACEHOLDER IMAGE — replace with a real photograph]',
  },
  {
    id: 'g2',
    category: 'Wardrobes',
    title: 'Sliding-door wardrobe',
    description: 'Fine adjustment of the tracks for smooth, quiet gliding.',
    image: '/images/gallery/dulap-glisant.svg',
    alt: 'Sliding-door wardrobe fitted against a wall [PLACEHOLDER IMAGE — replace with a real photograph]',
  },
  {
    id: 'g3',
    category: 'Wardrobes',
    title: 'Three-unit modular system',
    description: 'Assembly and joining of the modular units, with an organised interior.',
    image: '/images/gallery/dulap-modular.svg',
    alt: 'Three-unit modular wardrobe system [PLACEHOLDER IMAGE — replace with a real photograph]',
  },
  {
    id: 'g4',
    category: 'Bedroom',
    title: 'Double bed with base',
    description: 'Double bed assembly, checked for stability and safety.',
    image: '/images/gallery/pat-dublu.svg',
    alt: 'Assembled double bed with neutral bedding [PLACEHOLDER IMAGE — replace with a real photograph]',
  },
  {
    id: 'g5',
    category: 'Bedroom',
    title: 'Matching bedside tables',
    description: 'Quick, tidy assembly of bedside tables to match the rest of the furniture.',
    image: '/images/gallery/noptiere.svg',
    alt: 'Pair of bedside tables assembled next to a bed [PLACEHOLDER IMAGE — replace with a real photograph]',
  },
  {
    id: 'g6',
    category: 'Storage',
    title: 'Chest of drawers',
    description: 'Checking drawer alignment for smooth, easy sliding.',
    image: '/images/gallery/comoda.svg',
    alt: 'Chest of drawers with several drawers, assembled in a room [PLACEHOLDER IMAGE — replace with a real photograph]',
  },
  {
    id: 'g7',
    category: 'Storage',
    title: 'Bookshelf unit',
    description: 'Assembly of a tall shelving unit, with the interior shelves fixed securely.',
    image: '/images/gallery/raft.svg',
    alt: 'Bookshelf unit fitted against a wall [PLACEHOLDER IMAGE — replace with a real photograph]',
  },
  {
    id: 'g8',
    category: 'Other furniture',
    title: 'Home-office desk',
    description: 'Desk assembly with a check on the stability of the work surface.',
    image: '/images/gallery/birou.svg',
    alt: 'Assembled desk, ready for use [PLACEHOLDER IMAGE — replace with a real photograph]',
  },
];
