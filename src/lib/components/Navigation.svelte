<script lang="ts">
  /**
   * Component for navigation between content sections.
   *
   * This component provides a navigation bar that allows users to switch
   * between different content sections (Projects, Experience, Blog, etc.).
   * It also handles keyboard navigation using arrow keys or h/l keys.
   */

  import { appStore } from "$lib/store";
  import { onMount } from "svelte";

  let sections: any[] = [];
  let currentSection: string = "";

  // Subscribe to store changes
  const unsubscribe = appStore.subscribe((state: any) => {
    sections = state.sections;
    currentSection = state.currentSection;
  });

  onMount(() => {
    return () => unsubscribe();
  });

  /**
   * Select a navigation section.
   *
   * This function updates the store to set the currently selected section.
   *
   * @param sectionId - The ID of the section to select
   */
  function selectSection(sectionId: string) {
    appStore.setCurrentSection(sectionId);
  }

  /**
   * Handle keyboard events for navigation.
   *
   * This function processes arrow key presses to navigate between sections.
   * Left arrow or 'h' moves to the previous section, right arrow or 'l'
   * moves to the next section.
   *
   * @param event - The KeyboardEvent object
   */
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft" || event.key === "h") {
      event.preventDefault();
      const currentIndex = sections.findIndex((s) => s.id === currentSection);
      const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
      selectSection(sections[prevIndex].id);
    } else if (event.key === "ArrowRight" || event.key === "l") {
      event.preventDefault();
      const currentIndex = sections.findIndex((s) => s.id === currentSection);
      const nextIndex = (currentIndex + 1) % sections.length;
      selectSection(sections[nextIndex].id);
    }
  }

  // Set up keyboard event listener
  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });
</script>

<nav class="border">
  <div>
    {#each sections as section}
      <button
        class={currentSection === section.id ? "selected" : ""}
        on:click={() => selectSection(section.id)}
      >
        <span>{section.icon}</span>
        {section.name}
      </button>
    {/each}
  </div>
</nav>
