/**
 * testimonials.ts
 * ---------------------------------------------------------------------------
 * ⚠️ DEVELOPMENT / OWNER NOTE — READ BEFORE LAUNCH ⚠️
 *
 * The entries below are PLACEHOLDER EXAMPLES ONLY, written to demonstrate
 * the testimonials layout. They are clearly fictional and must NOT be
 * published as genuine customer reviews. Before launch, replace every
 * entry with real testimonials for which you have the customer's
 * explicit authorization to publish (ideally in writing), or remove the
 * Testimonials section entirely if none are available yet.
 *
 * A matching visible notice is rendered in the Testimonials component
 * itself for as long as `isPlaceholderData` is true below.
 * ---------------------------------------------------------------------------
 */
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
}

export const isPlaceholderData = true;

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      '[EXEMPLU DE TESTIMONIAL — text ilustrativ, nu o recenzie reală] „Dulapul a fost montat exact cum ne-am dorit, iar comunicarea a fost clară de la început.”',
    author: '[NUME CLIENT — de confirmat]',
    context: '[LOCALITATE — de confirmat]',
  },
  {
    id: 't2',
    quote:
      '[EXEMPLU DE TESTIMONIAL — text ilustrativ, nu o recenzie reală] „A ajuns punctual și a lăsat ordine perfectă după montaj.”',
    author: '[NUME CLIENT — de confirmat]',
    context: '[LOCALITATE — de confirmat]',
  },
  {
    id: 't3',
    quote:
      '[EXEMPLU DE TESTIMONIAL — text ilustrativ, nu o recenzie reală] „Recomand cu încredere pentru montajul mobilierului de dormitor.”',
    author: '[NUME CLIENT — de confirmat]',
    context: '[LOCALITATE — de confirmat]',
  },
];
