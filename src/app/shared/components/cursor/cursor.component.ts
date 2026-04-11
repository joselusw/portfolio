import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import gsap from "gsap";

@Component({
  selector: "app-cursor",
  standalone: true,
  imports: [CommonModule],
  styleUrl: "./cursor.component.scss",
  template: `
    <div class="cursor" #cursor>
      <div class="cursor-inner" #cursorInner></div>
    </div>
  `,
})
export class CursorComponent implements OnInit, OnDestroy {
  @ViewChild("cursor") cursor!: ElementRef;
  @ViewChild("cursorInner") cursorInner!: ElementRef;

  private cursorPos = { x: 0, y: 0 };
  private mousePos = { x: 0, y: 0 };
  private isHovering = false;
  private animationFrame: number | null = null;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initCursor();
  }

  ngOnDestroy(): void {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
    }
    document.removeEventListener("mousemove", (e) => this.onMouseMove(e));
  }

  private initCursor(): void {
    if (typeof window === "undefined") {
      return;
    }

    // Hide default cursor
    document.body.style.cursor = "none";

    // Track mouse movement
    document.addEventListener("mousemove", (e) => this.onMouseMove(e));

    // Detect hoverable elements
    document.addEventListener("mouseover", (e) => {
      const target = e.target as HTMLElement;
      if (this.isHoverable(target)) {
        this.isHovering = true;
        this.updateCursorStyle();
      }
    });

    document.addEventListener("mouseout", (e) => {
      const target = e.target as HTMLElement;
      if (this.isHoverable(target)) {
        this.isHovering = false;
        this.updateCursorStyle();
      }
    });

    // Animate cursor position
    this.animateCursor();
  }

  private onMouseMove(event: MouseEvent): void {
    this.mousePos = { x: event.clientX, y: event.clientY };
  }

  private animateCursor(): void {
    this.animationFrame = requestAnimationFrame(() => {
      // Smooth follow with lag
      this.cursorPos.x += (this.mousePos.x - this.cursorPos.x) * 0.2;
      this.cursorPos.y += (this.mousePos.y - this.cursorPos.y) * 0.2;

      gsap.set(this.cursor.nativeElement, {
        x: this.cursorPos.x,
        y: this.cursorPos.y,
      });

      this.animateCursor();
    });
  }

  private updateCursorStyle(): void {
    const element = this.cursor.nativeElement;
    if (this.isHovering) {
      this.renderer.addClass(element, "active");
    } else {
      this.renderer.removeClass(element, "active");
    }
  }

  private isHoverable(element: HTMLElement): boolean {
    const hoverableSelectors = [
      "a",
      "button",
      '[role="button"]',
      'input[type="button"]',
      'input[type="submit"]',
      'input[type="checkbox"]',
      'input[type="radio"]',
      "select",
      "textarea",
      'input[type="text"]',
    ];

    return hoverableSelectors.some((selector) => {
      return element.matches?.(selector) || element.closest?.(selector);
    });
  }
}
