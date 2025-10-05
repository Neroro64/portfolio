<script lang="ts">
  /**
   * Component for displaying navigation sections.
   *
   * This component renders a list of navigation sections (Projects, Experience, Blog, etc.)
   * that allow users to switch between different content categories.
   *
   * It uses the `sections` store to get the available sections and `navIndex` to track
   * which section is currently selected.
   */

  import { navIndex, focusedPanel, sections } from "$lib/store";
  import { navigateToSection } from "$lib/store";

  /**
   * Function to select a navigation section.
   *
   * This function updates the navigation index and sets focus back to the nav panel
   * when a section is selected.
   *
   * @param index - The index of the section to select
   */
  function selectSection(index: number) {
    navigateToSection(index);
    focusedPanel.set("nav"); // Set this panel as focused
  }
</script>

<h2>Sections</h2>
<ul>
  {#each sections as section, i}
    <li>
      <button
        class:selected={$navIndex === i && $focusedPanel === "nav"}
        on:click={() => selectSection(i)}
      >
        {section.icon}
        {section.name}
      </button>
    </li>
  {/each}
</ul>

<style>
  li button {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    text-align: left;
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    outline: none; /* Remove default focus outline */
    font-family: var(--mono-font);
    border-bottom: 1px solid var(--gruvbox-bg3);
  }

li button:hover,
   li button:focus {
     background-color: var(--gruvbox-bg2);
     outline: 1px solid var(--gruvbox-yellow); /* Add custom focus indicator */
   }

  /* Ensure the selected state is properly styled */
  li button.selected {
    background-color: var(--gruvbox-highlight);
    color: var(--gruvbox-yellow);
  }
</style>
