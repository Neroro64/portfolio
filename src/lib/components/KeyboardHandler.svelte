<script lang="ts">
  /**
   * Component for handling keyboard navigation.
   * 
   * This component listens for keyboard events and handles navigation between panels
   * and items using keyboard shortcuts. It provides a TUI-like experience for users
   * who prefer keyboard navigation over mouse interaction.
   */
  
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import {
    focusedPanel,
    navIndex,
    listIndex,
    currentItems,
    focusNextPanel,
    focusPrevPanel,
    navigateToSection,
    navigateToListItem,
    sections
  } from '$lib/store';

  /**
   * Handle keyboard events for navigation.
   * 
   * This function processes key presses and updates the application state accordingly.
   * It handles:
   * - Panel switching (h/l or arrow keys)
   * - Item navigation (j/k or arrow keys)
   * 
   * @param e - The KeyboardEvent object
   */
  function handleKeyDown(e: KeyboardEvent) {
    const key = e.key;

    // --- Panel Focus (h, l, ArrowLeft, ArrowRight) ---
    if (key === 'l' || key === 'ArrowRight') {
      focusNextPanel();
      e.preventDefault(); // Prevent page scrolling
    } else if (key === 'h' || key === 'ArrowLeft') {
      focusPrevPanel();
      e.preventDefault(); // Prevent page scrolling
    }

    // --- Item Navigation (j, k, ArrowDown, ArrowUp) ---
    const activePanel = get(focusedPanel);
    if (key === 'j' || key === 'ArrowDown') {
      e.preventDefault(); // Prevent page scrolling
      if (activePanel === 'nav') {
        const currentIndex = get(navIndex);
        const newIndex = Math.min(sections.length - 1, currentIndex + 1);
        if (newIndex !== currentIndex) {
          navigateToSection(newIndex);
        }
      } else if (activePanel === 'list') {
        const items = get(currentItems);
        const currentIndex = get(listIndex);
        const newIndex = Math.min(items.length - 1, currentIndex + 1);
        if (newIndex !== currentIndex) {
          navigateToListItem(newIndex);
        }
      }
    } else if (key === 'k' || key === 'ArrowUp') {
      e.preventDefault(); // Prevent page scrolling
      if (activePanel === 'nav') {
        const currentIndex = get(navIndex);
        const newIndex = Math.max(0, currentIndex - 1);
        if (newIndex !== currentIndex) {
          navigateToSection(newIndex);
        }
      } else if (activePanel === 'list') {
        const currentIndex = get(listIndex);
        const newIndex = Math.max(0, currentIndex - 1);
        if (newIndex !== currentIndex) {
          navigateToListItem(newIndex);
        }
      }
    }
  }

  // Set up event listener when component mounts
  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>