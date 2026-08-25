/** wardrobeStory.ts — content for the sticky scroll "specialist wardrobe" sequence. */
export interface WardrobeStorySlide {
  id: string;
  title: string;
  text: string;
  image: string;
  alt: string;
}

/**
 * NOTE: these are real reference photography (not photos of this business's
 * own completed jobs) — replace with genuine project photos as they become
 * available. See README.
 */
export const wardrobeStorySlides: WardrobeStorySlide[] = [
  {
    id: 'nivelare',
    title: 'Careful levelling',
    text: 'Every wardrobe starts with a check of the floor and wall levels, for a stable, straight base.',
    image: '/images/real/story-nivelare.jpg',
    alt: 'Laser level used to check the base alignment of a furniture unit — reference image',
  },
  {
    id: 'aliniere-usi',
    title: 'Door alignment',
    text: 'Hinges and sliding tracks are fine-tuned so doors close evenly, with no rubbing.',
    image: '/images/real/story-aliniere.jpg',
    alt: 'Adjusting a wardrobe door hinge with a screwdriver — reference image',
  },
  {
    id: 'interior',
    title: 'Interior organisation',
    text: 'Shelves, rails and interior drawers are fitted securely, for practical storage space.',
    image: '/images/real/story-interior.jpg',
    alt: 'Fitting a shelf and hanging rail inside a wardrobe — reference image',
  },
  {
    id: 'verificare-finala',
    title: 'Final check',
    text: 'At the end, we check the stability of the whole structure and that every component works correctly.',
    image: '/images/real/story-verificare.jpg',
    alt: 'Final check of an assembled wardrobe, with fully working drawers — reference image',
  },
];

export const wardrobeStoryIntro = `Wardrobes present specific challenges that other pieces of furniture do not: floors
and walls that are not perfectly straight, heavy doors that need precise alignment, and
interior systems that need to stand the test of time. That is why assembling a wardrobe
calls for careful levelling, door adjustment and final stability checks.`;
