import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Drives the wardrobe "sticky scroll story": observes a set of step
 * elements and reports which one is currently most visible, so the caller
 * can crossfade a corresponding image. Uses IntersectionObserver only —
 * no scroll-event listeners, no scroll hijacking, and it degrades to
 * "first slide always active" when IntersectionObserver is unavailable.
 */
export function useActiveSlideOnScroll<T extends HTMLElement = HTMLElement>(
  stepCount: number,
): [RefObject<T>[], number] {
  const refs = useRef<RefObject<T>[]>(
    Array.from({ length: stepCount }, () => ({ current: null })) as RefObject<T>[],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const visibility = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const indexAttr = (entry.target as HTMLElement).dataset.storyIndex;
          if (indexAttr === undefined) continue;
          visibility.set(Number(indexAttr), entry.intersectionRatio);
        }

        let bestIndex = 0;
        let bestRatio = -1;
        visibility.forEach((ratio, index) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        });
        setActiveIndex(bestIndex);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    refs.current.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return [refs.current, activeIndex];
}
