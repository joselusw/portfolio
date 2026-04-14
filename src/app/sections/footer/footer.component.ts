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
    this.animateBorderLine();
    this.animateStatement();
    this.animateContactLinks();
  }

  private animateBorderLine(): void {
    if (!this.borderLine?.nativeElement) return;
    const line = this.borderLine.nativeElement;

    const trigger = ScrollTrigger.create({
      trigger: line,
      start: "top 90%",
      end: "top 70%",
      onEnter: () => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "center", opacity: 0 },
          { opacity: 1, scaleX: 1, duration: 1, ease: "power2.inOut" },
        );
      },
      once: true,
      invalidateOnRefresh: true,
    });
    this.scrollTriggers.push(trigger);
  }

  private animateStatement(): void {
    if (!this.statement?.nativeElement) return;
    const text = new SplitText(this.statement.nativeElement, {
      type: "words",
      linesClass: "statement-line",
    });

    const trigger = ScrollTrigger.create({
      trigger: this.statement.nativeElement,
      start: "top 80%",
      end: "top 30%",
      onEnter: () => {
        gsap.to(text.words, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        });
      },
      once: true,
      invalidateOnRefresh: true,
    });

    gsap.set(text.words, { opacity: 0, y: 40 });
    this.scrollTriggers.push(trigger);
  }

  private animateContactLinks(): void {
    if (!this.contactContainer?.nativeElement) return;
    const links =
      this.contactContainer.nativeElement.querySelectorAll(".contact-link");

    links.forEach((link: HTMLElement, index: number) => {
      const trigger = ScrollTrigger.create({
        trigger: link,
        start: "top 85%",
        end: "top 50%",
        onEnter: () => {
          gsap.fromTo(
            link,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.08,
              ease: "power2.out",
            },
          );
        },
        once: true,
        invalidateOnRefresh: true,
      });
      this.scrollTriggers.push(trigger);
    });
  }
}
