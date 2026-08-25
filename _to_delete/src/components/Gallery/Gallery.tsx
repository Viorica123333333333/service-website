import { useRef, useState } from 'react';
import {
  galleryCategories,
  galleryItems,
  type GalleryCategory,
} from '../../config/gallery';
import Lightbox from './Lightbox';
import styles from './Gallery.module.css';

type FilterValue = GalleryCategory | 'Toate';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('Toate');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const filteredItems =
    activeFilter === 'Toate'
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
          <p className="eyebrow">Galerie de proiecte</p>
          <h2 id="galerie-heading" className="section-title">
            Exemple de lucrări montate
          </h2>
          <p className="section-lede">
            Imaginile de mai jos sunt exemple ilustrative. Odată ce fotografiile reale ale
            proiectelor sunt disponibile, ele vor înlocui aceste imagini plasatoare.
          </p>
        </div>

        <div className={styles.filters} role="group" aria-label="Filtrare galerie după categorie">
          <button
            type="button"
            className={`${styles.filterBtn} ${activeFilter === 'Toate' ? styles.filterBtnActive : ''}`}
            aria-pressed={activeFilter === 'Toate'}
            onClick={() => setActiveFilter('Toate')}
          >
            Toate
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
          <p className={styles.emptyState}>Nu există momentan imagini în această categorie.</p>
        ) : (
          <ul className={styles.grid}>
            {filteredItems.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={styles.tile}
                  onClick={(event) => openLightbox(index, event.currentTarget)}
                  aria-label={`Vedeți imaginea mărită: ${item.title}`}
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
