<script lang="ts">
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

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>