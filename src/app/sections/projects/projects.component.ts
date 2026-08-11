import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  inject,
} from "@angular/core";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@core/models/portfolio.models";
import { AnimationService } from "@core/services/animation.service";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: "app-projects",
  standalone: true,
  imports: [],
  styleUrl: "./projects.component.scss",
  template: `
    <section id="projects" class="projects-section" #projectsSection>
      <div class="projects-content">
        <p class="section-label">Work</p>
        <h2 class="section-heading" #sectionHeading>Selected projects</h2>

        <div class="projects-grid" #projectsGrid>
          @for (project of portfolio.projects; track project; let i = $index) {
            <article
              class="project-card"
              [class.featured]="project.featured"
              #projectCard
            >
              <div class="card-topline">
                <span class="project-index">{{ formatIndex(i) }}</span>
                <span class="project-year">{{ project.year }}</span>
              </div>

              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>

              <div class="project-metrics">
                @for (metric of project.metrics; track metric) {
                  <div class="metric">
                    <span class="metric-value">{{ metric.value }}</span>
                    <span class="metric-label">{{ metric.label }}</span>
                  </div>
                }
              </div>

              <div class="project-footer">
                <div class="tech-tags">
                  @for (tech of project.stack; track tech) {
                    <span class="tech-tag">{{ tech }}</span>
                  }
                </div>
                @if (project.link) {
                  <a
                    [href]="project.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="view-link"
                  >
                    View case study →
                  </a>
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild("projectsSection") projectsSection!: ElementRef;
  @ViewChild("projectsGrid") projectsGrid!: ElementRef;

  portfolio = PORTFOLIO_DATA;

  private scrollTriggers: ScrollTrigger[] = [];

  private readonly animationService = inject(AnimationService);

  formatIndex(index: number): string {
    return String(index + 1).padStart(2, "0");
  }

  ngAfterViewInit(): void {
    if (typeof window === "undefined") return;
    this.initHeadingAnimation();
    this.initCardsAnimation();
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach((trigger) => {
      if (trigger) {
        trigger.kill();
      }
    });
    this.scrollTriggers = [];
  }

  private initHeadingAnimation(): void {
    const trigger = ScrollTrigger.create({
      trigger: this.projectsSection.nativeElement,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          this.projectsSection.nativeElement.querySelectorAll(".section-label"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
          },
        );
        gsap.fromTo(
          this.projectsSection.nativeElement.querySelector(".section-heading"),
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
        );
      },
      invalidateOnRefresh: true,
    });
    this.scrollTriggers.push(trigger);
  }

  private initCardsAnimation(): void {
    if (!this.projectsGrid?.nativeElement) return;

    const cards = Array.from(
      this.projectsGrid.nativeElement.querySelectorAll(".project-card"),
    ) as HTMLElement[];

    const trigger = ScrollTrigger.create({
      trigger: this.projectsSection.nativeElement,
      start: "top 75%",
      once: true,
      onEnter: () => {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.12,
              ease: "power3.out",
            },
          );
        });
      },
      invalidateOnRefresh: true,
    });
    this.scrollTriggers.push(trigger);
  }
}
