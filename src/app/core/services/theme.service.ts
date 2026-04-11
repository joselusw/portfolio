import { Injectable, signal } from '@angular/core';

type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = signal<Theme>('dark');

  constructor() {
    this.initTheme();
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  private initTheme(): void {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) {
      this.setTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(prefersDark ? 'dark' : 'light');
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
    
    if (typeof window === 'undefined') return;

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update CSS custom properties based on theme
    this.updateThemeVariables(theme);
  }

  /**
   * Toggle between dark and light themes
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * Update CSS custom properties based on theme
   */
  private updateThemeVariables(theme: Theme): void {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.style.setProperty('--color-bg', '#0a0a0a');
      root.style.setProperty('--color-surface', '#111111');
      root.style.setProperty('--color-surface-2', '#1a1a1a');
      root.style.setProperty('--color-text-primary', '#f0ede8');
      root.style.setProperty('--color-text-muted', '#6b6b6b');
    } else {
      root.style.setProperty('--color-bg', '#ffffff');
      root.style.setProperty('--color-surface', '#f5f5f5');
      root.style.setProperty('--color-surface-2', '#efefef');
      root.style.setProperty('--color-text-primary', '#1a1a1a');
      root.style.setProperty('--color-text-muted', '#757575');
    }
  }
}
