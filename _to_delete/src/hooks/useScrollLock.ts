import { useEffect } from 'react';

/**
 * Locks background scroll while `locked` is true (used by the mobile nav
 * drawer and the gallery lightbox). Restores the previous overflow value
 * on unlock/unmount so it composes safely if nested.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { style } = document.body;
    const previousOverflow = style.overflow;
    const previousPaddingRight = style.paddingRight;

    // Avoid layout shift caused by the disappearing scrollbar.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      style.overflow = previousOverflow;
      style.paddingRight = previousPaddingRight;
    };
  }, [locked]);
}
