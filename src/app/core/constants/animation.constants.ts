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
