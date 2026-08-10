# Portfolio

An SEO-optimized Angular 22 portfolio with GSAP animations, TailwindCSS v4 styling, and smooth scroll interactions.

## Features

- ✨ **Static Site Generation (SSG)** – Prerendered HTML for optimal Core Web Vitals
- 🎨 **GSAP Animations** – ScrollTrigger, parallax effects, and smooth interactions
- 🎯 **Angular Signals** – Modern state management without RxJS overhead
- 📱 **Responsive Design** – TailwindCSS v4 with custom design tokens
- ♿ **Accessibility** – WCAG 2.1 compliant with focus management
- 🚀 **Performance** – Lazy loaded sections, optimized images, fast LCP
- 🎨 **Dark/Light Theme** – System preference detection with persistent storage
- 🖇️ **Custom Cursor** – Animated cursor that morphs on interactive elements
- 🔗 **Smooth Scroll** – Lenis integration for butter-smooth scroll behavior
- 📊 **Progress Indicator** – Visual scroll progress bar

## Tech Stack

- **Framework**: Angular 22 (standalone components only, zoneless change detection)
- **Styling**: TailwindCSS v4 + SCSS
- **Animations**: GSAP v3 with ScrollTrigger and SplitText plugins
- **Smooth Scroll**: Lenis
- **State Management**: Angular Signals
- **Rendering**: Static Site Generation with Prerendering
- **Language**: TypeScript 6.0

## Getting Started

### Prerequisites

- Node.js 22+ (LTS recommended)
- npm 10+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production (SSG with prerendering)
npm run build:prod
```

### Development

```bash
# Watch mode (incremental builds)
ng build --watch --configuration development

# Test
npm test

# Run linter
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── constants/
│   │   │   └── animation.constants.ts   # GSAP durations & easings
│   │   ├── services/
│   │   │   ├── animation.service.ts     # Reduced-motion aware animation configs
│   │   │   ├── scroll.service.ts        # GSAP ScrollTrigger wrapper
│   │   │   └── theme.service.ts         # Dark/light mode management
│   │   └── models/
│   │       └── portfolio.models.ts      # All data interfaces
│   ├── shared/
│   │   └── components/
│   │       └── noise-overlay/           # SVG noise texture
│   ├── sections/
│   │   ├── cover/                       # Hero section
│   │   ├── about-me/                    # About section
│   │   ├── jobs/                        # Experience timeline
│   │   ├── tech/                        # Technology showcase
│   │   └── footer/                      # Footer with links
│   ├── app.component.ts                 # Root layout with Lenis
│   ├── app.config.ts                    # App configuration (zoneless + hydration)
│   ├── app.config.server.ts             # Server rendering config
│   └── app.routes.server.ts             # Server route render modes (prerender)
├── index.html                           # SEO meta tags and fonts
├── main.ts                              # Browser entry point
├── main.server.ts                       # Server (prerender) entry point
└── styles.scss                          # Global styles & design tokens
```

## Design System

### Colors
- **Background**: `#0a0a0a` (near-black)
- **Surface**: `#111111`
- **Surface 2**: `#1a1a1a`
- **Accent**: `#e8e0d4` (warm off-white)
- **Accent 2**: `#c9a96e` (gold)
- **Text Primary**: `#f0ede8`
- **Text Muted**: `#6b6b6b`

### Typography
- **Display**: Playfair Display (headings)
- **Body**: Inter (body text)
- **Mono**: JetBrains Mono (code/tech labels)

## Performance Optimization

### Core Web Vitals Strategy
✓ **LCP** (Largest Contentful Paint) < 2.5s
- Static HTML prerendered at build time
- Font preconnects in index.html
- Hero image uses `NgOptimizedImage` with known aspect ratios

✓ **FID/INP** (Interaction to Next Paint) < 100ms
- Zoneless change detection (no zone.js overhead)
- Minimal JavaScript after hydration
- GSAP animations use GPU acceleration

✓ **CLS** (Cumulative Layout Shift) < 0.1
- All images have reserved space (known dimensions)
- No late-injected fonts or ads
- CSS-in-JS avoided (only compiled TailwindCSS)

### Build Optimization
- Tree-shaking removes unused code
- Single-page static bundle (no routing)
- Images optimized with `@angular/common` NgOptimizedImage
- SCSS minified in production
- No external tracking or analytics scripts

## SEO Best Practices

✓ **Meta Tags** – Open Graph, Twitter Card, structured data placeholders
✓ **Semantic HTML** – Proper heading hierarchy, alt text on images
✓ **Mobile Friendly** – Responsive design, touch-friendly controls
✓ **Accessibility** – WCAG 2.1 AA compliant
✓ **Performance** – Google PageSpeed Insights optimized

## Customization

### Add Your Portfolio Data
Edit `src/app/core/models/portfolio.models.ts` and update `PORTFOLIO_DATA`:
```typescript
export const PORTFOLIO_DATA: Portfolio = {
  name: 'Your Name',
  title: 'Your Title',
  bio: 'Your bio...',
  // ... rest of data
};
```

### Modify Design Tokens
Update CSS custom properties in `src/styles.scss` `:root` block:
```scss
:root {
  --color-bg: #0a0a0a;
  --color-accent: #e8e0d4;
  // ... etc
}
```

### Add New Sections
1. Create component in `src/app/sections/your-section/`
2. Import into `app.component.ts`
3. Add to main template

## Deployment

### Static Hosting (Netlify, Vercel, etc.)
```bash
npm run build:prod
# Deploy the dist/portfolio/browser folder
```

### Environment-Specific Builds
```bash
# Production
ng build --configuration production

# Staging
ng build --configuration staging
```

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari 14+
- Edge (latest 2 versions)

## License

MIT License – Feel free to use this as a template for your portfolio.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue on the repository.

---

Built with ❤️ using Angular 22, GSAP, TailwindCSS, and modern web technologies.
