# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern personal navigation site (乱红如雨的个人站点) built with Next.js 14, providing:
- Tag-based website navigation with 3000+ curated links
- Multi-engine search aggregation functionality
- Full-text search with keyboard shortcuts (⌘K)
- Modern, minimalist design with glass morphism effects
- SEO-optimized with static generation

## Development Commands

### Development Server
```bash
# Start development server with hot reload
npm run dev
# Runs on http://localhost:3000 (or next available port)
```

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Linting
```bash
npm run lint
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Search**: Fuse.js (fuzzy search)
- **Animation**: Framer Motion
- **Utilities**: clsx, tailwind-merge

## Architecture & Structure

### Directory Structure
```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page (client component)
│   ├── search/            # Aggregated search page
│   ├── random/            # Random website discovery
│   ├── about/             # About page
│   ├── sitemap.ts         # Dynamic sitemap generation
│   ├── robots.ts          # Robots.txt configuration
│   └── globals.css        # Global styles with CSS variables
├── components/
│   ├── ui/                # UI components
│   │   ├── website-card.tsx
│   │   └── tag-filter.tsx
│   └── shared/            # Shared components
│       ├── header.tsx
│       ├── footer.tsx
│       └── search-bar.tsx  # ⌘K search modal
├── lib/                   # Utilities and data processing
│   ├── types.ts          # TypeScript type definitions
│   ├── data.ts           # Data loading and processing
│   ├── search.ts         # Search implementation (Fuse.js)
│   └── utils.ts          # Utility functions
├── data/                  # JSON data files
│   ├── websites.json     # Website navigation data
│   └── search-engines.json  # Search engine configurations
└── public/               # Static assets
```

### Core Data Files
- `data/websites.json` - Website navigation data with tag-based categorization
- `data/search-engines.json` - Search engine configurations for aggregation

## Key Features

### 1. Tag Navigation System
- Client-side tag filtering with URL state management
- Automatic tag extraction and counting
- Popular tags display (configurable limit)
- URL parameter support: `/?tag=技术`

### 2. Full-Text Search (⌘K)
- Global keyboard shortcut (⌘K / Ctrl+K)
- Fuzzy search across title, tags, description, URL
- Keyboard navigation (Arrow keys, Enter, Escape)
- Real-time results with highlighting

### 3. Aggregated Search
- Multiple search engines organized by categories
- Template URL substitution with `${query}` placeholder
- One-click search across different providers

### 4. Random Discovery ("任意门")
- Random website recommendation
- Smooth animations and transitions
- Quick access to random exploration

## Data Structures

### Website Data Format
```typescript
interface Website {
  url: string;          // Full URL (must be valid)
  title: string;        // Display name
  tags: string;         // Space-separated tags
  description?: string; // Optional description
}
```

### Search Engine Format
```json
{
  "tag": "Category Name",
  "list": [
    {
      "title": "Engine Name",
      "url": "https://engine.com/search?q=${query}"
    }
  ]
}
```

## Styling System

### CSS Variables (Dark Theme)
```css
--background: 10 10% 4%
--foreground: 0 0% 98%
--primary: 217 91% 60%     /* Blue */
--accent: 262 83% 58%      /* Purple */
--muted: 0 0% 15%
--border: 0 0% 20%
```

### Custom Classes
- `.glass` - Glass morphism effect (backdrop-blur + transparent bg)
- `.gradient-text` - Primary to accent gradient text
- `.transition-smooth` - Smooth transitions (300ms ease-in-out)
- `.scrollbar-hide` - Hide scrollbars

## SEO Optimization

### Static Generation
- All pages are pre-rendered at build time
- Metadata configured in `app/layout.tsx`
- Dynamic sitemap generation at `app/sitemap.ts`
- Robots.txt configuration at `app/robots.ts`

### Metadata
- Open Graph tags for social sharing
- Twitter Card support
- Schema.org structured data
- Canonical URLs

## Development Notes

### Data Validation
- **IMPORTANT**: All URLs in `data/websites.json` must be valid
- URLs must start with `http://` or `https://`
- Invalid URLs will cause build errors

### Client vs Server Components
- Home page (`app/page.tsx`) is a **client component** (uses `useSearchParams`)
- Search bar, tag filter are client components (interactive)
- About page can be server component (static)

### Performance
- Images optimized via Google Favicon API
- Lazy loading for off-screen content
- CSS-in-JS avoided for better performance
- Minimal JavaScript bundle

## Common Tasks

### Adding New Websites
1. Edit `data/websites.json`
2. Add entry with required fields: `url`, `title`, `tags`
3. Ensure URL is valid and properly formatted
4. Tags should be space-separated

### Adding Search Engines
1. Edit `data/search-engines.json`
2. Add to appropriate category or create new category
3. Use `${query}` as placeholder in URL

### Modifying Styles
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Use Tailwind utility classes

### Deployment
- Recommended: Vercel (automatic deployments)
- Alternative: Static export mode (configure in `next.config.js`)
- Build output: `.next` directory

## Known Issues

### Static Export Limitations
- Current config uses `output: 'export'` which has limitations:
  - No API routes
  - No dynamic rendering
  - Sitemap must be static

### Workarounds
- Use client-side rendering for dynamic features
- External analytics services for tracking
- Static sitemap generation at build time