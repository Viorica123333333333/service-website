import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** Once the element has intersected, stop observing (default true). */
  once?: boolean;
}

/**
 * Returns a ref to attach to an element and whether it currently intersects
 * the viewport. Powers scroll-reveal animations without layout thrashing —
 * no scroll event listeners, no forced synchronous layout reads.
 */
export function useIntersectionObserver<T extends HTMLElement>(
  options: UseIntersectionObserverOptions = {},
): [RefObject<T>, boolean] {
  const { once = true, threshold = 0.2, rootMargin = '0px', root = null } = options;
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      // Graceful fallback: treat content as visible immediately.
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin, root },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once, threshold, rootMargin, root]);

  return [ref, isIntersecting];
}
