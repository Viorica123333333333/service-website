/** faq.ts — accessible accordion content. */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: 'ce-mobilier',
    question: 'What types of furniture can you assemble?',
    answer:
      'We assemble wardrobes, beds, bedside tables, chests of drawers, shelving, tables, desks and other flat-pack furniture. If you are not sure whether we can help with a particular type of furniture, send us the details and we will get back to you.',
  },
  {
    id: 'specializare-dulapuri',
    question: 'Do you specialise in wardrobe assembly?',
    answer:
      'Yes, wardrobe assembly is our main focus — from freestanding models to sliding or hinged doors and multi-unit modular systems.',
  },
  {
    id: 'detalii-oferta',
    question: 'What details do you need for a quote?',
    answer:
      'It helps to know the type of furniture, the manufacturer or model (if you know it), the number of pieces and your location. Photos of the furniture or its packaging are welcome.',
  },
  {
    id: 'deplasare-locatie',
    question: 'Can you travel to my location?',
    answer:
      'We are available to travel within [LOCATION – e.g. Chișinău] and to other localities across Moldova. Availability and any travel cost are confirmed before booking.',
  },
  {
    id: 'pregatire-camera',
    question: 'How should I prepare the room?',
    answer:
      'It helps to clear the space where the furniture will go and to ensure free access to the room. Any specific requirements can be agreed together before the visit.',
  },
  {
    id: 'fixare-perete',
    question: 'Is wall fixing included?',
    answer:
      'Wall fixing, drilling and other related work are only available where explicitly offered, where the necessary competence and authorisation exist, and where they have been agreed in advance. We discuss this before starting the work.',
  },
  {
    id: 'piese-lipsa',
    question: 'What happens if parts are missing or damaged?',
    answer:
      'If we notice missing or damaged parts during assembly, we let you know straight away. [POLICY TO BE CONFIRMED – e.g. we recommend contacting the manufacturer or shop for replacement parts].',
  },
  {
    id: 'ambalaj',
    question: 'Do you remove the packaging after assembly?',
    answer:
      'Yes, if agreed in advance, we remove and tidy away the packaging left after assembly. Please mention this preference when requesting your quote.',
  },
  {
    id: 'durata',
    question: 'How long does assembly take?',
    answer:
      'It depends on the type and complexity of the furniture — a simple wardrobe can take a few hours, while larger modular systems may need more time. We give you an estimate when confirming the quote.',
  },
  {
    id: 'programari-anulari',
    question: 'How are bookings and cancellations handled?',
    answer:
      '[POLICY TO BE CONFIRMED – e.g. please let us know at least 24 hours in advance if you wish to reschedule or cancel a visit]. Exact details are agreed when the booking is confirmed.',
  },
];
