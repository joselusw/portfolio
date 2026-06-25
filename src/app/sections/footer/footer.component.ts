import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
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
      class="relative min-h-screen flex flex-col items-center justify-center py-24"
      style="background-color: var(--color-surface);"
      #footerSection
    >
      <div
        class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        #borderLine
      ></div>

      <div
        class="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center flex-1"
      >
        <div class="mb-16 text-center">
          <h2
            #statement
            class="footer-statement font-display font-bold mb-8"
            style="font-size: clamp(3rem, 8vw, 7rem);"
          >
            Let's build something remarkable.
          </h2>

          <div class="flex justify-center items-center gap-6 mb-12">
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
          class="flex flex-wrap justify-center gap-8 md:gap-12 mb-20"
          #contactContainer
        >
          @for (social of portfolio.social; track social) {
            <a
              [href]="getLinkUrl(social)"
              [target]="getLinkTarget(social)"
              rel="noopener noreferrer"
              class="contact-link group relative"
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
export class FooterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("statement") statement!: ElementRef;
  @ViewChild("contactContainer") contactContainer!: ElementRef;
  @ViewChild("borderLine") borderLine!: ElementRef;
  @ViewChild("footerSection") footerSection!: ElementRef;

  portfolio = PORTFOLIO_DATA;
  currentYear = new Date().getFullYear();
  private scrollTriggers: ScrollTrigger[] = [];

  constructor(private animationService: AnimationService) {}

  ngOnInit(): void {
    // Initialization if needed
  }

  ngAfterViewInit(): void {
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
      this.statement.nativeElement,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 1.1 },
      0.15,
    );

    this.animateContactLinks(tl);
  }

  private animateBorderLine(): void {
    // preserved for compatibility but not used in the main timeline
  }

  private animateStatement(): void {
    // preserved for compatibility but replaced by initAnimations timeline
  }

  private animateContactLinks(parentTimeline: gsap.core.Timeline): void {
    if (!this.contactContainer?.nativeElement) return;
    const links =
      this.contactContainer.nativeElement.querySelectorAll(".contact-link");

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
