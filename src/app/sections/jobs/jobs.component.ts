import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  HostListener,
  QueryList,
  ViewChildren,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { PORTFOLIO_DATA, Job } from "@core/models/portfolio.models";
import { AnimationService } from "@core/services/animation.service";

gsap.registerPlugin(ScrollTrigger, SplitText);

@Component({
  selector: "app-jobs",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./jobs.component.scss",
  template: `
    <section
      class="jobs-section"
      #jobsSection
      [style.--gradient-x]="gradientPos.x + '%'"
      [style.--gradient-y]="gradientPos.y + '%'"
    >
      <!-- Background gradient -->
      <div class="jobs-gradient-bg" #gradientBg></div>

      <div class="jobs-content">
        <!-- Section heading -->
        <h2 class="section-heading" #sectionHeading>
          Cool stuff I've participated
        </h2>

        <!-- Jobs grid -->
        <div class="jobs-grid" #jobsGrid>
          @for (job of portfolio.jobs; track job; let i = $index) {
            <div
              class="job-card"
              [class.right]="i % 2 === 1"
              [class.current]="job.isCurrent"
              #jobCard
            >
              <!-- Timeline line -->
              <div class="timeline-line" #timelineLine></div>
              <!-- Current badge -->
              @if (job.isCurrent) {
                <div class="current-badge">Current</div>
              }
              <!-- Card content -->
              <div class="card-content">
                <!-- Logo section -->
                @if (job.logoUrl) {
                  <div class="logo-container">
                    <img
                      [src]="job.logoUrl"
                      [alt]="job.company + ' logo'"
                      class="company-logo"
                      loading="lazy"
                    />
                  </div>
                }
                <!-- Header -->
                <div class="card-header">
                  <h3 class="company-name">{{ job.company }}</h3>
                  <p class="job-title">{{ job.title }}</p>
                </div>
                <!-- Date range with animated line -->
                <div class="date-section">
                  <p class="date-range">{{ job.period }}</p>
                </div>
                <!-- Body: achievements -->
                <div class="card-body">
                  <ul class="achievements-list">
                    @for (achievement of job.achievements; track achievement) {
                      <li>
                        {{ achievement }}
                      </li>
                    }
                  </ul>
                </div>
                <!-- Footer: tech stack -->
                <div class="card-footer">
                  <div class="tech-tags">
                    @for (tech of job.technologies; track tech) {
                      <span class="tech-tag">
                        {{ tech }}
                      </span>
                    }
                  </div>
                  <!-- View project link -->
                  @if (job.link) {
                    <a
                      [href]="job.link"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="view-link"
                    >
                      View Project →
                    </a>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class JobsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("jobsSection") jobsSection!: ElementRef;
  @ViewChild("sectionHeading") sectionHeading!: ElementRef;
  @ViewChild("jobsGrid") jobsGrid!: ElementRef;
  @ViewChildren("jobCard") jobCards!: QueryList<ElementRef>;
  @ViewChildren("timelineLine") timelineLines!: QueryList<ElementRef>;

  portfolio = PORTFOLIO_DATA;
  gradientPos = { x: 50, y: 50 };

  private splitText: SplitText | null = null;
  private jobsTweens: gsap.core.Tween[] = [];

  constructor(
    private animationService: AnimationService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Initialization if needed
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.initHeadingAnimation();
    this.initCardsAnimation();
    // Refresh ScrollTrigger to detect all animations after view initialization
    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    this.killAnimations();
    if (this.splitText) {
      this.splitText.revert();
    }
  }

  /**
   * Initialize section heading animation with SplitText
   */
  private initHeadingAnimation(): void {
    if (!this.sectionHeading) return;

    this.splitText = new SplitText(this.sectionHeading.nativeElement, {
      type: "words",
      wordsClass: "word",
    });

    gsap.to(this.sectionHeading.nativeElement, {
      scrollTrigger: {
        trigger: this.jobsSection.nativeElement,
        start: "top 80%",
        toggleActions: "play none none none",
        invalidateOnRefresh: true,
      },
      duration: 0,
      onStart: () => {
        if (this.splitText) {
          gsap.fromTo(
            this.splitText.words,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.8,
              ease: "power2.out",
            },
          );
        }
      },
    });
  }

  /**
   * Initialize job cards animation
   */
  private initCardsAnimation(): void {
    if (!this.jobsGrid || !this.jobCards) return;

    const cardElements = this.jobCards
      .toArray()
      .map((ref) => ref.nativeElement);
    const timelineLineElements = this.timelineLines
      .toArray()
      .map((ref) => ref.nativeElement);

    gsap.to(this.jobsGrid.nativeElement, {
      scrollTrigger: {
        trigger: this.jobsSection.nativeElement,
        start: "top 80%",
        toggleActions: "play none none none",
        invalidateOnRefresh: true,
      },
      duration: 0,
      onStart: () => {
        // Animate cards in from opposite sides
        cardElements.forEach((card: HTMLElement, index: number) => {
          const isRight = index % 2 === 1;
          const direction = isRight ? 100 : -100;

          const tween = gsap.fromTo(
            card,
            { opacity: 0, x: direction },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "cubic.inOut",
              delay: index * 0.15,
            },
          );

          this.jobsTweens.push(tween);

          // Animate timeline line after card enters
          if (timelineLineElements[index]) {
            gsap.to(timelineLineElements[index], {
              opacity: 1,
              scaleY: 1,
              duration: 0.6,
              ease: "power2.out",
              delay: index * 0.15 + 0.4,
            });
          }

          // Stagger reveal of internal elements on hover
          card.addEventListener("mouseenter", () => {
            const header = card.querySelector(".card-header");
            const title = card.querySelector(".job-title");
            const dateSection = card.querySelector(".date-section");
            const listItems = card.querySelectorAll(".achievements-list li");
            const footer = card.querySelector(".card-footer");

            const elements = [
              header,
              title,
              dateSection,
              ...Array.from(listItems),
              footer,
            ].filter(Boolean);

            gsap.to(elements, {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.4,
              ease: "power2.out",
            });
          });
        });
      },
    });
  }

  /**
   * Initialize mouse tracking for diagonal gradient shift
   */
  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent): void {
    if (!this.jobsSection) return;

    const rect = this.jobsSection.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate percentage within the section
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    // Constrain to 45-55% range for subtle effect (10% range)
    const constrainedX = 45 + (xPercent * 10) / 100;
    const constrainedY = 45 + (yPercent * 10) / 100;

    this.gradientPos = { x: constrainedX, y: constrainedY };
  }

  /**
   * Clean up animations
   */
  private killAnimations(): void {
    this.jobsTweens.forEach((tween) => tween.kill());
    this.jobsTweens = [];
  }
}
