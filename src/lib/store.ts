import { writable, derived } from 'svelte/store';
import type { NavigationSection } from '$types/index';

// --- Dynamic Data Loading ---
let loadedSections: NavigationSection[] = [];

// Try to load generated content data
try {
  // Import the content data directly (this will be replaced by the build process)
  const contentData = await import('$lib/content-data.json');
  loadedSections = contentData.default as NavigationSection[] ?? [];
} catch (error) {
  console.warn('Failed to load content data, using defaults:', error);
  // Fallback to default content
  loadedSections = [];
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