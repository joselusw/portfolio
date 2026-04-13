/**
 * Global animation timing and easing constants
 * Ensure consistency across all GSAP animations
 */

export const ANIMATION_EASES = {
  // Entrance animations (0.6-0.8s)
  entrance: "power3.out",

  // Emphasis/spring animations
  emphasis: "back.out(1.4)",

  // Smooth transitions (hover/interactive)
  smooth: "power2.inOut",

  // Stagger reveals
  reveal: "power2.out",

  // Scroll-based animations
  scroll: "expo.inOut",

  // Card/tile entrances
  cardEntrance: "back.out(1.4)",
} as const;

export const ANIMATION_DURATIONS = {
  // Micro interactions
  micro: 0.3,

  // Quick reveals
  quick: 0.4,

  // Standard duration
  standard: 0.6,

  // Medium duration
  medium: 0.8,

  // Long duration (scroll animations)
  long: 1,

  // Extra long (full page transitions)
  extraLong: 1.2,

  // Scroll transitions
  scrollLong: 1.5,
} as const;

export const ANIMATION_STAGGER = {
  // Tight stagger for grouped elements
  tight: 0.05,

  // Standard stagger
  standard: 0.1,

  // Loose stagger for spread reveals
  loose: 0.15,
} as const;

export const ANIMATION_DELAYS = {
  // No delay
  none: 0,

  // Micro delay
  micro: 0.1,

  // After first element
  offset: 0.2,

  // Staggered delay
  staggered: (index: number, interval: number = 0.15) => index * interval,
} as const;

type EasePreset = (typeof ANIMATION_EASES)[keyof typeof ANIMATION_EASES];
type DurationPreset =
  (typeof ANIMATION_DURATIONS)[keyof typeof ANIMATION_DURATIONS];

/** Helper to create animation config objects */
export function createAnimationConfig(
  ease: EasePreset = ANIMATION_EASES.entrance,
  duration: DurationPreset = ANIMATION_DURATIONS.medium,
): gsap.TweenVars {
  return { ease, duration };
}
