<script lang="ts">
  /**
   * Component for previewing selected items.
   *
   * This component displays the detailed content of a selected item from the list panel.
   * It can show either markdown content (for projects, experience, blog posts) or
   * external link information.
   *
   * It uses the `selectedItem` store to determine what to display and `focusedPanel`
   * to track focus state for styling purposes.
   */

  import { selectedItem, focusedPanel } from "$lib/store";
  import type {
    NavigationItem,
    PortfolioItem,
    ExternalLink,
  } from "$types/index";
  import SvelteMarkdown from "@humanspeak/svelte-markdown";

  /**
   * Type guard function to check if an item is an external link.
   *
   * This function helps TypeScript distinguish between PortfolioItem and ExternalLink types.
   *
   * @param item - The navigation item to check
   * @returns True if the item is an ExternalLink, false otherwise
   */
  function isExternalLink(item: NavigationItem): item is ExternalLink {
    return (item as ExternalLink).url !== undefined;
  }

  // Define source for markdown rendering
  /**
   * Reactive statement that sets the markdown source to display.
   *
   * This reactive statement ensures that when a portfolio item is selected,
   * its content is used for markdown rendering. For external links, it uses
   * an empty string since they don't have markdown content.
   */
  $: source = ($selectedItem as PortfolioItem)?.content || "";
</script>

<div class="preview-content" class:focused={$focusedPanel === "preview"}>
  {#if $selectedItem}
    {#if isExternalLink($selectedItem)}
      <h2>{$selectedItem.title}</h2>
      <p>
        External Link: <a href={$selectedItem.url} target="_blank"
          >{$selectedItem.url}</a
        >
      </p>
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
</style>
