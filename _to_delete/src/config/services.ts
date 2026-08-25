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
    title: 'Dulapuri',
    description:
      'Freestanding, cu uși glisante sau batante, montate cu aliniere și verificare finală.',
    image: '/images/real/dulapuri.jpg',
    alt: 'Dulap din lemn deschis, cu haine agățate și lenjerie organizată pe rafturi — imagine de referință',
  },
  {
    id: 'dormitor',
    title: 'Mobilier pentru dormitor',
    description: 'Paturi, noptiere și comode, asamblate atent și verificate pentru stabilitate.',
    image: '/images/real/mobilier-dormitor.jpg',
    alt: 'Pat tapițat cu noptiere asortate pe ambele părți — imagine de referință',
  },
  {
    id: 'modular',
    title: 'Mobilier modular',
    description: 'Sisteme pe mai multe corpuri și rafturi de depozitare, unite și aliniate corect.',
    image: '/images/real/mobilier-modular.jpg',
    alt: 'Bibliotecă modulară cu rafturi, sertare și televizor integrat — imagine de referință',
  },
];

export const services: ServiceItem[] = [
  {
    id: 'dulapuri-freestanding',
    title: 'Montaj dulapuri freestanding',
    description:
      'Asamblare completă a dulapurilor independente, cu verificarea alinierii, a stabilității și a bunei funcționări a ușilor.',
    featured: true,
  },
  {
    id: 'dulapuri-glisante',
    title: 'Dulapuri cu uși glisante',
    description:
      'Montaj atent al sistemelor cu uși glisante, cu reglarea șinelor și a rolelor pentru o alunecare lină și silențioasă.',
    featured: true,
  },
  {
    id: 'dulapuri-batante',
    title: 'Dulapuri cu uși batante',
    description:
      'Fixare și aliniere precisă a balamalelor, astfel încât ușile să se închidă uniform, fără frecări sau spații inegale.',
    featured: true,
  },
  {
    id: 'dulapuri-modulare',
    title: 'Dulapuri modulare și pe corpuri',
    description:
      'Asamblare de sisteme modulare din mai multe corpuri, cu respectarea instrucțiunilor producătorului pas cu pas.',
    featured: true,
  },
  {
    id: 'demontare-remontare',
    title: 'Demontare și remontare dulapuri',
    description:
      'Demontare atentă a dulapurilor existente și remontare la aceeași adresă sau la o locație nouă, cu grijă pentru piese.',
  },
  {
    id: 'interior-dulap',
    title: 'Rafturi, bare și accesorii interioare',
    description:
      'Montaj și reglare a rafturilor, barelor pentru haine, sertarelor și accesoriilor interioare, pentru un spațiu bine organizat.',
  },
  {
    id: 'paturi-noptiere',
    title: 'Paturi și noptiere',
    description:
      'Asamblare de paturi de diverse dimensiuni și tipuri de somieră, împreună cu noptierele asortate.',
  },
  {
    id: 'comode-rafturi',
    title: 'Comode și rafturi de depozitare',
    description:
      'Montaj de comode, biblioteci și unități de depozitare, cu verificarea stabilității și a funcționării sertarelor.',
  },
  {
    id: 'mese-birouri',
    title: 'Mese, birouri și mobilier de birou',
    description:
      'Asamblare de mese, birouri și scaune de birou, potrivite pentru acasă sau pentru spații de lucru.',
  },
  {
    id: 'flatpack-general',
    title: 'Mobilier flatpack, general',
    description:
      'Montaj general de mobilier tip flatpack de la diverși producători, conform instrucțiunilor originale.',
  },
];

/**
 * Safety / scope clarification shown directly under the services grid.
 * Do not remove — this protects both the business and the customer by
 * setting honest expectations about work requiring separate competence
 * or authorisation.
 */
export const scopeClarification = `Fixarea în perete, găurirea, lucrările electrice, instalațiile sanitare,
modificările structurale, modificarea mobilierului și serviciile de eliminare a deșeurilor
sunt disponibile doar dacă au fost oferite explicit, dacă există competența și autorizarea
necesară și dacă au fost convenite în prealabil. Aceste aspecte se discută și se confirmă
înainte de începerea lucrării.`;

export const brandDisclaimer = `Denumirile unor producători de mobilier pot fi menționate exclusiv pentru a descrie
compatibilitatea cu produsele respective. Acest serviciu este independent și nu este
afiliat, sponsorizat sau aprobat de niciun producător de mobilier.`;
