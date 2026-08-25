import { useRef } from 'react';
import type { GalleryItem } from '../../config/gallery';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useScrollLock } from '../../hooks/useScrollLock';
import Icon from '../common/Icon';
import styles from './Gallery.module.css';

interface LightboxProps {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  triggerRef: React.RefObject<HTMLElement>;
}

export default function Lightbox({ item, onClose, onPrev, onNext, triggerRef }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useScrollLock(true);
  useFocusTrap(dialogRef, { active: true, onClose, returnFocusRef: triggerRef });

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Închideți imaginea">
          <Icon name="close" />
        </button>
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navPrev}`}
          onClick={onPrev}
          aria-label="Imaginea anterioară"
        >
          <Icon name="arrow-right" style={{ transform: 'rotate(180deg)' }} />
        </button>
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navNext}`}
          onClick={onNext}
          aria-label="Imaginea următoare"
        >
          <Icon name="arrow-right" />
        </button>

        <img className={styles.dialogImage} src={item.image} alt={item.alt} width={1200} height={900} />
        <h3 id="lightbox-title" className={styles.dialogTitle}>
          {item.title}
        </h3>
        <p className={styles.dialogDescription}>{item.description}</p>
      </div>
    </div>
  );
}
