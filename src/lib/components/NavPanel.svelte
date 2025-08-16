<script lang="ts">
  import { navIndex, focusedPanel } from '$lib/store';
  import { defaultSections as sections } from '$lib/store';
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