import { Injectable, signal } from "@angular/core";

type Theme = "dark" | "light";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private currentTheme = signal<Theme>("dark");

  constructor() {
    this.initTheme();
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  private initTheme(): void {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      this.setTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    this.setTheme(prefersDark ? "dark" : "light");
  }

  /**
   * Get current theme signal
   */
  getTheme() {
    return this.currentTheme.asReadonly();
  }

  /**
   * Set theme and update DOM/localStorage
   */
  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);

    if (typeof window === "undefined") return;

    // CSS custom properties are the single source of truth for both themes:
    // dark is defined in styles.scss :root, light in the [data-theme="light"]
    // block. The attribute here is what activates the light theme.
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    this.updateMetaThemeColor(theme);
  }

  /**
   * Toggle between dark and light themes
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme() === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
  }

  /**
   * Keep the browser chrome (mobile address bar) in sync with the theme
   */
  private updateMetaThemeColor(theme: Theme): void {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    meta.setAttribute("content", theme === "dark" ? "#0a0a0a" : "#f8f7f5");
  }
}
