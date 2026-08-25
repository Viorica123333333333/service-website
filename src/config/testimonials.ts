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
      '[EXAMPLE TESTIMONIAL — illustrative text, not a genuine review] The wardrobe was assembled exactly as we wanted, and communication was clear from the start.',
    author: '[CUSTOMER NAME — to be confirmed]',
    context: '[LOCATION — to be confirmed]',
  },
  {
    id: 't2',
    quote:
      '[EXAMPLE TESTIMONIAL — illustrative text, not a genuine review] Arrived on time and left everything perfectly tidy after assembly.',
    author: '[CUSTOMER NAME — to be confirmed]',
    context: '[LOCATION — to be confirmed]',
  },
  {
    id: 't3',
    quote:
      '[EXAMPLE TESTIMONIAL — illustrative text, not a genuine review] I recommend them with confidence for bedroom furniture assembly.',
    author: '[CUSTOMER NAME — to be confirmed]',
    context: '[LOCATION — to be confirmed]',
  },
];
