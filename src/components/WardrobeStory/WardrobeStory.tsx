import { wardrobeStorySlides, wardrobeStoryIntro } from '../../config/wardrobeStory';
import { useActiveSlideOnScroll } from '../../hooks/useActiveSlideOnScroll';
import styles from './WardrobeStory.module.css';

/**
 * Editorial sticky-scroll sequence for the "specialist wardrobe assembly"
 * story. Built with CSS `position: sticky` (no scroll-hijacking) and
 * IntersectionObserver to crossfade the active image. Degrades cleanly:
 * - Without JavaScript: `html.js` never gets added, so CSS keeps every
 *   step's image inline in normal document flow (see the `@media` rule
 *   gated on `:global(html.js)` in WardrobeStory.module.css) — the sticky
 *   panel is simply never shown, nothing breaks.
 * - With `prefers-reduced-motion: reduce`: the crossfade transition is
 *   removed; images still switch, just without animation.
 */
export default function WardrobeStory() {
  const [stepRefs, activeIndex] = useActiveSlideOnScroll<HTMLLIElement>(
    wardrobeStorySlides.length,
  );

  return (
    <section
      id="specialist-dulapuri"
      className={`section ${styles.section}`}
      aria-labelledby="specialist-heading"
    >
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Why wardrobe experience matters</p>
          <h2 id="specialist-heading" className="section-title">
            A well-assembled wardrobe starts with attention to every detail
          </h2>
          <p className={styles.intro}>{wardrobeStoryIntro}</p>
        </div>

        <div className={styles.storyLayout}>
          <ol className={styles.steps}>
            {wardrobeStorySlides.map((slide, index) => (
              <li
                key={slide.id}
                ref={stepRefs[index]}
                data-story-index={index}
                className={styles.step}
              >
                <p className={styles.stepIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className={styles.stepTitle}>{slide.title}</h3>
                <p className={styles.stepText}>{slide.text}</p>
                <div className={styles.inlineImageWrap}>
                  <img
                    className={styles.inlineImage}
                    src={slide.image}
                    alt={slide.alt}
                    width={800}
                    height={600}
                    loading="lazy"
                  />
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.stickyPanelWrap} aria-hidden="true">
            <div className={styles.stickyPanel}>
              {wardrobeStorySlides.map((slide, index) => (
                <img
                  key={slide.id}
                  className={`${styles.stickyImage} ${
                    index === activeIndex ? styles.isActive : ''
                  }`}
                  src={slide.image}
                  alt=""
                  width={800}
                  height={600}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              ))}
              <p className={styles.stickyCaption}>{wardrobeStorySlides[activeIndex]?.title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
