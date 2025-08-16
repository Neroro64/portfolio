import { writable, derived } from 'svelte/store';
import type { NavigationSection, PortfolioItem } from '$types/index';

// --- Static Data ---
export const sections: NavigationSection[] = [
  {
    id: 'projects',
    name: 'Projects',
    icon: '📁',
    items: [
      {
        id: 'project1',
        title: 'Echoes of the Deep Portfolio',
        description: 'A terminal-inspired portfolio website built with Svelte and TypeScript.',
        type: 'project',
        date: '2023-08-15',
        tags: ['Svelte', 'TypeScript', 'Bun'],
        content: 'This portfolio showcases my work in a Ranger-like terminal interface. It features multi-panel navigation, keyboard controls, and a retro terminal aesthetic.'
      },
      // ... other projects
    ]
  },
  {
    id: 'experience',
    name: 'Experience',
    icon: '💼',
    items: [
      {
        id: 'exp1',
        title: 'Senior Frontend Developer',
        description: 'Led development of multiple web applications for enterprise clients.',
        type: 'experience',
        date: '2022-01-01',
        tags: ['React', 'TypeScript', 'Node.js'],
        content: 'As a senior developer, I was responsible for architecting and implementing complex frontend solutions. My team delivered several high-impact projects on time and within budget.'
      },
      // ... other experience items
    ]
  },
  {
    id: 'blog',
    name: 'Blog',
    icon: '📝',
    items: [
      {
        id: 'blog1',
        title: 'Getting Started with SvelteKit',
        description: 'A beginner-friendly guide to building applications with SvelteKit.',
        type: 'blog',
        date: '2023-08-10',
        tags: ['Svelte', 'Tutorial'],
        content: 'In this article, I walk through the basics of SvelteKit and how to get started building modern web applications. We cover routing, components, and state management.'
      },
      // ... other blog items
    ]
  }
];


// --- Writable Stores for Core State ---

/** The currently focused panel ('nav', 'list', or 'preview') */
export const focusedPanel = writable<'nav' | 'list' | 'preview'>('nav');

/** The index of the selected section in the nav panel */
export const navIndex = writable(0);

/** The index of the selected item in the list panel */
export const listIndex = writable(0);


// --- Derived Stores for Computed State ---

/** The current section object, derived from the navIndex */
export const currentSection = derived(navIndex, ($navIndex) => sections[$navIndex]);

/** The items for the current section */
export const currentItems = derived(currentSection, ($currentSection) => $currentSection.items);

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