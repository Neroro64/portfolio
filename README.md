# Echoes of the Deep

A digital realm forged in Svelte, TypeScript, and Bun, where the TUI ranger-like interface whispers secrets of a forgotten past.

## Overview

A TUI (Text User Interface) inspired portfolio site that mimics Ranger-like file manager navigation. Features a multi-panel layout for browsing content with keyboard navigation support.

## Architecture

- **Framework**: Svelte 5 (TypeScript)
- **Build Tool**: Bun + Vite
- **Routing**: SvelteKit
- **Styling**: CSS Modules / Tailwind CSS
- **Content Management**: Markdown files in `/content` directory, processed by `generate-content.ts`

## Project Structure

```
src/
├── routes/           # Page routes (+layout.svelte, +page.svelte)
├── components/       # UI components (NavPanel, ListPanel, PreviewPanel, etc.)
├── lib/              # Utility functions and helpers
│   ├── store.ts      # Svelte writable store + persistence logic
│   ├── utils.ts      # Content loading and utility functions
│   └── content-data.json  # Generated content data
├── styles/           # Global styles (terminal-style CSS)
└── types/            # TypeScript type definitions

content/              # Markdown content files organized by category
```

## Development Workflow

### Prerequisites
- Bun v1.0+
- Node.js v16+ (for build tools)
- TypeScript v5+

### Setup
```bash
bun install
```

### Commands
```bash
# Development server
bun run dev

# Build for production
bun run build

# Generate content data from markdown files
bun run generate-content

# Run type checking
bun run check

# Run tests (if configured)
bun test
```

## Content Management

Content is managed in the `/content` directory with subdirectories for different categories:
- `blog/` - Blog posts
- `experience/` - Professional experience
- `projects/` - Portfolio projects

The `generate-content.ts` script processes these markdown files and generates `src/lib/content-data.json` for runtime consumption.

## Navigation

- Keyboard navigation: hjkl or arrow keys
- Mouse support for panel interaction
- Multi-panel interface for enhanced information display