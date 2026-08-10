import { Injectable } from "@angular/core";
import { signal } from "@angular/core";
import gsap from "gsap";
import {
  ANIMATION_EASES,
  ANIMATION_DURATIONS,
} from "../constants/animation.constants";

/**
 * Utility service for managing animation preferences and reduced-motion support
 * Detects system preference for reduced motion and provides configuration objects
 * for GSAP animations that gracefully degrade when motion is reduced
 */
@Injectable({
  providedIn: "root",
})
export class AnimationService {
  private readonly mediaQuery: MediaQueryList | null =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
  prefersReducedMotion = signal<boolean>(this.mediaQuery?.matches ?? false);

  constructor() {
    // Listen for changes to prefers-reduced-motion preference
    this.mediaQuery?.addEventListener("change", (e) => {
      this.prefersReducedMotion.set(e.matches);
    });
  }

  /**
   * Returns animation config that respects prefers-reduced-motion
   * If motion is reduced, returns instant config (duration: 0)
   * Otherwise returns the full animation config
   */
  getAnimationConfig(
    fullConfig: gsap.TweenVars,
    reducedConfig?: gsap.TweenVars,
  ): gsap.TweenVars {
    const defaults = {
      opacity: 1,
      ...reducedConfig,
    };

    return this.prefersReducedMotion()
      ? { ...defaults, duration: 0 }
      : fullConfig;
  }

  /**
   * Standard scroll-triggered fade-in + slide animation
   * Used for most scroll-based reveals
   */
  getFadeInAnimation(
    fullConfig: gsap.TweenVars = {},
    reducedConfig: gsap.TweenVars = {},
  ): gsap.TweenVars {
    const full = {
      opacity: 1,
      y: 0,
      duration: ANIMATION_DURATIONS.medium,
      ease: ANIMATION_EASES.entrance,
      ...fullConfig,
    };

    const reduced = {
      opacity: 1,
      y: 0,
      duration: 0,
      ...reducedConfig,
    };

    return this.prefersReducedMotion() ? reduced : full;
  }

  /**
   * Scale + fade animation (common for card reveals)
   */
  getScaleFadeAnimation(
    fullConfig: gsap.TweenVars = {},
    reducedConfig: gsap.TweenVars = {},
  ): gsap.TweenVars {
    const full = {
      opacity: 1,
      scale: 1,
      duration: ANIMATION_DURATIONS.medium,
      ease: ANIMATION_EASES.cardEntrance,
      ...fullConfig,
    };

    const reduced = {
      opacity: 1,
      scale: 1,
      duration: 0,
      ...reducedConfig,
    };

    return this.prefersReducedMotion() ? reduced : full;
  }

  /**
   * Stagger animation helper - returns stagger value or 0 if motion reduced
   */
  getStagger(fullStagger: number, reducedStagger: number = 0): number {
    return this.prefersReducedMotion() ? reducedStagger : fullStagger;
  }

  /**
   * Float/hover animations should be disabled entirely when motion is reduced
   * Returns empty animation config
   */
  getFloatingAnimation(fullConfig: gsap.TweenVars): gsap.TweenVars {
    if (this.prefersReducedMotion()) {
      return { duration: 0, repeat: 0 };
    }
    return fullConfig;
  }

  /**
   * Parallax effect - disable when motion is reduced
   */
  shouldApplyParallax(): boolean {
    return !this.prefersReducedMotion();
  }
}
