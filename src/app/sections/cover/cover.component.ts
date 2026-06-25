import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  HostListener,
  signal,
} from "@angular/core";

import { RouterModule } from "@angular/router";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { PORTFOLIO_DATA } from "@core/models/portfolio.models";
import { AnimationService } from "@core/services/animation.service";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, SplitText);

interface Section {
  id: string;
  label: string;
}

@Component({
  selector: "app-cover",
  standalone: true,
  imports: [RouterModule],
  styleUrl: "./cover.component.scss",
  template: `
    <section
      class="cover-section"
      #coverSection
      [style.--gradient-x]="gradientPos().x + '%'"
      [style.--gradient-y]="gradientPos().y + '%'"
    >
      <!-- Background radial gradient -->
      <div class="gradient-bg" #gradientBg></div>

      <!-- Navigation dots (top-right) -->
      <nav class="nav-dots" #navDots>
        @for (section of sections; track section) {
          <button
            class="nav-dot"
            [class.active]="currentSection() === section.id"
            [title]="section.label"
            (click)="scrollToSection(section.id)"
            [attr.aria-label]="'Navigate to ' + section.label"
          >
            <span class="dot"></span>
          </button>
        }
      </nav>

      <!-- Main container -->
      <div class="cover-container">
        <!-- Left side: Fhoto -->
        <div class="photo-wrapper" #photoWrapper>
          <div class="photo-border" #photoBorder>
            <img
              #heroPhoto
              [src]="portfolio.photoUrl || '/assets/placeholder-avatar.jpg'"
              [alt]="portfolio.name"
              class="hero-photo"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        <!-- Right side: Text content -->
        <div class="content-wrapper" #contentWrapper>
          <!-- Name -->
          <h1 class="hero-name" #heroName>
            {{ nameFirstLine }}<br />{{ nameSecondLine }}
          </h1>

          <!-- Title (professional role) -->
          <p class="hero-title" #heroTitle>
            {{ portfolio.title }}
          </p>

          <!-- Tagline -->
          <p class="hero-tagline" #heroTagline>
            <em>{{ portfolio.bio }}</em>
          </p>

          <!-- Status panel -->
          <div class="hero-status-grid" #heroStatusGrid>
            <div class="hero-statement">
              <span class="hero-eyebrow">Current focus</span>
              <p>
                Cloud-native systems, AI-augmented experiences, and resilient
                product delivery.
              </p>
            </div>

            <div class="hero-panel">
              <span class="status-chip">Now</span>
              <p class="panel-label">Open to senior engineering roles</p>
              <p class="panel-note">
                {{ portfolio.location }} · remote / hybrid
              </p>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="cta-buttons" #ctaButtons>
            <button
              class="btn btn-primary"
              (click)="scrollToSection('jobs')"
              aria-label="View my work"
            >
              View My Work
            </button>
            <a
              href="mailto:{{ portfolio.email }}"
              class="btn btn-secondary"
              aria-label="Send me an email"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      <!-- Scroll indicator (bottom center) -->
      <div class="scroll-indicator" #scrollIndicator>
        <svg
          class="scroll-arrow"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
        <p class="scroll-label">Scroll to explore</p>
      </div>
    </section>
  `,
})
export class CoverComponent implements OnInit, OnDestroy {
  @ViewChild("coverSection") coverSection!: ElementRef;
  @ViewChild("photoWrapper") photoWrapper!: ElementRef;
  @ViewChild("heroName") heroName!: ElementRef;
  @ViewChild("heroTitle") heroTitle!: ElementRef;
  @ViewChild("heroTagline") heroTagline!: ElementRef;
  @ViewChild("ctaButtons") ctaButtons!: ElementRef;
  @ViewChild("scrollIndicator") scrollIndicator!: ElementRef;
  @ViewChild("gradientBg") gradientBg!: ElementRef;
  @ViewChild("navDots") navDots!: ElementRef;
  @ViewChild("heroStatusGrid") heroStatusGrid!: ElementRef;

  portfolio = PORTFOLIO_DATA;
  currentSection = signal<string>("cover");
  gradientPos = signal({ x: 50, y: 50 });

  sections: Section[] = [
    { id: "cover", label: "Home" },
    { id: "about-me", label: "About" },
    { id: "jobs", label: "Experience" },
    { id: "tech", label: "Tech" },
    { id: "footer", label: "Contact" },
  ];

  // Split name into two lines for better display
  // Split name into two lines for better display
  get nameFirstLine(): string {
    const parts = this.portfolio.name.split(" ");
    return parts[0];
  }

  get nameSecondLine(): string {
    const parts = this.portfolio.name.split(" ");
    return parts.slice(1).join(" ");
  }

  private photoParallaxTween: gsap.core.Tween | null = null;
  private nameParallaxTween: gsap.core.Tween | null = null;
  private splitText: SplitText | null = null;
  private scrollTriggers: ScrollTrigger[] = [];

  constructor(private animationService: AnimationService) {}

  ngOnInit(): void {
    // Initialize other things here if needed
  }

  ngAfterViewInit(): void {
    this.initAnimations();
    this.initParallax();
  }

