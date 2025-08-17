<script lang="ts">
  import { selectedItem, focusedPanel } from '$lib/store';
  import type { NavigationItem, ExternalLink } from '$types/index';
  import SvelteMarkdown from '@humanspeak/svelte-markdown';

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
  
  .markdown-content {
    color: var(--gruvbox-fg);
    background-color: var(--gruvbox-bg0);
    padding: 1rem;
    line-height: 1.6;
  }
  
  .markdown-content h1,
  .markdown-content h2,
  .markdown-content h3,
  .markdown-content h4,
  .markdown-content h5,
  .markdown-content h6 {
    color: var(--gruvbox-blue);
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .markdown-content p {
    margin: 0.5rem 0;
  }
  
  .markdown-content a {
    color: var(--gruvbox-aqua);
    text-decoration: none;
  }
  
  .markdown-content a:hover {
    text-decoration: underline;
  }
  
  .markdown-content code {
    background-color: var(--gruvbox-bg2);
    color: var(--gruvbox-green);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Consolas', 'Monaco', monospace;
  }
  
  .markdown-content pre {
    background-color: var(--gruvbox-bg2);
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 1rem 0;
  }
  
  .markdown-content blockquote {
    border-left: 3px solid var(--gruvbox-yellow);
    padding-left: 1rem;
    margin: 1rem 0;
    color: var(--gruvbox-gray);
  }
  
  .markdown-content ul,
  .markdown-content ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }
  
  .markdown-content li {
    margin-bottom: 0.5rem;
  }
  
  .markdown-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }
  
  .markdown-content th,
  .markdown-content td {
    border: 1px solid var(--gruvbox-bg3);
    padding: 0.5rem;
    text-align: left;
  }
  
  .markdown-content th {
    background-color: var(--gruvbox-bg2);
    color: var(--gruvbox-blue);
  }
  
  .markdown-content hr {
    border: none;
    border-top: 1px solid var(--gruvbox-bg3);
    margin: 1rem 0;
  }
</style>