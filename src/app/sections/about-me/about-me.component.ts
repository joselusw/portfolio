import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@core/models/portfolio.models";
import { AnimationService } from "@core/services/animation.service";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: "app-about-me",
  standalone: true,
  imports: [CommonModule],
  styleUrl: "./about-me.component.scss",
  template: `
    <section class="about-section" #aboutSection>
      <!-- Divider line (draws from center outward) -->
      <div class="section-divider" #sectionDivider></div>

      <div class="about-container">
        <!-- Left Panel: Bio -->
        <div class="about-left" #aboutLeft>
          <!-- Section label -->
          <p class="section-label">About</p>

          <!-- Main heading -->
          <h2 class="about-heading">Who I Am</h2>

          <!-- Bio paragraphs -->
          <div class="about-bio">
            <p *ngFor="let para of bioParagraphs" class="bio-paragraph">
              {{ para }}
            </p>
          </div>

          <!-- Divider -->
          <div class="about-divider"></div>
        </div>

        <!-- Right Panel: Certifications -->
        <div class="about-right" #aboutRight>
          <!-- Section label -->
          <p class="section-label">Credentials</p>

          <!-- Certifications list -->
          <div class="certifications-list" #certificationsList>
            <div
              class="cert-card"
              *ngFor="let cert of portfolio.certifications"
              #certCard
            >
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
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutMeComponent implements OnInit, AfterViewInit, OnDestroy {
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
      `Heya! I am a ${this.age}-year-old Full-Stack .NET Developer with over ${this.experience} years of experience in designing, developing, and maintaining robust web applications.`,
      "Based in Málaga, Spain, I enjoy both frontend and backend technologies, including C#, ASP.NET, Angular, React, and SQL.",
      "Passionate about clean code, open-source contributions, and delivering end-to-end solutions that drive business success. I am currently seeking my next career step to leverage my expertise in a dynamic and innovative environment.",
      "Beyond traditional development, I'm fascinated by the intersection of AI and full-stack development. I love finding ways to make applications more adaptive and user-centric.",
    ];
  }

  private scrollTriggers: ScrollTrigger[] = [];

  constructor(private animationService: AnimationService) {}

  ngOnInit(): void {
    // Initialization if needed
  }

  ngAfterViewInit(): void {
    this.initDividerAnimation();
    this.initContentAnimation();
  }

  ngOnDestroy(): void {
    this.killAnimations();
  }

  /**
   * Animate the divider line (draws from center outward)
   */
  private initDividerAnimation(): void {
    if (!this.sectionDivider) return;

    gsap.to(this.sectionDivider.nativeElement, {
      scrollTrigger: {
        trigger: this.aboutSection.nativeElement,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      width: "100%",
      duration: 1,
      ease: "power2.out",
    });
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
        toggleActions: "play none none none",
      },
    });

    // Left panel animations
    const leftLabels =
      this.aboutLeft.nativeElement.querySelectorAll(".section-label");
    const leftHeading =
      this.aboutLeft.nativeElement.querySelector(".about-heading");
    const leftBio = this.aboutLeft.nativeElement.querySelector(".about-bio");
    const leftDivider =
      this.aboutLeft.nativeElement.querySelector(".about-divider");

    tl.fromTo(
      leftLabels,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0,
    );

    tl.fromTo(
      leftHeading,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      0.1,
    );

    tl.fromTo(
      leftBio,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      0.2,
    );

    tl.fromTo(
      leftDivider,
      { opacity: 0, scaleX: 0, transformOrigin: "left" },
      { opacity: 1, scaleX: 1, duration: 0.6, ease: "power2.out" },
      0.4,
    );

    // Right panel animations (certifications)
    const rightLabels =
      this.aboutRight.nativeElement.querySelectorAll(".section-label");
    const certCards =
      this.certificationsList?.nativeElement.querySelectorAll(".cert-card");

    tl.fromTo(
      rightLabels,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0,
    );

    if (certCards) {
      tl.fromTo(
        certCards,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "back.out" },
        0.3,
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
