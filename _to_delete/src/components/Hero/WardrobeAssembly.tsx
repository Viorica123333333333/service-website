import { useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useWardrobeAssembly, type WardrobePartRefs } from '../../hooks/useWardrobeAssembly';
import styles from './WardrobeAssembly.module.css';

/**
 * Hero visual: illustrated wardrobe panels fly in along dashed guide lines
 * and lock together into a flat illustration, which then crossfades into
 * the real finished-wardrobe photo — the animation's permanent end state.
 *
 * Purely decorative (the hero copy already states the value proposition in
 * text), so the whole thing is `aria-hidden`. The default, no-JS markup
 * shows only the real photo at full opacity — the illustration is hidden
 * by default in CSS and only revealed by JS once motion is confirmed to be
 * wanted, so a JS failure or `prefers-reduced-motion` both fall back to a
 * single, correct, fully-loaded real photograph with no empty panel and no
 * layout shift (the wrapper reserves space via `aspect-ratio`).
 */
export default function WardrobeAssembly() {
  const prefersReducedMotion = useReducedMotion();

  const stage = useRef<HTMLDivElement>(null);
  const illustration = useRef<SVGSVGElement>(null);
  const photo = useRef<HTMLImageElement>(null);
  const guides = useRef<SVGGElement>(null);
  const topPanel = useRef<SVGGElement>(null);
  const leftPanel = useRef<SVGGElement>(null);
  const rightPanel = useRef<SVGGElement>(null);
  const basePanel = useRef<SVGGElement>(null);
  const divider = useRef<SVGGElement>(null);
  const doorLeft = useRef<SVGGElement>(null);
  const doorRight = useRef<SVGGElement>(null);
  const handleLeft = useRef<SVGGElement>(null);
  const handleRight = useRef<SVGGElement>(null);

  const refs: WardrobePartRefs = {
    stage,
    illustration,
    photo,
    guides,
    topPanel,
    leftPanel,
    rightPanel,
    basePanel,
    divider,
    doorLeft,
    doorRight,
    handleLeft,
    handleRight,
  };

  useWardrobeAssembly(refs, { enabled: !prefersReducedMotion });

  return (
    <div className={styles.frame} ref={stage} aria-hidden="true">
      <img
        ref={photo}
        className={styles.photo}
        src="/images/real/wardrobe-assembled.jpg"
        alt=""
        width={1369}
        height={1149}
        fetchPriority="high"
      />

      <svg
        ref={illustration}
        className={styles.illustration}
        viewBox="0 0 720 520"
        role="presentation"
        focusable="false"
      >
        <defs>
          <marker
            id="wardrobe-arrowhead"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M0,0 L8,4 L0,8 Z" className={styles.arrowhead} />
          </marker>
        </defs>

        <g ref={guides} className={styles.guides}>
          <path d="M170,30 L540,55" className={styles.guideLine} markerEnd="url(#wardrobe-arrowhead)" />
          <path d="M40,150 L420,255" className={styles.guideLine} markerEnd="url(#wardrobe-arrowhead)" />
          <path d="M130,90 L548,255" className={styles.guideLine} markerEnd="url(#wardrobe-arrowhead)" />
          <path d="M60,300 L490,255" className={styles.guideLine} markerEnd="url(#wardrobe-arrowhead)" />
          <path d="M300,40 L615,255" className={styles.guideLine} markerEnd="url(#wardrobe-arrowhead)" />
          <path d="M150,440 L540,462" className={styles.guideLine} markerEnd="url(#wardrobe-arrowhead)" />
          <path d="M260,470 L680,255" className={styles.guideLine} markerEnd="url(#wardrobe-arrowhead)" />
        </g>

        <g ref={topPanel} className={styles.panelFill}>
          <rect x={420} y={50} width={270} height={14} />
        </g>
        <g ref={leftPanel} className={styles.panelFill}>
          <rect x={420} y={50} width={14} height={420} />
        </g>
        <g ref={rightPanel} className={styles.panelFill}>
          <rect x={676} y={50} width={14} height={420} />
        </g>
        <g ref={basePanel} className={styles.panelFill}>
          <rect x={420} y={456} width={270} height={14} />
        </g>
        <g ref={divider} className={styles.dividerFill}>
          <rect x={552} y={64} width={6} height={392} />
        </g>
        <g ref={doorLeft} className={styles.doorFill}>
          <rect x={434} y={64} width={121} height={392} />
        </g>
        <g ref={doorRight} className={styles.doorFill}>
          <rect x={559} y={64} width={121} height={392} />
        </g>
        <g ref={handleLeft} className={styles.handleFill}>
          <rect x={536} y={240} width={5} height={56} />
        </g>
        <g ref={handleRight} className={styles.handleFill}>
          <rect x={578} y={240} width={5} height={56} />
        </g>
      </svg>
    </div>
  );
}
