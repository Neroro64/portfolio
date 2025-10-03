<script lang="ts">
  /**
   * Component for handling keyboard navigation.
   *
   * This component listens for keyboard events and handles navigation between panels
   * and items using keyboard shortcuts. It provides a TUI-like experience for users
   * who prefer keyboard navigation over mouse interaction.
   */

  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import {
    focusedPanel,
    navIndex,
    listIndex,
    currentItems,
    focusNextPanel,
    focusPrevPanel,
    navigateToSection,
    navigateToListItem,
    sections,
    isPreviewExpanded,
    setPreviewExpanded,
    selectedItem,
    togglePreviewExpanded
  } from "$lib/store";

  /**
   * Handle keyboard events for navigation.
   *
   * This function processes key presses and updates the application state accordingly.
   * It handles:
   * - Panel switching (h/l or arrow keys)
   * - Item navigation (j/k or arrow keys)
   * - Escape key to close expanded preview
   *
   * @param e - The KeyboardEvent object
   */
  function handleKeyDown(e: KeyboardEvent) {
    const key = e.key;
    const activePanel = get(focusedPanel);

    // --- Escape key to close expanded preview ---
    if (key === "Escape" && get(isPreviewExpanded)) {
      setPreviewExpanded(false);
      e.preventDefault();
      return;
    }

    // --- Panel Focus (h, l, ArrowLeft, ArrowRight) ---
    if (key === "l" || key === "ArrowRight") {
      // If the preview panel is focused, toggle expansion instead of moving to next panel
      if (activePanel === "preview") {
        // Only toggle if there's an item selected
        if (get(selectedItem)) {
          togglePreviewExpanded();
        }
        e.preventDefault();
      } else {
        focusNextPanel();
        e.preventDefault(); // Prevent page scrolling
      }
    } else if (key === "h" || key === "ArrowLeft") {
      focusPrevPanel();
      e.preventDefault(); // Prevent page scrolling
    }

    // --- Item Navigation (j, k, ArrowDown, ArrowUp) ---
    if (key === "j" || key === "ArrowDown") {
      e.preventDefault(); // Prevent page scrolling
      if (activePanel === "nav") {
        const currentIndex = get(navIndex);
        const newIndex = Math.min(sections.length - 1, currentIndex + 1);
        if (newIndex !== currentIndex) {
          navigateToSection(newIndex);
        }
      } else if (activePanel === "list") {
        const items = get(currentItems);
        const currentIndex = get(listIndex);
        const newIndex = Math.min(items.length - 1, currentIndex + 1);
        if (newIndex !== currentIndex) {
          navigateToListItem(newIndex);
        }
      }
      // Allow navigation in preview panel by scrolling content
      else if (activePanel === "preview") {
        // Scroll down in preview panel
        const previewPanel = document.querySelector('.preview-content');
        if (previewPanel) {
          previewPanel.scrollTop += 30;
        }
      }
    } else if (key === "k" || key === "ArrowUp") {
      e.preventDefault(); // Prevent page scrolling
      if (activePanel === "nav") {
        const currentIndex = get(navIndex);
        const newIndex = Math.max(0, currentIndex - 1);
        if (newIndex !== currentIndex) {
          navigateToSection(newIndex);
        }
      } else if (activePanel === "list") {
        const currentIndex = get(listIndex);
        const newIndex = Math.max(0, currentIndex - 1);
        if (newIndex !== currentIndex) {
          navigateToListItem(newIndex);
        }
      }
      // Allow navigation in preview panel by scrolling content
      else if (activePanel === "preview") {
        // Scroll up in preview panel
        const previewPanel = document.querySelector('.preview-content');
        if (previewPanel) {
          previewPanel.scrollTop -= 30;
        }
      }
    }
  }

  // Set up event listener when component mounts
  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
</script>
