/** faq.ts — accessible accordion content. */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: 'ce-mobilier',
    question: 'Ce tipuri de mobilier puteți monta?',
    answer:
      'Montăm dulapuri, paturi, noptiere, comode, rafturi, mese, birouri și alte tipuri de mobilier flatpack. Dacă nu sunteți sigur dacă vă putem ajuta cu un anumit tip de mobilier, scrieți-ne detalii și vă răspundem.',
  },
  {
    id: 'specializare-dulapuri',
    question: 'Sunteți specializat pe montajul dulapurilor?',
    answer:
      'Da, montajul dulapurilor este domeniul nostru principal — de la modele freestanding, la uși glisante sau batante și sisteme modulare pe mai multe corpuri.',
  },
  {
    id: 'detalii-oferta',
    question: 'Ce detalii vă trebuie pentru o ofertă?',
    answer:
      'Ne ajută să știm tipul de mobilier, producătorul sau modelul (dacă îl cunoașteți), numărul de piese și localitatea dumneavoastră. Fotografiile mobilei sau ale ambalajului sunt binevenite.',
  },
  {
    id: 'deplasare-locatie',
    question: 'Vă puteți deplasa la locația mea?',
    answer:
      'Suntem disponibili pentru deplasări în [LOCALITATE – de exemplu, Chișinău] și în alte localități din Republica Moldova. Disponibilitatea și eventualul cost al deplasării se confirmă înainte de programare.',
  },
  {
    id: 'pregatire-camera',
    question: 'Cum ar trebui să pregătesc încăperea?',
    answer:
      'Este util să eliberați spațiul unde va fi amplasată mobila și să asigurați acces liber până la încăpere. Orice cerință specifică o putem stabili împreună înainte de vizită.',
  },
  {
    id: 'fixare-perete',
    question: 'Fixarea în perete este inclusă?',
    answer:
      'Fixarea în perete, găurirea și alte lucrări conexe sunt disponibile doar dacă sunt oferite explicit, dacă există competența și autorizarea necesară și dacă au fost convenite în prealabil. Discutăm acest aspect înainte de începerea lucrării.',
  },
  {
    id: 'piese-lipsa',
    question: 'Ce se întâmplă dacă lipsesc piese sau sunt deteriorate?',
    answer:
      'Dacă observăm piese lipsă sau deteriorate în timpul montajului, vă informăm imediat. [POLITICĂ DE CONFIRMAT – de exemplu, recomandăm contactarea producătorului sau a magazinului pentru piese de schimb].',
  },
  {
    id: 'ambalaj',
    question: 'Îndepărtați ambalajul după montaj?',
    answer:
      'Da, dacă este convenit în prealabil, îndepărtăm și organizăm ambalajul rămas după montaj. Menționați această preferință atunci când solicitați oferta.',
  },
  {
    id: 'durata',
    question: 'Cât durează montajul?',
    answer:
      'Durata depinde de tipul și complexitatea mobilierului — un dulap simplu poate dura câteva ore, iar sisteme modulare mai mari pot necesita mai mult timp. Vă oferim o estimare atunci când confirmăm oferta.',
  },
  {
    id: 'programari-anulari',
    question: 'Cum se gestionează programările și anulările?',
    answer:
      '[POLITICĂ DE CONFIRMAT – de exemplu, vă rugăm să anunțați cu cel puțin 24 de ore înainte dacă doriți să reprogramați sau să anulați o vizită]. Detaliile exacte se stabilesc la confirmarea programării.',
  },
];
