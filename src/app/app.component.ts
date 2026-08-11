import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  signal,
  effect,
  inject,
} from "@angular/core";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { NoiseOverlayComponent } from "@shared/components/noise-overlay/noise-overlay.component";
import { ScrollService } from "@core/services/scroll.service";
import { ThemeService } from "@core/services/theme.service";
import { CoverComponent } from "./sections/cover/cover.component";
import { ProjectsComponent } from "./sections/projects/projects.component";
import { AboutMeComponent } from "./sections/about-me/about-me.component";
import { JobsComponent } from "./sections/jobs/jobs.component";
import { TechComponent } from "./sections/tech/tech.component";
import { FooterComponent } from "./sections/footer/footer.component";

gsap.registerPlugin(ScrollToPlugin);

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    NoiseOverlayComponent,
    CoverComponent,
    ProjectsComponent,
    AboutMeComponent,
    JobsComponent,
    TechComponent,
    FooterComponent,
  ],
  template: `
    <div class="app-wrapper">
      <!-- Progress Indicator -->
      <div
        class="progress-bar"
        [style.width.%]="scrollProgress()"
        #progressBar
      ></div>

      <!-- Noise Overlay -->
      <app-noise-overlay></app-noise-overlay>

      <!-- Main Content -->
      <main class="main-content" role="main">
        <app-cover></app-cover>
        <app-projects></app-projects>
        <app-about-me></app-about-me>
        <app-jobs></app-jobs>
        <app-tech></app-tech>
        <app-footer></app-footer>
      </main>

      <!-- Theme Toggle Button -->
      <button
        class="theme-toggle fixed bottom-8 right-8 z-50"
        (click)="toggleTheme()"
        [title]="
          'Switch to ' +
          (currentTheme() === 'dark' ? 'light' : 'dark') +
          ' mode'
        "
        aria-label="Toggle theme"
      >
        @if (currentTheme() === "dark") {
          <span>☀️</span>
        }
        @if (currentTheme() === "light") {
          <span>🌙</span>
        }
      </button>
    </div>
  `,
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild("progressBar") progressBar!: ElementRef;

  private lenis: Lenis | null = null;
  scrollProgress = signal(0);
  currentTheme = signal<"dark" | "light">("dark");

  private readonly scrollService = inject(ScrollService);
  private readonly themeService = inject(ThemeService);

  constructor() {
    // Subscribe to theme changes
    effect(() => {
      this.currentTheme.set(this.themeService.getTheme()());
    });

    // Subscribe to scroll progress
    effect(() => {
      this.scrollProgress.set(this.scrollService.getScrollProgress()());
    });
  }

  ngOnInit(): void {
    this.initLenis();
    this.setupScrollBehavior();
  }

  ngOnDestroy(): void {
    if (this.lenis) {
      this.lenis.destroy();
    }
  }

  /**
   * Initialize Lenis smooth scroll
   */
  private initLenis(): void {
    if (typeof window === "undefined") {
      return;
    }

    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Wire Lenis into GSAP ticker
    gsap.ticker.add((time: number) => {
      this.lenis?.raf(time * 1000);
    });

    // Prevent GSAP ticker lag to ensure smooth integration with Lenis
    gsap.ticker.lagSmoothing(0);

    // Ensure Lenis updates on scroll
    gsap.ticker.wake();
  }

  /**
   * Set up additional scroll behavior
   */
  private setupScrollBehavior(): void {
    if (typeof window === "undefined" || !this.lenis) {
      return;
    }

    // Initialize scroll progress tracking with Lenis callback (prevents conflicts)
    this.scrollService.initScrollProgressWithLenis(this.lenis);

    // Refresh ScrollTriggers when Lenis is ready
    this.lenis.on("scroll", () => {
      gsap.ticker.wake();
    });
  }

  /**
   * Toggle theme
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
