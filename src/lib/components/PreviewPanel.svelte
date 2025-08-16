<script lang="ts">
  import { selectedItem, focusedPanel } from '$lib/store';
</script>

<div class="preview-content" class:focused={$focusedPanel === 'preview'}>
  {#if $selectedItem}
    <h2>{$selectedItem.title}</h2>
    <p class="highlight">{$selectedItem.date}</p>
    <p>{$selectedItem.content}</p>

    {#if $selectedItem.tags && $selectedItem.tags.length > 0}
      <div class="tags">
        <strong>Tags:</strong>
        {#each $selectedItem.tags as tag}
          <span>{tag}</span>
        {/each}
      </div>
    {/if}
  {:else}
    <p>Select an item to preview.</p>
  {/if}
</div>

<style>
  .preview-content {
    border: 1px solid transparent;
    padding: 0.5rem;
    height: 100%;
    box-sizing: border-box;
  }
  .preview-content.focused {
    border-color: var(--gruvbox-yellow);
  }
  .tags {
    margin-top: 1rem;
  }
  .tags span {
    background-color: var(--gruvbox-bg2);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    margin-right: 0.5rem;
    font-size: 0.8rem;
  }
</style>