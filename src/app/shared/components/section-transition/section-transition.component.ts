import {
  Component,
  Input,
  ContentChild,
  TemplateRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: "app-section-transition",
  standalone: true,
  imports: [CommonModule],
  styleUrl: "./section-transition.component.scss",
  template: `
    <section class="section-transition" #section>
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </section>
  `,
})
export class SectionTransitionComponent implements AfterViewInit {
  @Input() parallaxSpeed: number = 0.5;
  @Input() enableParallax: boolean = true;
  @ContentChild("content") content!: TemplateRef<any>;
  @ViewChild("section") section!: ElementRef;

  ngAfterViewInit(): void {
    if (this.enableParallax && this.section) {
      this.initParallax();
    }
  }

  private initParallax(): void {
    const sectionElement = this.section.nativeElement;

    gsap.to(sectionElement, {
      y: () => window.innerHeight * this.parallaxSpeed * -1,
      scrollTrigger: {
        trigger: sectionElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        markers: false,
      },
    });
  }
}
