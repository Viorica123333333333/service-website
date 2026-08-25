import { useEffect, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

interface UseFocusTrapOptions {
  active: boolean;
  onClose: () => void;
  /** Element to restore focus to when the trap deactivates. */
  returnFocusRef?: RefObject<HTMLElement>;
}

/**
 * Traps Tab/Shift+Tab focus cycling within `containerRef` while `active`,
 * closes on Escape, and restores focus to the trigger element on close.
 * Used by the mobile navigation drawer and the gallery lightbox modal.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement>,
  { active, onClose, returnFocusRef }: UseFocusTrapOptions,
): void {
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null,
      );

    const focusables = getFocusable();
    (focusables[0] ?? container).focus();

    function handleKeyDown(event: KeyboardEvent) {
      // Re-check here (not just above): TypeScript doesn't carry the outer
      // `if (!container) return;` narrowing into this nested closure, even
      // though `container` is a `const` that can't actually change. This
      // check is a no-op at runtime but satisfies strict-mode `tsc`.
      if (!container) return;

      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const items = getFocusable();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }

      const first = items[0]!;
      const last = items[items.length - 1]!;
      const activeEl = document.activeElement;

      if (event.shiftKey) {
        if (activeEl === first || !container.contains(activeEl)) {
          event.preventDefault();
          last.focus();
        }
      } else if (activeEl === last || !container.contains(activeEl)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      const target = returnFocusRef?.current ?? previouslyFocused;
      target?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
