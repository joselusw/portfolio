import { Injectable, effect, signal } from "@angular/core";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: "root",
})
export class ScrollService {
  private scrollProgress = signal(0);

  constructor() {}

  /**
   * Initialize scroll progress tracking using Lenis scroll callback
   * Must be called from AppComponent with Lenis instance to avoid conflicts
   */
  initScrollProgressWithLenis(lenis: any): void {
    if (typeof window === "undefined" || !lenis) return;

    // Use Lenis onScroll callback instead of native scroll listener
    lenis.on("scroll", () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      this.scrollProgress.set(scrolled);
    });
  }

  /**
   * Get scroll progress signal (0-100)
   */
  getScrollProgress() {
    return this.scrollProgress.asReadonly();
  }

  /**
   * Create a scroll trigger animation
   */
  createScrollTrigger(
    trigger: HTMLElement | string,
    onEnter: () => void,
    options?: ScrollTrigger.Vars,
  ): ScrollTrigger {
    return ScrollTrigger.create({
      trigger,
      onEnter,
      invalidateOnRefresh: true,
      ...options,
    });
  }

  /**
   * Animate element on scroll into view
   */
  animateOnScroll(
    element: HTMLElement | string,
    animation: gsap.TweenVars,
    scrollTriggerOptions?: ScrollTrigger.Vars,
  ): gsap.core.Tween {
    return gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
        ...scrollTriggerOptions,
      },
      ...animation,
    });
  }

  /**
   * Create parallax effect
   */
  createParallax(element: HTMLElement, speed: number = 0.5): void {
    gsap.to(element, {
      y: () => window.innerHeight * speed * -1,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        markers: false,
        invalidateOnRefresh: true,
      },
    });
  }

  /**
   * Refresh all ScrollTriggers (call after DOM changes)
   */
  refresh(): void {
    ScrollTrigger.refresh();
  }

  /**
   * Kill all ScrollTriggers (cleanup on component destroy)
   */
  killAll(): void {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  /**
   * Scroll to element smoothly using GSAP
   */
  scrollTo(
    target: HTMLElement | string,
    duration: number = 1.5,
    offset: number = 0,
  ): void {
    const element =
      typeof target === "string" ? document.querySelector(target) : target;
    if (!element) return;

    gsap.to(window, {
      scrollTo: {
        y: element,
        offsetY: offset,
        autoKill: false,
      },
      duration,
      ease: "expo.inOut",
    });
  }
}
