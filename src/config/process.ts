/** process.ts — the "How it works" 5-step sequence. */
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Send your furniture details',
    description:
      'Tell us what furniture needs assembling — ideally with photos, the model name and your location.',
  },
  {
    step: 2,
    title: 'Receive confirmation and a quote',
    description:
      'We agree the scope of the work together and send you a free, no-obligation quote.',
  },
  {
    step: 3,
    title: 'Choose a suitable date',
    description:
      'We arrange a date and arrival window that fits your schedule.',
  },
  {
    step: 4,
    title: 'Your furniture is assembled and checked',
    description:
      'We assemble the furniture following the manufacturer’s instructions, with a final check for alignment and stability.',
  },
  {
    step: 5,
    title: 'We review the result together',
    description:
      'We go through the finished work together before wrapping up the visit.',
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
    title: 'Wardrobe experience',
    description: 'Particular attention to wardrobe assembly, from the simplest builds to modular systems.',
  },
  {
    id: 'montaj-atent',
    title: 'Careful assembly',
    description: 'We work with care for your furniture and your home, step by step.',
  },
  {
    id: 'comunicare-clara',
    title: 'Clear communication',
    description: 'We confirm the scope of the work and the details before starting, with no surprises.',
  },
  {
    id: 'deplasare-flexibila',
    title: 'Flexible travel',
    description: 'We can come to your address, within the agreed service area.',
  },
  {
    id: 'respect-ordine',
    title: 'Respect and tidiness',
    description: 'We leave the work area clean and tidy once assembly is complete.',
  },
  {
    id: 'verificare-finala',
    title: 'Final check',
    description: 'We check the alignment, stability and operation of doors and drawers at the end.',
  },
];
