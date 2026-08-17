import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  inject,
} from "@angular/core";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@core/models/portfolio.models";
import { AnimationService } from "@core/services/animation.service";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: "app-about-me",
  standalone: true,
  imports: [],
  styleUrl: "./about-me.component.scss",
  template: `
    <section class="about-section" #aboutSection>
      <!-- Divider line (draws from center outward) -->
      <div class="section-divider" #sectionDivider></div>

      <div
        class="about-container flex flex-col gap-8 lg:grid lg:grid-cols-[55%_45%]"
      >
        <!-- Left Panel: Bio -->
        <div
          class="about-left px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-16"
          #aboutLeft
        >
          <!-- Section label -->
          <p class="section-label anim-hidden-y-md">About</p>

          <!-- Main heading -->
          <h2 class="about-heading anim-hidden-y-lg">What I build</h2>

          <!-- Bio paragraphs -->
          <div class="about-bio anim-hidden-y-md">
            @for (para of bioParagraphs; track para) {
              <p class="bio-paragraph">
                {{ para }}
              </p>
            }
          </div>

          <!-- Divider -->
          <div class="about-divider anim-hidden-scale-x"></div>
        </div>

        <!-- Right Panel: Certifications -->
        <div
          class="about-right px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-16"
          #aboutRight
        >
          <!-- Section label -->
          <p class="section-label anim-hidden-y-md">Credentials</p>

          <!-- Certifications list -->
          <div class="certifications-list pt-2 sm:pt-4" #certificationsList>
            @for (cert of portfolio.certifications; track cert) {
              <div class="cert-card anim-hidden-y-md" #certCard>
                <!-- Logo placeholder -->
                <div class="cert-logo">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="18"
                      fill="var(--color-surface)"
                      stroke="var(--color-accent-2)"
                      stroke-width="2"
                    />
                    <path d="M20 10L24 15H16Z" fill="var(--color-accent-2)" />
                    <path
                      d="M16 20H24M18 24H22"
                      stroke="var(--color-accent-2)"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <!-- Content -->
                <div class="cert-content">
                  <h3 class="cert-name">{{ cert.name }}</h3>
                  <p class="cert-issuer">{{ cert.issuer }}</p>
                  <p class="cert-year">{{ cert.issued }}</p>
                </div>
                <!-- Badge -->
                <div class="cert-badge completed">Completed</div>
                <!-- Left accent border -->
                <div class="cert-accent-border"></div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutMeComponent implements AfterViewInit, OnDestroy {
  @ViewChild("aboutSection") aboutSection!: ElementRef;
  @ViewChild("aboutLeft") aboutLeft!: ElementRef;
  @ViewChild("aboutRight") aboutRight!: ElementRef;
  @ViewChild("sectionDivider") sectionDivider!: ElementRef;
  @ViewChild("certificationsList") certificationsList!: ElementRef;

  portfolio = PORTFOLIO_DATA;

  // Dynamically calculated age
  get age(): number {
    if (!this.portfolio.birthDate) return 0;
    const today = new Date();
    const birth = new Date(this.portfolio.birthDate);
    let calculatedAge = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      calculatedAge--;
    }

    return calculatedAge;
  }

  get experience(): number {
    const currentYear = new Date().getFullYear();
    return currentYear - 2017;
  }

  // Split bio into paragraphs with dynamic age
  get bioParagraphs(): string[] {
    return [
      `I help teams ship resilient, user-first products with Angular, .NET, and cloud-native architectures.`,
      `Based in Málaga, Spain, I bridge frontend motion, backend reliability, and emerging AI patterns.`,
      "I enjoy turning complex challenges into clear, maintainable systems that support product teams and business outcomes.",
      "Beyond core engineering, I focus on fast, thoughtful delivery that keeps performance, accessibility, and user trust at the center.",
    ];
  }

  private scrollTriggers: ScrollTrigger[] = [];

  private readonly animationService = inject(AnimationService);

  ngAfterViewInit(): void {
    if (typeof window === "undefined") return;
    this.removeInitialHiddenClasses();
    this.initDividerAnimation();
    this.initContentAnimation();
  }

  private removeInitialHiddenClasses(): void {
    const elements = [
      ...Array.from<HTMLElement>(
        this.aboutLeft?.nativeElement?.querySelectorAll(
          ".section-label, .about-heading, .about-bio, .about-divider",
        ) ?? [],
      ),
      ...Array.from<HTMLElement>(
        this.aboutRight?.nativeElement?.querySelectorAll(
          ".section-label, .cert-card",
        ) ?? [],
      ),
    ];
    elements.forEach((el) => {
      if (el) {
        el.classList.remove(
          "anim-hidden",
          "anim-hidden-y-md",
          "anim-hidden-y-lg",
          "anim-hidden-scale-x",
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.killAnimations();
  }

  /**
   * Animate the divider line (draws from center outward)
   */
  private initDividerAnimation(): void {
    if (!this.sectionDivider) return;

    gsap.fromTo(
      this.sectionDivider.nativeElement,
      { width: "0%", opacity: 0, transformOrigin: "center" },
      {
        width: "100%",
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: this.aboutSection.nativeElement,
          start: "top 80%",
          once: true,
          invalidateOnRefresh: true,
        },
      },
    );
  }

  /**
   * Animate content entrance (labels, heading, bio, divider, certifications)
   */
  private initContentAnimation(): void {
    if (!this.aboutLeft || !this.aboutRight) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.aboutSection.nativeElement,
        start: "top 80%",
        once: true,
        invalidateOnRefresh: true,
      },
      defaults: {
        duration: 0.75,
        ease: "power3.out",
      },
    });

    const leftLabels =
      this.aboutLeft.nativeElement.querySelectorAll(".section-label");
    const leftHeading =
      this.aboutLeft.nativeElement.querySelector(".about-heading");
    const leftBio = this.aboutLeft.nativeElement.querySelector(".about-bio");
    const leftDivider =
      this.aboutLeft.nativeElement.querySelector(".about-divider");
    const rightLabels =
      this.aboutRight.nativeElement.querySelectorAll(".section-label");
    const certCards =
      this.certificationsList?.nativeElement.querySelectorAll(".cert-card");

    // Set start states in JS (not CSS) so content stays visible without scripts
    gsap.set(leftLabels, { opacity: 0, y: 24 });
    gsap.set(leftHeading, { opacity: 0, y: 36 });
    gsap.set(leftBio, { opacity: 0, y: 30 });
    gsap.set(rightLabels, { opacity: 0, y: 24 });
    if (certCards) {
      gsap.set(certCards, { opacity: 0, y: 24 });
    }

    tl.fromTo(
      leftLabels,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.08 },
      0,
    )
      .fromTo(leftHeading, { opacity: 0, y: 36 }, { opacity: 1, y: 0 }, 0.15)
      .fromTo(leftBio, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.3)
      .fromTo(
        leftDivider,
        { opacity: 0, scaleX: 0, transformOrigin: "left" },
        { opacity: 1, scaleX: 1 },
        0.45,
      )
      .fromTo(
        rightLabels,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.08 },
        0.05,
      );

    if (certCards) {
      tl.fromTo(
        certCards,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.08, ease: "back.out(1.2)" },
        0.35,
      );
    }
  }

  /**
   * Clean up animations and tweens
   */
  private killAnimations(): void {
    // Kill ScrollTriggers
    this.scrollTriggers.forEach((trigger) => {
      if (trigger) {
        trigger.kill();
      }
    });
    this.scrollTriggers = [];

    // Kill all tweens on section elements
    gsap.killTweensOf([
      this.aboutLeft?.nativeElement,
      this.aboutRight?.nativeElement,
      this.sectionDivider?.nativeElement,
      this.certificationsList?.nativeElement,
    ]);
  }
}
