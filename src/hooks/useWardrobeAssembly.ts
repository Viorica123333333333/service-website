import { type RefObject, useLayoutEffect } from 'react';

export interface WardrobePartRefs {
  stage: RefObject<HTMLDivElement>;
  illustration: RefObject<SVGSVGElement>;
  photo: RefObject<HTMLImageElement>;
  guides: RefObject<SVGGElement>;
  topPanel: RefObject<SVGGElement>;
  leftPanel: RefObject<SVGGElement>;
  rightPanel: RefObject<SVGGElement>;
  basePanel: RefObject<SVGGElement>;
  divider: RefObject<SVGGElement>;
  doorLeft: RefObject<SVGGElement>;
  doorRight: RefObject<SVGGElement>;
  handleLeft: RefObject<SVGGElement>;
  handleRight: RefObject<SVGGElement>;
}

interface UseWardrobeAssemblyOptions {
  enabled: boolean;
}

// GSAP-equivalent easing curves, reproduced as cubic-bezier so the motion
// "feel" matches what a GSAP power2.out / power3.inOut / back.out(1.7)
// timeline would produce, without adding a GSAP dependency (see README /
// the delivery notes for why: this sandbox cannot reach the npm registry,
// so GSAP could never actually be installed here).
const EASE_POWER2_OUT = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const EASE_POWER3_IN_OUT = 'cubic-bezier(0.65, 0, 0.35, 1)';
const EASE_BACK_OUT = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const EASE_LINEAR = 'linear';

function animate(
  el: Element | null,
  keyframes: Keyframe[],
  options: { duration: number; delay: number; easing: string },
): Animation | null {
  if (!el) return null;
  return el.animate(keyframes, { ...options, fill: 'both' });
}

/**
 * Drives the hero "wardrobe assembly" sequence: illustrated panels fly in
 * along their guide lines and lock into a flat wardrobe illustration, the
 * guide lines fade out, and the whole illustration crossfades into the real
 * wardrobe photo as the final, permanent state.
 *
 * Architected like a `gsap.context()` scope even though it uses the native
 * Web Animations API: every Animation created here is tracked in a local
 * array and explicitly cancelled on cleanup, so re-running the effect
 * (React 18 Strict Mode double-invokes effects in development) never stacks
 * animations or leaks state, and there is no module-level mutable state.
 */
export function useWardrobeAssembly(refs: WardrobePartRefs, { enabled }: UseWardrobeAssemblyOptions) {
  useLayoutEffect(() => {
    if (!enabled) return;

    const animations: Animation[] = [];
    const track = (a: Animation | null) => {
      if (a) animations.push(a);
    };

    // 1. Illustration fades in, photo is hidden for the duration of the
    //    sequence (both start "true" via CSS defaults — this is the only
    //    place that overrides them, and only once JS + motion are both
    //    confirmed available).
    track(
      animate(refs.illustration.current, [{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        delay: 0,
        easing: EASE_LINEAR,
      }),
    );
    track(
      animate(refs.photo.current, [{ opacity: 1 }, { opacity: 0 }], {
        duration: 1,
        delay: 0,
        easing: EASE_LINEAR,
      }),
    );

    // 2. Guide lines: fade in early, hold, fade out once parts have landed.
    track(
      animate(
        refs.guides.current,
        [{ opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 1, offset: 0.75 }, { opacity: 0 }],
        { duration: 2300, delay: 100, easing: EASE_LINEAR },
      ),
    );

    // 3. Panels fly in from their exploded positions to their resting
    //    (markup-default) position. `from` values are relative offsets;
    //    `to` is always the identity transform, i.e. the part's real
    //    position in the assembled wardrobe.
    track(
      animate(
        refs.topPanel.current,
        [
          { transform: 'translate(-46px, -92px) rotate(-6deg)', opacity: 0 },
          { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        ],
        { duration: 480, delay: 120, easing: EASE_POWER2_OUT },
      ),
    );
    track(
      animate(
        refs.leftPanel.current,
        [
          { transform: 'translate(-118px, 12px) rotate(-4deg)', opacity: 0 },
          { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        ],
        { duration: 520, delay: 180, easing: EASE_POWER2_OUT },
      ),
    );
    track(
      animate(
        refs.rightPanel.current,
        [
          { transform: 'translate(126px, 12px) rotate(4deg)', opacity: 0 },
          { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        ],
        { duration: 520, delay: 220, easing: EASE_POWER2_OUT },
      ),
    );
    track(
      animate(
        refs.basePanel.current,
        [
          { transform: 'translate(-24px, 96px)', opacity: 0 },
          { transform: 'translate(0, 0)', opacity: 1 },
        ],
        { duration: 420, delay: 520, easing: EASE_POWER2_OUT },
      ),
    );
    track(
      animate(
        refs.divider.current,
        [
          { transform: 'translate(-76px, -44px)', opacity: 0 },
          { transform: 'translate(0, 0)', opacity: 1 },
        ],
        { duration: 420, delay: 660, easing: EASE_POWER2_OUT },
      ),
    );
    track(
      animate(
        refs.doorLeft.current,
        [
          { transform: 'translate(-168px, 22px) rotate(-8deg)', opacity: 0 },
          { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        ],
        { duration: 520, delay: 940, easing: EASE_POWER3_IN_OUT },
      ),
    );
    track(
      animate(
        refs.doorRight.current,
        [
          { transform: 'translate(168px, 22px) rotate(8deg)', opacity: 0 },
          { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        ],
        { duration: 520, delay: 990, easing: EASE_POWER3_IN_OUT },
      ),
    );
    track(
      animate(
        refs.handleLeft.current,
        [
          { transform: 'translate(-92px, 42px) scale(0.6)', opacity: 0 },
          { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        ],
        { duration: 280, delay: 1560, easing: EASE_BACK_OUT },
      ),
    );
    track(
      animate(
        refs.handleRight.current,
        [
          { transform: 'translate(92px, 42px) scale(0.6)', opacity: 0 },
          { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        ],
        { duration: 280, delay: 1610, easing: EASE_BACK_OUT },
      ),
    );

    // 4. Final crossfade: the flat illustration hands off to the real
    //    photo, landing on a credible, photoreal finished wardrobe.
    track(
      animate(refs.photo.current, [{ opacity: 0 }, { opacity: 1 }], {
        duration: 520,
        delay: 2560,
        easing: EASE_POWER2_OUT,
      }),
    );
    track(
      animate(refs.illustration.current, [{ opacity: 1 }, { opacity: 0 }], {
        duration: 520,
        delay: 2560,
        easing: EASE_POWER2_OUT,
      }),
    );

    return () => {
      animations.forEach((a) => a.cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
}
