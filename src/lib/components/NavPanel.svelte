<script lang="ts">
  import { navIndex, focusedPanel, sections, listIndex } from '$lib/store';

  function selectSection(index: number) {
    navIndex.set(index);
    listIndex.set(0); // Reset list index when changing section
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