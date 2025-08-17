<script lang="ts">
  import { navIndex, focusedPanel, sections } from '$lib/store';
  import { navigateToSection } from '$lib/store';

  function selectSection(index: number) {
    navigateToSection(index);
    focusedPanel.set('nav'); // Set this panel as focused
  }
</script>

<h2>Sections</h2>
<ul>
  {#each sections as section, i}
    <li>
      <button
        class:selected={$navIndex === i && $focusedPanel === 'nav'}
        on:click={() => selectSection(i)}
      >
        {section.icon} {section.name}
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
    font-family: 'Courier New', monospace;
  }
  
  li button:hover,
  li button:focus {
    background-color: rgba(255, 255, 255, 0.1);
    outline: 1px solid var(--gruvbox-yellow); /* Add custom focus indicator */
  }
  
  /* Ensure the selected state is properly styled */
  li button.selected {
    background-color: var(--gruvbox-highlight);
    color: var(--gruvbox-yellow);
  }
</style>