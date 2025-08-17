<script lang="ts">
  import { currentSection, currentItems, listIndex, focusedPanel } from '$lib/store';
  import { navigateToListItem } from '$lib/store';
  import type { NavigationItem, ExternalLink } from '$types/index';

  function selectListItem(index: number) {
    navigateToListItem(index);
    focusedPanel.set('list'); // Set this panel as focused
  }
  
  function isExternalLink(item: NavigationItem): item is ExternalLink {
    return (item as ExternalLink).url !== undefined;
  }
  
  function formatDate(dateString?: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
</script>

<h2>{$currentSection?.name ?? "SectionName"}</h2>
<ul>
  {#if $currentItems && $currentItems.length > 0}
    {#each $currentItems as item, i}
      <li>
        <button
          class:selected={$listIndex === i && $focusedPanel === 'list'}
          on:click={() => selectListItem(i)}
          aria-label={isExternalLink(item) ? `External link: ${item.title}` : `Item: ${item.title}`}
        >
          {#if isExternalLink(item)}
            <span class="item-title">{item.icon} {item.title}</span>
            <span class="item-date">External Link</span>
          {:else}
            <span class="item-title">• {item.title}</span>
            <span class="item-date">{formatDate(item.date)}</span>
          {/if}
        </button>
      </li>
    {/each}
  {:else}
    <li>No items in this section.</li>
  {/if}
</ul>

<style>
  li button {
    display: flex;
    justify-content: space-between;
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
    border-bottom: 1px solid var(--gruvbox-bg3);
  }
  
  li button:hover,
  li button:focus {
    background-color: rgba(255, 255, 255, 0.1);
    outline: 1px solid var(--gruvbox-yellow); /* Add custom focus indicator */
  }
  
  .item-title {
    flex-grow: 1;
  }
  
  .item-date {
    margin-left: 1rem;
    color: #888;
    font-size: 0.9em;
  }
  
  /* Ensure the selected state is properly styled */
  li button.selected {
    background-color: var(--gruvbox-highlight);
    color: var(--gruvbox-yellow);
  }
</style>