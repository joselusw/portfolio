import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollService } from "../../core/services/scroll.service";
import { AnimationService } from "../../core/services/animation.service";

gsap.registerPlugin(ScrollTrigger);

interface TechItem {
  name: string;
  icon: string;
  size: "sm" | "md" | "lg";
  cluster: number;
}

@Component({
  selector: "app-tech",
  standalone: true,
  imports: [CommonModule],
  styleUrl: "./tech.component.scss",
  template: `
    <section
      id="tech"
      class="relative w-full min-h-screen flex items-center justify-center py-12"
      style="background-color: var(--color-bg);"
      #section
    >
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute top-1/3 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-30"
        ></div>
        <div
          class="absolute bottom-1/3 -left-32 w-96 h-96 bg-accent-2/5 rounded-full blur-3xl opacity-20"
        ></div>
      </div>

      <div class="relative z-10 w-full max-w-6xl px-6 lg:px-12">
        <div class="text-center mb-20">
          <h2
            #heading
            class="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
            style="color: var(--color-text-primary);"
          >
            Tech Stack
          </h2>
          <p
            class="text-lg font-mono tracking-wide"
            style="color: var(--color-text-muted);"
          >
            Technologies I work with
          </p>
        </div>

        <div class="tech-masonry" #gridContainer>
          <div
            *ngFor="let tech of techs; let i = index"
            class="tech-tile"
            [class.size-sm]="tech.size === 'sm'"
            [class.size-md]="tech.size === 'md'"
            [class.size-lg]="tech.size === 'lg'"
            [attr.data-index]="i"
            [attr.data-cluster]="tech.cluster"
          >
            <div class="tech-tile-inner">
              <img
                class="tech-logo"
                [src]="'https://cdn.simpleicons.org/' + tech.icon + '/c9a96e'"
                [alt]="tech.name"
                loading="lazy"
              />
              <p class="tech-label font-mono text-xs tracking-widest">
                {{ tech.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class TechComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("section") section!: ElementRef;
  @ViewChild("heading") heading!: ElementRef;
  @ViewChild("gridContainer") gridContainer!: ElementRef;

  private scrollTriggers: ScrollTrigger[] = [];

  techs: TechItem[] = [
    { name: ".NET", icon: "dotnet", size: "lg", cluster: 1 },
    { name: "Angular", icon: "angular", size: "lg", cluster: 1 },
    { name: "Semantic Kernel", icon: "probot", size: "md", cluster: 1 },
    { name: "C#", icon: "sharp", size: "md", cluster: 1 },
    { name: ".NET", icon: "dotnet", size: "md", cluster: 1 },
    { name: "LLM Integration", icon: "openaigym", size: "md", cluster: 1 },
    { name: "RAG", icon: "googlegemini", size: "sm", cluster: 1 },

    { name: "AWS", icon: "icloud", size: "lg", cluster: 2 },
    { name: "Docker", icon: "docker", size: "lg", cluster: 2 },
    { name: "Kubernetes", icon: "kubernetes", size: "md", cluster: 2 },
    { name: "Terraform", icon: "terraform", size: "md", cluster: 2 },
    { name: "Kafka", icon: "apachekafka", size: "md", cluster: 2 },
    { name: "OpenTelemetry", icon: "opentelemetry", size: "sm", cluster: 2 },
  ];

  constructor(
    private scrollService: ScrollService,
    private animationService: AnimationService,
  ) {}

  ngOnInit(): void {
    // Initialization if needed
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.initAnimations());
  }

  ngOnDestroy(): void {
    // Kill ScrollTriggers
    this.scrollTriggers.forEach((trigger) => {
      if (trigger) {
        trigger.kill();
      }
    });
    this.scrollTriggers = [];

    // Clear all properties on tiles
    gsap.set(".tech-tile", { clearProps: "all" });
  }

  private initAnimations(): void {
    if (!this.section?.nativeElement) return;
    this.animateTiles();
    this.setupParallax();
  }

  private animateTiles(): void {
    if (!this.gridContainer?.nativeElement) return;

    const tiles =
      this.gridContainer.nativeElement.querySelectorAll(".tech-tile");

    tiles.forEach((tile: HTMLElement, index: number) => {
      gsap.set(tile, { opacity: 0, scale: 0.6 });

      const trigger = ScrollTrigger.create({
        trigger: tile,
        start: "top 90%",
        end: "top 50%",
        onEnter: () => {
          gsap.to(tile, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.05,
            ease: "back.out(1.4)",
          });
        },
        once: true,
      });

      this.scrollTriggers.push(trigger);
    });
  }

  private setupParallax(): void {
    if (
      !this.gridContainer?.nativeElement ||
      !this.animationService.shouldApplyParallax()
    )
      return;

    const tiles = Array.from(
      this.gridContainer.nativeElement.querySelectorAll(".tech-tile"),
    ) as HTMLElement[];

    tiles.forEach((tile, index) => {
      const row = Math.floor(index / 5);
      const speed = row % 2 === 0 ? 0.95 : 1.05;

      const trigger = gsap.to(tile, {
        scrollTrigger: {
          trigger: this.section?.nativeElement,
          start: "top center",
          onUpdate: (self) => {
            gsap.set(tile, { y: self.getVelocity() * speed * 0.02 });
          },
        },
        duration: 1,
      });

      // Track ScrollTrigger for cleanup
      if (trigger.scrollTrigger) {
        this.scrollTriggers.push(trigger.scrollTrigger);
      }
    });
  }
}
