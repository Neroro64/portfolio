<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import {
    focusedPanel,
    navIndex,
    listIndex,
    currentItems,
    focusNextPanel,
    focusPrevPanel
  } from '$lib/store';
  import { sections } from '$lib/store';

  function handleKeyDown(e: KeyboardEvent) {
    const key = e.key;

    // --- Panel Focus (h, l, ArrowLeft, ArrowRight) ---
    if (key === 'l' || key === 'ArrowRight') {
      focusNextPanel();
    } else if (key === 'h' || key === 'ArrowLeft') {
      focusPrevPanel();
    }

    // --- Item Navigation (j, k, ArrowDown, ArrowUp) ---
    const activePanel = get(focusedPanel);
    if (key === 'j' || key === 'ArrowDown') {
      e.preventDefault(); // Prevent page scrolling
      if (activePanel === 'nav') {
        navIndex.update(n => {
          const newIndex = Math.min(sections.length - 1, n + 1);
          if (newIndex !== n) listIndex.set(0); // Reset list index on section change
          return newIndex;
        });
      } else if (activePanel === 'list') {
        listIndex.update(n => Math.min(get(currentItems).length - 1, n + 1));
      }
    } else if (key === 'k' || key === 'ArrowUp') {
      e.preventDefault(); // Prevent page scrolling
      if (activePanel === 'nav') {
        navIndex.update(n => {
          const newIndex = Math.max(0, n - 1);
          if (newIndex !== n) listIndex.set(0); // Reset list index on section change
          return newIndex;
        });
      } else if (activePanel === 'list') {
        listIndex.update(n => Math.max(0, n - 1));
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