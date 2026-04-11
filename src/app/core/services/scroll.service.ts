import { Injectable, effect, signal } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollProgress = signal(0);
  
  constructor() {
    this.initScrollProgress();
  }

  /**
   * Initialize scroll progress tracking
   */
  private initScrollProgress(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('scroll', () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
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
    options?: ScrollTrigger.Vars
  ): ScrollTrigger {
    return ScrollTrigger.create({
      trigger,
      onEnter,
      ...options,
    });
  }

  /**
   * Animate element on scroll into view
   */
  animateOnScroll(
    element: HTMLElement | string,
    animation: gsap.TweenVars,
    scrollTriggerOptions?: ScrollTrigger.Vars
  ): gsap.core.Tween {
    return gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
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
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        markers: false,
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
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  /**
   * Scroll to element smoothly using GSAP
   */
  scrollTo(target: HTMLElement | string, duration: number = 1.5, offset: number = 0): void {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    gsap.to(window, {
      scrollTo: {
        y: element,
        offsetY: offset,
        autoKill: false,
      },
      duration,
      ease: 'expo.inOut',
    });
  }
}
