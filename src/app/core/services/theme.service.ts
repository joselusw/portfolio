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

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update CSS custom properties based on theme
    this.updateThemeVariables(theme);
  }

  /**
   * Toggle between dark and light themes
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme() === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
  }

  /**
   * Update CSS custom properties based on theme
   */
  private updateThemeVariables(theme: Theme): void {
    const root = document.documentElement;

    if (theme === "dark") {
      root.style.setProperty("--color-bg", "#0a0a0a");
      root.style.setProperty("--color-surface", "#111111");
      root.style.setProperty("--color-surface-2", "#1a1a1a");
      root.style.setProperty("--color-accent", "#e8e0d4");
      root.style.setProperty("--color-accent-2", "#c9a96e");
      root.style.setProperty("--color-text-primary", "#f0ede8");
      root.style.setProperty("--color-text-muted", "#6b6b6b");
      root.style.setProperty(
        "--color-accent-2-12",
        "rgba(201, 169, 110, 0.12)",
      );
      root.style.setProperty(
        "--color-accent-2-08",
        "rgba(201, 169, 110, 0.08)",
      );
      root.style.setProperty(
        "--color-accent-2-15",
        "rgba(201, 169, 110, 0.15)",
      );
      root.style.setProperty("--color-accent-2-20", "rgba(201, 169, 110, 0.2)");
      root.style.setProperty(
        "--color-accent-2-25",
        "rgba(201, 169, 110, 0.25)",
      );
      root.style.setProperty("--color-accent-2-30", "rgba(201, 169, 110, 0.3)");
      root.style.setProperty("--color-accent-2-10", "rgba(160, 115, 42, 0.1)");
      root.style.setProperty(
        "--color-accent-light-12",
        "rgba(160, 115, 42, 0.12)",
      );
      root.style.setProperty(
        "--color-accent-light-18",
        "rgba(160, 115, 42, 0.18)",
      );
      root.style.setProperty("--color-accent-08", "rgba(232, 224, 212, 0.08)");
      root.style.setProperty("--color-accent-10", "rgba(232, 224, 212, 0.1)");
      root.style.setProperty("--color-accent-20", "rgba(232, 224, 212, 0.2)");
      root.style.setProperty("color-scheme", "dark");
    } else {
      // Light theme - 2026 warm standards with sophisticated shadows
      root.style.setProperty("--color-bg", "#faf9f4");
      root.style.setProperty("--color-surface", "#ffffff");
      root.style.setProperty("--color-surface-2", "#f0ebe3");
      root.style.setProperty("--color-accent", "#6b5344");
      root.style.setProperty("--color-accent-2", "#997d6b");
      root.style.setProperty("--color-text-primary", "#1f1a16");
      root.style.setProperty("--color-text-muted", "#7a6f68");
      root.style.setProperty(
        "--color-accent-2-12",
        "rgba(153, 125, 107, 0.12)",
      );
      root.style.setProperty(
        "--color-accent-2-08",
        "rgba(153, 125, 107, 0.08)",
      );
      root.style.setProperty(
        "--color-accent-2-15",
        "rgba(153, 125, 107, 0.15)",
      );
      root.style.setProperty("--color-accent-2-20", "rgba(153, 125, 107, 0.2)");
      root.style.setProperty(
        "--color-accent-2-25",
        "rgba(153, 125, 107, 0.25)",
      );
      root.style.setProperty("--color-accent-2-30", "rgba(153, 125, 107, 0.3)");
      root.style.setProperty("--color-accent-2-10", "rgba(107, 83, 68, 0.1)");
      root.style.setProperty(
        "--color-accent-light-12",
        "rgba(107, 83, 68, 0.12)",
      );
      root.style.setProperty(
        "--color-accent-light-18",
        "rgba(107, 83, 68, 0.18)",
      );
      root.style.setProperty("--color-accent-08", "rgba(107, 83, 68, 0.08)");
      root.style.setProperty("--color-accent-10", "rgba(107, 83, 68, 0.1)");
      root.style.setProperty("--color-accent-20", "rgba(107, 83, 68, 0.2)");
      // Light theme shadow system with warm-tinted depth
      root.style.setProperty(
        "--shadow-xs",
        "0 1px 2px rgba(107, 83, 68, 0.05)",
      );
      root.style.setProperty(
        "--shadow-sm",
        "0 2px 4px rgba(107, 83, 68, 0.08)",
      );
      root.style.setProperty(
        "--shadow-md",
        "0 4px 8px rgba(107, 83, 68, 0.10)",
      );
      root.style.setProperty(
        "--shadow-lg",
        "0 8px 16px rgba(107, 83, 68, 0.12)",
      );
      root.style.setProperty(
        "--shadow-xl",
        "0 12px 32px rgba(107, 83, 68, 0.15)",
      );
      root.style.setProperty("color-scheme", "light");
    }
  }
}
