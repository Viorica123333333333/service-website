import type { CSSProperties, ElementType, PropsWithChildren } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface RevealOnScrollProps {
  as?: ElementType;
  className?: string;
  delayMs?: number;
}

/**
 * Wraps children in a subtle fade/rise reveal, triggered by
 * IntersectionObserver. Fully inert (content always visible) when
 * JavaScript doesn't run or `prefers-reduced-motion` is set — see the
 * `.reveal` rules in src/styles/global.css.
 *
 * `as` accepts any tag name (`div`, `article`, `li`, …) via React's
 * `ElementType`. TypeScript's JSX typing can't statically resolve a
 * ref's element type against a variable-typed tag, so the ref is passed
 * through an explicit, narrow `as any` here rather than fighting that
 * generic-component typing problem — everything else on this component
 * stays fully typed.
 */
export default function RevealOnScroll({
  as: Component = 'div',
  className = '',
  delayMs = 0,
  children,
}: PropsWithChildren<RevealOnScrollProps>) {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.15 });
  const style: CSSProperties | undefined = delayMs ? { transitionDelay: `${delayMs}ms` } : undefined;

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={style}
    >
      {children}
    </Component>
  );
}
