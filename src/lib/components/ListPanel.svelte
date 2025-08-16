<script lang="ts">
  import { currentSection, currentItems, listIndex, focusedPanel } from '$lib/store';
  import { navigateToListItem } from '$lib/store';

  function selectListItem(index: number) {
    navigateToListItem(index);
    focusedPanel.set('list'); // Set this panel as focused
  }
</script>

<h2>{$currentSection.name}</h2>
<ul>
  {#if $currentItems && $currentItems.length > 0}
    {#each $currentItems as item, i}
      <li>
        <button
          class:selected={$listIndex === i && $focusedPanel === 'list'}
          on:click={() => selectListItem(i)}
        >
          • {item.title}
        </button>
      </li>
    {/each}
  {:else}
    <li>No items in this section.</li>
  {/if}
</ul>