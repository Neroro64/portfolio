/**
 * Svelte store module for managing application state.
 * 
 * This file contains all the stores and actions needed to manage the state
 * of the Echoes of the Deep portfolio site, including navigation between panels,
 * content sections, and selected items.
 */

import { writable, derived } from 'svelte/store';
import type { NavigationSection } from '$types/index';

// --- Dynamic Data Loading ---
/**
 * Array to hold loaded navigation sections.
 * This will be populated with data from the generated content-data.json file.
 */
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
/**
 * The complete list of navigation sections.
 * This is populated with data from the content directory during build time.
 */
export const sections = loadedSections;

// --- Writable Stores for Core State ---

/**
 * The currently focused panel ('nav', 'list', or 'preview').
 * 
 * This store tracks which panel currently has keyboard focus.
 * It's used to determine where keyboard navigation should go next.
 */
export const focusedPanel = writable<'nav' | 'list' | 'preview'>('nav');

/**
 * The index of the selected section in the nav panel.
 * 
 * This store tracks which section is currently selected in the navigation panel.
 * It's used to determine which content items to display in the list panel.
 */
export const navIndex = writable(0);

/**
 * The index of the selected item in the list panel.
 * 
 * This store tracks which item is currently selected in the list panel.
 * It's used to determine which content to display in the preview panel.
 */
export const listIndex = writable(0);

/**
 * Whether the preview panel is currently expanded.
 * 
 * This store tracks whether the preview panel is expanded or in normal view.
 * It's used to control the layout when the preview panel is focused.
 */
export const isPreviewExpanded = writable(false);

// --- Derived Stores for Computed State ---

/**
 * The current section object, derived from the navIndex.
 * 
 * This derived store returns the section object that corresponds to the
 * currently selected navigation index. It defaults to the first section if
 * no valid section is found.
 */
export const currentSection = derived(navIndex, ($navIndex) => sections[$navIndex] || sections[0]);

/**
 * The items for the current section.
 * 
 * This derived store returns all items (portfolio items or external links)
 * that belong to the currently selected section.
 */
export const currentItems = derived(currentSection, ($currentSection) =>
  $currentSection ? $currentSection.items : []
);

/**
 * The currently selected portfolio item, derived from the listIndex.
 * 
 * This derived store returns the specific item (portfolio item or external link)
 * that is currently selected in the list panel.
 */
export const selectedItem = derived(
  [currentItems, listIndex],
  ([$currentItems, $listIndex]) => ($currentItems && $currentItems[$listIndex]) || null
);

// --- Store Actions ---

/**
 * Move focus to the next panel (nav -> list -> preview).
 * 
 * This function updates the focusedPanel store to move keyboard focus
 * from one panel to the next in a circular fashion.
 */
export function focusNextPanel() {
  focusedPanel.update(current => {
    if (current === 'nav') return 'list';
    if (current === 'list') return 'preview';
    return 'preview';
  });
}

/**
 * Move focus to the previous panel (preview -> list -> nav).
 * 
 * This function updates the focusedPanel store to move keyboard focus
 * from one panel to the previous in a circular fashion.
 */
export function focusPrevPanel() {
  focusedPanel.update(current => {
    if (current === 'preview') return 'list';
    if (current === 'list') return 'nav';
    return 'nav';
  });
}

/**
 * Navigate to a specific section.
 * 
 * This function sets the navIndex to the specified index and resets
 * the listIndex to 0 when changing sections.
 * 
 * @param index - The index of the section to navigate to
 */
export function navigateToSection(index: number) {
  navIndex.set(index);
  listIndex.set(0); // Reset list index when changing section
}

/**
 * Navigate to a specific item in the current section.
 * 
 * This function sets the listIndex to the specified index, allowing
 * the user to select a specific item within the currently selected section.
 * 
 * @param index - The index of the item to navigate to
 */
export function navigateToListItem(index: number) {
  listIndex.set(index);
}

/**
 * Toggle the preview panel expanded state.
 * 
 * This function toggles whether the preview panel is expanded or not.
 */
export function togglePreviewExpanded() {
  isPreviewExpanded.update(current => !current);
}

/**
 * Set the preview panel expanded state.
 * 
 * This function sets whether the preview panel is expanded or not.
 * 
 * @param expanded - Whether the preview panel should be expanded
 */
export function setPreviewExpanded(expanded: boolean) {
  isPreviewExpanded.set(expanded);
}