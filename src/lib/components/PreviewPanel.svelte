<script lang="ts">
  import { selectedItem, focusedPanel } from '$lib/store';
  import type { NavigationItem } from '$types/index';
  import SvelteMarkdown from '@humanspeak/svelte-markdown'

  function isExternalLink(item: NavigationItem): item is ExternalLink {
    return (item as ExternalLink).url !== undefined;
  }
  
  // Define source for markdown rendering
  $: source = $selectedItem?.content || '';
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
      <div class="markdown-content">
        <SvelteMarkdown {source} />
      </div>
      
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