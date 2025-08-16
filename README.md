# Echoes of the Deep 

A digital realm forged in Svelte, TypeScript, and Bun, where the TUI ranger-like interface whispers secrets of a forgotten past.

Within this forsaken landscape, travelers shall discover the remnants of my professional odyssey—scattered relics of experiences, abandoned projects, and cryptic blog posts that serve as learning documentation for those brave enough to venture forth.

This cursed hub holds the keys to unlock my mastery, where each exploration reveals new depths of my craft, and every reflection offers a glimmer of hope amidst the darkness.

## Overview

This is a portfolio website with a terminal-inspired UI that mimics Ranger-like experience.

The interface features a multi-panel layout for browsing content with keyboard navigation support.

## Features

- Terminal-inspired UI with keyboard navigation
- File manager-like browsing experience with multi-panel interface
- Responsive design for all screen sizes
- Fast loading times thanks to Bun
- Type-safe development with TypeScript
- Interactive terminal-style interface with panel-based navigation

## Technology Stack

- **Frontend**: Svelte (with TypeScript)
- **Build Tool**: Bun
- **Styling**: CSS Modules / Tailwind CSS
- **Routing**: SvelteKit's built-in routing
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0 or higher)
- [Node.js](https://nodejs.org/) (v16 or higher) - for some build tools and dependencies
- [TypeScript](https://www.typescriptlang.org/) (v4 or higher) - for type safety

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
bun install
```

### Development

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Run tests
bun test
```

## Project Structure

```
src/
├── app.html          # Main HTML template
├── routes/           # Page routes
│   ├── +layout.svelte
│   └── +page.svelte
├── components/       # Reusable UI components
│   ├── TerminalInterface.svelte  # Main TUI interface component
│   ├── FileBrowser.svelte        # File manager-like browsing component
│   ├── Navigation.svelte         # Navigation controls
│   ├── Header.svelte             # Header component
│   └── Footer.svelte             # Footer component
├── lib/              # Utility functions and helpers
│   └── utils.ts      # Common utility functions
├── styles/           # Global styles
│   └── global.css    # Terminal-style CSS
└── types/            # TypeScript types
    └── index.ts      # Type definitions for portfolio items
```

## TUI Ranger-like UX Features

The interface is designed with a terminal-inspired aesthetic that mimics popular file managers like Ranger:

- Mouse and Keyboard navigation (hjkl or arrow keys)
- Quick access to different sections
- File/folder browsing experience
- Minimalist design focused on content
- Multi-panel interface for enhanced information display

## Development Workflow

1. Create new components in `src/components/`
2. Add routes in `src/routes/`
3. Use TypeScript for type safety
4. Style with CSS modules or Tailwind CSS
5. Run `bun run dev` to start the development server

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.