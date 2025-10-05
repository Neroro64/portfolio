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

  import { onMount } from "svelte";
  import { selectedItem, focusedPanel, isPreviewExpanded, setPreviewExpanded, togglePreviewExpanded } from "$lib/store";
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

  // Update source to use marked instead of raw markdown
  $: source = ($selectedItem as PortfolioItem)?.content || "";

  // Format date to local date
  $: formatted =
    $selectedItem &&
    new Date(($selectedItem as any).date).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  // Handle click outside to close expanded preview
  $: if ($focusedPanel !== 'preview' && $isPreviewExpanded) {
    setPreviewExpanded(false);
  }

  // Handle Escape key
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && $isPreviewExpanded) {
      setPreviewExpanded(false);
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<div 
  class="preview-content" 
  class:focused={$focusedPanel === "preview"} 
  class:expanded={$isPreviewExpanded}
  on:click={() => {
    if ($focusedPanel === "preview" && $selectedItem) {
      // Check if the selected item is an external link
      if ('url' in $selectedItem && $selectedItem.url) {
        // Open external link in new tab instead of expanding preview
        window.open($selectedItem.url, "_blank");
      } else {
        togglePreviewExpanded();
      }
    }
  }}
  on:keydown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if ($focusedPanel === "preview" && $selectedItem) {
        // Check if the selected item is an external link
        if ('url' in $selectedItem && $selectedItem.url) {
          // Open external link in new tab instead of expanding preview
          window.open($selectedItem.url, "_blank");
        } else {
          togglePreviewExpanded();
        }
      }
    }
  }}
  on:touchstart={(e) => {
    if ($focusedPanel === "preview" && $selectedItem) {
      // Prevent default touch behavior to avoid scrolling when touching preview panel
      e.preventDefault();
      
      // Check if the selected item is an external link
      if ('url' in $selectedItem && $selectedItem.url) {
        // Open external link in new tab instead of expanding preview
        window.open($selectedItem.url, "_blank");
      } else {
        togglePreviewExpanded();
      }
    }
  }}
  role="button"
  tabindex="0"
  aria-label="Preview Panel"
>
  <div class="content-wrapper">
    {#if $selectedItem}
      {#if isExternalLink($selectedItem)}
        <div class="markdown-content">
          <h2>{$selectedItem.title}</h2>
          {#if $selectedItem.description}
            <p class="description">{$selectedItem.description}</p>
          {/if}
          <p>
            External Link: <a href={$selectedItem.url} target="_blank"
              >{$selectedItem.url}</a
            >
          </p>
        </div>
      {:else}
        {#if $selectedItem.tags && $selectedItem.tags.length > 0}
          <h2>{$selectedItem.title}</h2>
          <div class="tags">
            <strong>Tags:</strong>
            {#each $selectedItem.tags as tag}
              <span>{tag}</span>
            {/each}
          </div>
        {/if}
        <p class="highlight">{formatted}</p>
        <div class="markdown-content">
          <SvelteMarkdown {source} />
        </div>
      {/if}
    {:else}
      <p>Select an item to preview.</p>
    {/if}
  </div>
</div>

<style>
  /* Global scope for this component's CSS */
  :global(.markdown-content) {
    font-family: var(--mono-font); /* Use Iosevka Term Slab for all text */
    line-height: 1.7;
    color: var(--gruvbox-fg);
  }

  /* Target headings */
  :global(.markdown-content h1),
  :global(.markdown-content h2),
  :global(.markdown-content h3),
  :global(.markdown-content h4),
  :global(.markdown-content h5) {
    font-family: var(--mono-font); /* Use Iosevka Term Slab for inline code */
    color: var(--gruvbox-bg-dark); /* Add background color for headers */
    background-color: var(--gruvbox-fg2); /* Add background color for headers */
    padding: 0em 0.2em; /* Add padding around text */
    margin-top: 2em;
    margin-bottom: 1em;
  }

  /* Target paragraphs */
  :global(.markdown-content p) {
    font-family: var(--mono-font); /* Use Iosevka Term Slab for inline code */
    overflow-wrap: break-word; /* wrap long words */
    margin-bottom: 1em;
  }

  /* Style links */
  :global(.markdown-content a) {
    font-family: var(--mono-font); /* Use Iosevka Term Slab for inline code */
    color: var(--gruvbox-aqua);
    text-decoration: none;
    border-bottom: 2px solid var(--gruvbox-aqua);
  }

  :global(.markdown-content a:hover) {
    font-family: var(--mono-font); /* Use Iosevka Term Slab for inline code */
    border-bottom-style: dotted;
  }

  /* Style blockquotes */
  :global(.markdown-content blockquote) {
    font-family: var(--mono-font); /* Use Iosevka Term Slab for inline code */
    border-left: 4px solid var(--gruvbox-gray);
    padding-left: 1em;
    margin-left: 0;
    font-style: italic;
    color: var(--gruvbox-gray);
  }

  /* Style code blocks */
  :global(.markdown-content pre) {
    font-family: var(--mono-font); /* Use Iosevka Term Slab for inline code */
    background-color: var(--gruvbox-bg2);
    border-radius: 4px;
    overflow-x: auto; /* Handle long lines of code */
  }

  :global(.markdown-content code) {
    font-family: var(--mono-font); /* Use Iosevka Term Slab for inline code */
    font-size: 0.9em;
  }

  /* Handle inline code differently from code blocks */
  :global(.markdown-content p > code) {
    background-color: var(--gruvbox-bg2);
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }

  .preview-content {
    border: 1px solid transparent;
    height: 100%;
    width: 100%; /* Ensure it fills its flex container */
    box-sizing: border-box;
    /* Prevent unwanted horizontal scrollbars; allow wrapping */
    overflow-x: hidden;
    /* Allow long words to wrap gracefully */
    overflow-wrap: anywhere;
    overflow-y: auto;
    transition: all 0.3s ease;
    z-index: 10;
    position: relative;
    min-width: 0; /* Prevent flex item from overflowing */
  }

  .preview-content.focused {
    border-color: var(--gruvbox-yellow);
  }

  .preview-content.expanded {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
    width: calc(100% - 1rem) !important;
    height: calc(100% - 1rem) !important;
    max-width: 1400px;
    max-height: 900px;
    background-color: var(--gruvbox-bg);
    z-index: 1000;
    border: 1px solid var(--gruvbox-yellow);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }

  .content-wrapper {
    padding: 1rem;
    height: 100%;
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



  .markdown-content {
    color: var(--gruvbox-fg);
    background-color: var(--gruvbox-bg0);
    line-height: 1.6;
  }
</style>
