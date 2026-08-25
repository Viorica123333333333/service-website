/**
 * gallery.ts — project gallery items.
 *
 * DEVELOPMENT NOTE: `image` values point to local placeholder SVGs in
 * /public/images/gallery/. Replace each with a real, optimized photo of
 * completed work (JPG/WebP, ideally 1200×900px or similar 4:3 ratio) once
 * available. Never hotlink external or copyrighted images.
 */
export type GalleryCategory = 'Dulapuri' | 'Dormitor' | 'Depozitare' | 'Alt mobilier';

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export const galleryCategories: GalleryCategory[] = [
  'Dulapuri',
  'Dormitor',
  'Depozitare',
  'Alt mobilier',
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    category: 'Dulapuri',
    title: 'Dulap freestanding cu trei uși',
    description: 'Montaj complet, cu aliniere finală a ușilor și verificarea stabilității.',
    image: '/images/gallery/dulap-freestanding.svg',
    alt: 'Dulap freestanding cu trei uși, montat într-un dormitor luminos [IMAGINE PLASATOARE — înlocuiți cu fotografie reală]',
  },
  {
    id: 'g2',
    category: 'Dulapuri',
    title: 'Dulap cu uși glisante',
    description: 'Reglare fină a șinelor pentru o alunecare lină și silențioasă.',
    image: '/images/gallery/dulap-glisant.svg',
    alt: 'Dulap cu uși glisante montat lângă un perete [IMAGINE PLASATOARE — înlocuiți cu fotografie reală]',
  },
  {
    id: 'g3',
    category: 'Dulapuri',
    title: 'Sistem modular pe trei corpuri',
    description: 'Asamblare și unire a corpurilor modulare, cu interior organizat.',
    image: '/images/gallery/dulap-modular.svg',
    alt: 'Sistem de dulap modular pe trei corpuri [IMAGINE PLASATOARE — înlocuiți cu fotografie reală]',
  },
  {
    id: 'g4',
    category: 'Dormitor',
    title: 'Pat dublu cu somieră',
    description: 'Montaj de pat dublu, verificat pentru stabilitate și siguranță.',
    image: '/images/gallery/pat-dublu.svg',
    alt: 'Pat dublu asamblat, cu lenjerie neutră [IMAGINE PLASATOARE — înlocuiți cu fotografie reală]',
  },
  {
    id: 'g5',
    category: 'Dormitor',
    title: 'Noptiere asortate',
    description: 'Montaj rapid și îngrijit al noptierelor, potrivite cu restul mobilierului.',
    image: '/images/gallery/noptiere.svg',
    alt: 'Pereche de noptiere asamblate lângă un pat [IMAGINE PLASATOARE — înlocuiți cu fotografie reală]',
  },
  {
    id: 'g6',
    category: 'Depozitare',
    title: 'Comodă cu sertare',
    description: 'Verificarea alinierii sertarelor pentru o glisare ușoară.',
    image: '/images/gallery/comoda.svg',
    alt: 'Comodă cu mai multe sertare, montată într-o cameră [IMAGINE PLASATOARE — înlocuiți cu fotografie reală]',
  },
  {
    id: 'g7',
    category: 'Depozitare',
    title: 'Raft de bibliotecă',
    description: 'Montaj de raft înalt, cu fixare stabilă a rafturilor interioare.',
    image: '/images/gallery/raft.svg',
    alt: 'Raft de bibliotecă montat lângă un perete [IMAGINE PLASATOARE — înlocuiți cu fotografie reală]',
  },
  {
    id: 'g8',
    category: 'Alt mobilier',
    title: 'Birou pentru lucru de acasă',
    description: 'Asamblare de birou și verificarea stabilității suprafeței de lucru.',
    image: '/images/gallery/birou.svg',
    alt: 'Birou asamblat, pregătit pentru lucru [IMAGINE PLASATOARE — înlocuiți cu fotografie reală]',
  },
];
