import { writable, derived } from 'svelte/store';
import type { NavigationSection, PortfolioItem } from '$types/index';

// --- Dynamic Data Loading ---
let loadedSections: NavigationSection[] = [];

// Try to load generated content data
try {
  // @ts-ignore
  loadedSections = (await import('$lib/content-data.json')).default;
} catch (error) {
  console.warn('Failed to load content data, using defaults:', error);
  // Fallback to default content
  loadedSections = [
    {
      id: 'projects',
      name: 'Projects',
      icon: '📁',
      items: [
        {
          id: 'portfolio',
          title: 'Echoes of the Deep Portfolio',
          description: 'A terminal-inspired portfolio website built with Svelte and TypeScript.',
          type: 'project',
          date: '2023-08-15',
          tags: ['Svelte', 'TypeScript', 'Bun'],
          content: `This portfolio showcases my work in a Ranger-like terminal interface. It features multi-panel navigation, keyboard controls, and a retro terminal aesthetic.

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
- **Type Safety**: TypeScript`
        }
      ]
    },
    {
      id: 'experience',
      name: 'Experience',
      icon: '💼',
      items: [
        {
          id: 'senior-dev',
          title: 'Senior Frontend Developer',
          description: 'Led development of multiple web applications for enterprise clients.',
          type: 'experience',
          date: '2022-01-01',
          tags: ['React', 'TypeScript', 'Node.js'],
          content: `As a senior developer, I was responsible for architecting and implementing complex frontend solutions. My team delivered several high-impact projects on time and within budget.

## Key Responsibilities

- Led a team of 5 frontend developers
- Architected scalable frontend solutions
- Mentored junior developers
- Collaborated with UX designers and backend engineers
- Implemented CI/CD pipelines for frontend applications

## Technologies Used

- React and Redux
- TypeScript
- Node.js
- Webpack and Babel
- Jest and Testing Library`
        }
      ]
    },
    {
      id: 'blog',
      name: 'Blog',
      icon: '📝',
      items: [
        {
          id: 'sveltekit-guide',
          title: 'Getting Started with SvelteKit',
          description: 'A beginner-friendly guide to building applications with SvelteKit.',
          type: 'blog',
          date: '2023-08-10',
          tags: ['Svelte', 'Tutorial'],
          content: `In this article, I walk through the basics of SvelteKit and how to get started building modern web applications. We cover routing, components, and state management.

## What is SvelteKit?

SvelteKit is a framework for building extremely high-performance web apps. It's built on top of Svelte, which compiles your components to highly efficient vanilla JavaScript at build time.

## Why SvelteKit?

1. **Performance**: Svelte's compile-time approach results in smaller bundles and faster runtime
2. **Developer Experience**: Excellent tooling and hot module replacement
3. **Flexibility**: Works as an SPA, SSR, or static site generator
4. **Progressive Enhancement**: Built-in support for enhanced user experiences

## Getting Started

1. Install Node.js (v16 or higher)
2. Create a new project with \`npm create svelte@latest my-app\`
3. Install dependencies with \`npm install\`
4. Start the development server with \`npm run dev\``
        }
      ]
    }
  ];
}

// Export sections for use in components
export const sections = loadedSections;

// --- Writable Stores for Core State ---

/** The currently focused panel ('nav', 'list', or 'preview') */
export const focusedPanel = writable<'nav' | 'list' | 'preview'>('nav');

/** The index of the selected section in the nav panel */
export const navIndex = writable(0);

/** The index of the selected item in the list panel */
export const listIndex = writable(0);

// --- Derived Stores for Computed State ---

/** The current section object, derived from the navIndex */
export const currentSection = derived(navIndex, ($navIndex) => sections[$navIndex] || sections[0]);

/** The items for the current section */
export const currentItems = derived(currentSection, ($currentSection) => 
  $currentSection ? $currentSection.items : []
);

/** The currently selected portfolio item, derived from the listIndex */
export const selectedItem = derived(
  [currentItems, listIndex],
  ([$currentItems, $listIndex]) => ($currentItems && $currentItems[$listIndex]) || null
);

// --- Store Actions ---

/** Move focus to the next panel (nav -> list -> preview) */
export function focusNextPanel() {
  focusedPanel.update(current => {
    if (current === 'nav') return 'list';
    if (current === 'list') return 'preview';
    return 'preview';
  });
}

/** Move focus to the previous panel (preview -> list -> nav) */
export function focusPrevPanel() {
  focusedPanel.update(current => {
    if (current === 'preview') return 'list';
    if (current === 'list') return 'nav';
    return 'nav';
  });
}

/** Navigate to a specific section */
export function navigateToSection(index: number) {
  navIndex.set(index);
  listIndex.set(0); // Reset list index when changing section
}

/** Navigate to a specific item in the current section */
export function navigateToListItem(index: number) {
  listIndex.set(index);
}