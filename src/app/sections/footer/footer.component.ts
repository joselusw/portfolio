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
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { PORTFOLIO_DATA, SocialLink } from "../../core/models/portfolio.models";
import { AnimationService } from "../../core/services/animation.service";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [],
  styleUrl: "./footer.component.scss",
  template: `
    <footer
      id="footer"
      class="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24"
      style="background-color: var(--color-surface);"
      #footerSection
    >
      <div
        class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        #borderLine
      ></div>

      <div
        class="relative z-10 w-full max-w-4xl mx-auto px-0 sm:px-2 lg:px-12 flex flex-col items-center justify-center flex-1"
      >
        <div class="mb-10 sm:mb-12 lg:mb-16 text-center">
          <h2
            #heading
            class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-4 sm:mb-6"
            style="color: var(--color-text-primary);"
          >
            Let's build something remarkable.
          </h2>

          <div
            class="flex justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12"
          >
            <div
              class="h-px flex-grow bg-gradient-to-r from-transparent to-accent/30"
            ></div>
            <span class="text-accent-2 text-xl">●</span>
            <div
              class="h-px flex-grow bg-gradient-to-l from-transparent to-accent/30"
            ></div>
          </div>
        </div>

        <div
          class="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20"
          #contactContainer
        >
          @for (social of portfolio.social; track social) {
            <a
              [href]="getLinkUrl(social)"
              [target]="getLinkTarget(social)"
              rel="noopener noreferrer"
              class="contact-link group relative min-h-[44px] min-w-[112px] px-4 py-3 sm:min-w-[120px] sm:px-5 sm:py-4"
              [title]="social.name"
              [attr.aria-label]="'Visit my ' + social.name + ' profile'"
            >
              <span class="contact-icon">{{ getIcon(social.icon) }}</span>
              <span class="contact-text font-mono text-xs tracking-widest">{{
                social.name
              }}</span>
            </a>
          }
        </div>
      </div>

      <div class="relative z-10 w-full border-t border-accent/10 py-6">
        <div
          class="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
        >
          <p class="font-mono text-xs text-text-muted">
            © {{ currentYear }} {{ portfolio.name }}. All rights reserved.
          </p>
          <p class="font-mono text-xs text-text-muted">
            Designed & built with Angular + GSAP
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  @ViewChild("heading") heading!: ElementRef;
  @ViewChild("contactContainer") contactContainer!: ElementRef;
  @ViewChild("borderLine") borderLine!: ElementRef;
  @ViewChild("footerSection") footerSection!: ElementRef;

  portfolio = PORTFOLIO_DATA;
  currentYear = new Date().getFullYear();
  private scrollTriggers: ScrollTrigger[] = [];

  private readonly animationService = inject(AnimationService);

  ngAfterViewInit(): void {
    if (typeof window === "undefined") return;
    requestAnimationFrame(() => this.initAnimations());
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach((trigger) => trigger.kill());
  }

  getIcon(icon: string): string {
    const icons: { [key: string]: string } = {
      github: "{ }",
      linkedin: "in",
      cv: "CV",
      mail: "@",
    };
    return icons[icon] || "?";
  }

  getLinkUrl(social: SocialLink): string {
    return social.url;
  }

  getLinkTarget(social: SocialLink): string {
    return social.url.startsWith("mailto") ? "_self" : "_blank";
  }

  private initAnimations(): void {
    // Set start states in JS (not CSS) so content stays visible without scripts
    gsap.set(this.heading.nativeElement, { opacity: 0, y: 36 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.footerSection.nativeElement,
        start: "top 85%",
        once: true,
        invalidateOnRefresh: true,
      },
      defaults: {
        ease: "power3.out",
      },
    });

    tl.fromTo(
      this.borderLine.nativeElement,
      { scaleX: 0, opacity: 0, transformOrigin: "center" },
      { scaleX: 1, opacity: 1, duration: 0.9 },
    ).fromTo(
      this.heading.nativeElement,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 1.1 },
      0.15,
    );

    this.animateContactLinks(tl);
  }

  private animateContactLinks(parentTimeline: gsap.core.Timeline): void {
    if (!this.contactContainer?.nativeElement) return;
    const links =
      this.contactContainer.nativeElement.querySelectorAll(".contact-link");

    gsap.set(links, { opacity: 0, y: 18 });

    links.forEach((link: HTMLElement, index: number) => {
      parentTimeline.fromTo(
        link,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        },
        0.5 + index * 0.08,
      );
    });
  }
}
