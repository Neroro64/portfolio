<script lang="ts">
  import { selectedItem, focusedPanel } from '$lib/store';
  import type { NavigationItem } from '$types/index';
  import SvelteMarkdown from '@humanspeak/svelte-markdown';

  function isExternalLink(item: NavigationItem): item is ExternalLink {
    return (item as ExternalLink).url !== undefined;
  }
</script>

<div class="preview-content" class:focused={$focusedPanel === 'preview'}>
  {#if $selectedItem}
    {#if isExternalLink($selectedItem)}
      <h2>{$selectedItem.title}</h2>
      <p>External Link: <a href={$selectedItem.url} target="_blank">{$selectedItem.url}</a></p>
      <div class="iframe-message">
        <p>This website has prevented embedding in iframes.</p>
        <p>Please click the link above to visit the site directly.</p>
      </div>
    {:else}
      <h2>{$selectedItem.title}</h2>
      <p class="highlight">{$selectedItem.date}</p>
      <SvelteMarkdown {source} />
      
      {#if $selectedItem.tags && $selectedItem.tags.length > 0}
        <div class="tags">
          <strong>Tags:</strong>
          {#each $selectedItem.tags as tag}
            <span>{tag}</span>
          {/each}
        </div>
      {/if}
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
  
  .iframe-message {
    margin-top: 1rem;
    text-align: center;
    padding: 1rem;
    background-color: var(--gruvbox-bg2);
    border-radius: 4px;
  }
</style>