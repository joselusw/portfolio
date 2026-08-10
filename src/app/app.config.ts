/*
 * SSG DECISION:
 *
 * This portfolio uses Static Site Generation (SSG) with prerendering instead of SSR.
 *
 * JUSTIFICATION:
 * - Portfolio sites are content-driven with minimal dynamic interactions
 * - SSR adds unnecessary server overhead and complexity for a single-page portfolio
 * - Prerendering provides:
 *   ✓ Fast Time-to-First-Byte (no server render latency)
 *   ✓ High Lighthouse scores (static assets + aggressive caching)
 *   ✓ Lower hosting costs (CDN-friendly static files)
 *   ✓ Better perceived performance (instant first paint)
 *   ✓ Excellent Core Web Vitals scores (LCP, FID, CLS)
 * - GSAP animations + Lenis smooth scroll work perfectly with prerendered pages
 * - Open Graph metadata is baked into the HTML at build time
 *
 * If real-time data or personalization becomes necessary, this can be migrated to SSR.
 */

import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from "@angular/core";
import { provideClientHydration } from "@angular/platform-browser";

export const appConfig: ApplicationConfig = {
  providers: [provideZonelessChangeDetection(), provideClientHydration()],
};