  ngOnDestroy(): void {
    this.killAnimations();
  }

  /**
   * Initialize load animations using GSAP timeline
   */
  private initAnimations(): void {
    if (!this.coverSection) return;

    // Get animation config from AnimationService
    const fadeConfig = this.animationService.getFadeInAnimation({
      duration: 1,
      ease: "power3.out",
    });
    const scaleConfig = this.animationService.getScaleFadeAnimation({
      duration: 0.8,
      ease: "power2.inOut",
    });
    const staggerConfig = this.animationService.getStagger(0.05, 0);

    const tl = gsap.timeline({
      paused: false,
    });

    // 1. Photo fade + slide from left
    tl.fromTo(
      this.photoWrapper.nativeElement,
      { opacity: 0, x: -40 },
      { ...fadeConfig, x: 0 },
      0,
    );

    // 2. Name letters animate in using SplitText
    if (this.heroName) {
      this.splitText = new SplitText(this.heroName.nativeElement, {
        type: "chars",
      });

      tl.fromTo(
        this.splitText.chars,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: fadeConfig.duration as number,
          stagger: staggerConfig,
          ease: "power4.out",
        },
        0.2,
      );
    }

    // 3. Title line draws in left to right (scaleX)
    tl.fromTo(
      this.heroTitle.nativeElement,
      { opacity: 0, scaleX: 0, transformOrigin: "left" },
      scaleConfig,
      0.6,
    );

    // 4. Tagline fades up
    tl.fromTo(
      this.heroTagline.nativeElement,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ...fadeConfig },
      0.8,
    );

    // 5. Status panel appears with a gentle lift
    tl.fromTo(
      this.heroStatusGrid.nativeElement,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      0.85,
    );

    // 6. CTA buttons fade up together
    tl.fromTo(
      this.ctaButtons.nativeElement,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ...fadeConfig },
      0.95,
    );

    // 7. Scroll indicator bounces in last
    tl.fromTo(
      this.scrollIndicator.nativeElement,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "back.out(1.2)",
      },
      1.1,
    );
  }

  /**
   * Initialize parallax effects on scroll
   */
  private initParallax(): void {
    if (!this.coverSection || !this.animationService.shouldApplyParallax())
      return;

    // Photo parallax (subtle float)
    const photoScrollTrigger = gsap.to(this.photoWrapper.nativeElement, {
      y: () => window.innerHeight * -0.12,
      scrollTrigger: {
        trigger: this.coverSection.nativeElement,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    // Name parallax (gentle upward drift)
    const nameScrollTrigger = gsap.to(this.heroName.nativeElement, {
      y: () => window.innerHeight * -0.08,
      scrollTrigger: {
        trigger: this.coverSection.nativeElement,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    // Track tweens for cleanup
    this.photoParallaxTween = photoScrollTrigger;
    this.nameParallaxTween = nameScrollTrigger;

    // Track ScrollTriggers for cleanup
    if (photoScrollTrigger.scrollTrigger) {
      this.scrollTriggers.push(photoScrollTrigger.scrollTrigger);
    }
    if (nameScrollTrigger.scrollTrigger) {
      this.scrollTriggers.push(nameScrollTrigger.scrollTrigger);
    }
  }

  /**
   * Initialize mouse tracking for radial gradient shift
   */
  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent): void {
    if (!this.coverSection) return;

    const rect = this.coverSection.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate percentage within the section (with 10% margin)
    const xPercent = Math.min(100, Math.max(0, (x / rect.width) * 100));
    const yPercent = Math.min(100, Math.max(0, (y / rect.height) * 100));

    // Constrain to 40-60% range for subtle effect (10% range center)
    const constrainedX = 40 + (xPercent * 20) / 100;
    const constrainedY = 40 + (yPercent * 20) / 100;

    this.gradientPos.set({ x: constrainedX, y: constrainedY });
  }

  /**
   * Scroll to specific section
   */
  scrollToSection(sectionId: string): void {
    this.currentSection.set(sectionId);

    const element = document.querySelector(`app-${sectionId}`);
    if (element) {
      gsap.to(window, {
        scrollTo: {
          y: element,
          offsetY: 0,
          autoKill: false,
        },
        duration: 1.5,
        ease: "expo.inOut",
      });
    }
  }

  /**
   * Clean up animations and tweens
   */
  private killAnimations(): void {
    // Kill tweens
    if (this.photoParallaxTween) {
      this.photoParallaxTween.kill();
    }
    if (this.nameParallaxTween) {
      this.nameParallaxTween.kill();
    }

    // Kill ScrollTriggers
    this.scrollTriggers.forEach((trigger) => {
      if (trigger) {
        trigger.kill();
      }
    });
    this.scrollTriggers = [];

    // Revert SplitText
    if (this.splitText) {
      this.splitText.revert();
    }

    // Kill all tweens on hero elements
    gsap.killTweensOf([
      this.heroName?.nativeElement,
      this.heroTitle?.nativeElement,
      this.heroTagline?.nativeElement,
      this.ctaButtons?.nativeElement,
      this.scrollIndicator?.nativeElement,
    ]);
  }
}
