/** process.ts — the "How it works" 5-step sequence. */
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Trimiteți detaliile mobilei',
    description:
      'Ne scrieți ce mobilier aveți de montat — ideal cu fotografii, denumirea modelului și localitatea dumneavoastră.',
  },
  {
    step: 2,
    title: 'Primiți confirmarea și oferta',
    description:
      'Stabilim împreună scopul lucrării și vă transmitem o ofertă gratuită, fără obligații.',
  },
  {
    step: 3,
    title: 'Alegem data potrivită',
    description:
      'Convenim o dată și un interval orar de sosire, adaptate programului dumneavoastră.',
  },
  {
    step: 4,
    title: 'Mobila este montată și verificată',
    description:
      'Asamblăm mobilierul conform instrucțiunilor producătorului, cu verificarea finală a alinierii și stabilității.',
  },
  {
    step: 5,
    title: 'Verificăm împreună rezultatul',
    description:
      'Trecem împreună în revistă lucrarea finalizată, înainte de a încheia vizita.',
  },
];

/** Six credible, concise benefits for the "Why choose this service" section. */
export interface Benefit {
  id: string;
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    id: 'experienta-dulapuri',
    title: 'Experiență cu dulapuri',
    description: 'Atenție deosebită pentru montajul dulapurilor, de la cele mai simple la sisteme modulare.',
  },
  {
    id: 'montaj-atent',
    title: 'Montaj atent',
    description: 'Lucrăm cu grijă pentru mobilier și pentru locuința dumneavoastră, pas cu pas.',
  },
  {
    id: 'comunicare-clara',
    title: 'Comunicare clară',
    description: 'Confirmăm scopul lucrării și detaliile înainte de a începe, fără surprize.',
  },
  {
    id: 'deplasare-flexibila',
    title: 'Deplasare flexibilă',
    description: 'Ne putem deplasa la adresa dumneavoastră, în limita zonei convenite.',
  },
  {
    id: 'respect-ordine',
    title: 'Respect și ordine',
    description: 'Lăsăm spațiul de lucru curat și organizat după finalizarea montajului.',
  },
  {
    id: 'verificare-finala',
    title: 'Verificare finală',
    description: 'Controlăm alinierea, stabilitatea și funcționarea ușilor și sertarelor la final.',
  },
];
