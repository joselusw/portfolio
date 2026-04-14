import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import gsap from "gsap";

@Component({
  selector: "app-noise-overlay",
  standalone: true,
  imports: [],
  styleUrl: "./noise-overlay.component.scss",
  template: `
    <svg
      class="noise-overlay"
      #noiseOverlay
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      [attr.viewBox]="'0 0 ' + width + ' ' + height"
    >
      <defs>
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            result="noise"
            seed="2"
          />
          <feColorMatrix in="noise" type="saturate" values="0" />
          <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
        </filter>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="rgba(0,0,0,0.03)"
        filter="url(#noise-filter)"
      />
    </svg>
  `,
})
export class NoiseOverlayComponent implements OnInit {
  @ViewChild("noiseOverlay") noiseOverlay!: ElementRef;
  width = 1920;
  height = 1080;

  ngOnInit(): void {
    this.initNoise();
  }

  private initNoise(): void {
    if (typeof window === "undefined") {
      return;
    }

    // Subtle animation of opacity for living texture effect
    gsap.to(this.noiseOverlay.nativeElement, {
      opacity: 0.6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Update dimensions on resize
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    });
  }
}
