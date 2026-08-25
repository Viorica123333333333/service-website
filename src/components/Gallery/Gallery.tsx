import { useRef, useState } from 'react';
import {
  galleryCategories,
  galleryItems,
  type GalleryCategory,
} from '../../config/gallery';
import Lightbox from './Lightbox';
import styles from './Gallery.module.css';

type FilterValue = GalleryCategory | 'All';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('All');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const filteredItems =
    activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const openLightbox = (index: number, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setActiveItemIndex(index);
  };

  const closeLightbox = () => setActiveItemIndex(null);

  const showRelative = (direction: 1 | -1) => {
    setActiveItemIndex((current) => {
      if (current === null || filteredItems.length === 0) return current;
      const next = (current + direction + filteredItems.length) % filteredItems.length;
      return next;
    });
  };

  const activeItem = activeItemIndex !== null ? filteredItems[activeItemIndex] : undefined;

  return (
    <section id="galerie" className="section" aria-labelledby="galerie-heading">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Project gallery</p>
          <h2 id="galerie-heading" className="section-title">
            Examples of completed assembly work
          </h2>
          <p className="section-lede">
            The images below are illustrative examples. Once real photographs of
            completed projects are available, they will replace these placeholder images.
          </p>
        </div>

        <div className={styles.filters} role="group" aria-label="Filter gallery by category">
          <button
            type="button"
            className={`${styles.filterBtn} ${activeFilter === 'All' ? styles.filterBtnActive : ''}`}
            aria-pressed={activeFilter === 'All'}
            onClick={() => setActiveFilter('All')}
          >
            All
          </button>
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`${styles.filterBtn} ${activeFilter === category ? styles.filterBtnActive : ''}`}
              aria-pressed={activeFilter === category}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <p className={styles.emptyState}>There are no images in this category at the moment.</p>
        ) : (
          <ul className={styles.grid}>
            {filteredItems.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={styles.tile}
                  onClick={(event) => openLightbox(index, event.currentTarget)}
                  aria-label={`View enlarged image: ${item.title}`}
                >
                  <img
                    className={styles.tileImage}
                    src={item.image}
                    alt={item.alt}
                    width={480}
                    height={360}
                    loading="lazy"
                  />
                  <span className={styles.tileCaption}>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {activeItem && (
        <Lightbox
          item={activeItem}
          onClose={closeLightbox}
          onPrev={() => showRelative(-1)}
          onNext={() => showRelative(1)}
          triggerRef={{ current: lastTriggerRef.current }}
        />
      )}
    </section>
  );
}
