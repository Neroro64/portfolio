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
  import {
    selectedItem,
    focusedPanel,
    isPreviewExpanded,
    setPreviewExpanded,
    focusPrevPanel
  } from "$lib/store";

  let touchStartX: number = 0;

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
  $: if ($focusedPanel !== "preview" && $isPreviewExpanded) {
    setPreviewExpanded(false);
  }

  // Handle Escape key
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && $isPreviewExpanded) {
      setPreviewExpanded(false);
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<div
  class="preview-content"
  class:focused={$focusedPanel === "preview"}
  class:expanded={$isPreviewExpanded}
  on:click={() => {
    focusedPanel.set("preview"); // Ensure preview panel is focused on click
    if ($selectedItem) {
      // Check if the selected item is an external link
      if ("url" in $selectedItem && $selectedItem.url) {
        // Open external link in new tab instead of expanding preview
        window.open($selectedItem.url, "_blank");
      } else {
        setPreviewExpanded(true);
      }
    }
  }}
  on:keydown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      if ($focusedPanel === "preview" && $selectedItem) {
        // Check if the selected item is an external link
        if ("url" in $selectedItem && $selectedItem.url) {
          // Open external link in new tab instead of expanding preview
          window.open($selectedItem.url, "_blank");
        } else {
          setPreviewExpanded(true);
        }
      }
    }
  }}
  on:touchstart={(e) => {
    touchStartX = e.touches?.[0]?.clientX ?? 0;
    focusedPanel.set("preview");
    if (!$isPreviewExpanded) {
      e.preventDefault();
      setPreviewExpanded(true);
    }
  }}
  on:touchend={(e) => {
    const endX = e.changedTouches?.[0]?.clientX ?? 0;
    if (touchStartX - endX < -100 && $isPreviewExpanded) {
      focusPrevPanel();
      setPreviewExpanded(false);
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
              <span>{tag},</span>
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
  /* Global markdown styles */
  :global(.markdown-content) {
    font-family: var(--mono-font);
    line-height: 1.7;
    color: var(--gruvbox-fg);
  }

  /* Headings with dark text on panel background */
  :global(.markdown-content h1),
  :global(.markdown-content h2),
  :global(.markdown-content h3),
  :global(.markdown-content h4),
  :global(.markdown-content h5) {
    font-family: var(--mono-font);
    color: var(--gruvbox-bg2); /* dark text */
    background-color: var(--gruvbox-fg); /* light header bg */
    padding: 0em 0.2em;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  :global(.markdown-content p) {
    font-family: var(--mono-font);
    overflow-wrap: break-word;
    margin-bottom: 1rem;
  }

  :global(.markdown-content a) {
    color: var(--gruvbox-aqua);
    text-decoration: none;
    border-bottom: 2px solid var(--gruvbox-aqua);
  }

  :global(.markdown-content a:hover) {
    border-bottom-style: dotted;
  }

  :global(.markdown-content blockquote) {
    border-left: 4px solid var(--gruvbox-gray);
    padding-left: 1rem;
    margin-left: 0;
    font-style: italic;
    color: var(--gruvbox-gray);
  }

  :global(.markdown-content pre) {
    background-color: var(--gruvbox-bg2);
    border-radius: 4px;
    overflow-x: auto;
  }

  :global(.markdown-content code) {
    font-size: 0.9rem;
  }

  :global(.markdown-content p > code) {
    background-color: var(--gruvbox-bg2);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
  }

  /* Preview panel base */
  .preview-content {
    position: relative;
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem;
    background-color: var(--gruvbox-bg);
    border-radius: 4px;
    transition:
      transform 0.35s ease,
      opacity 0.3s ease,
      width 0.35s ease,
      height 0.35s ease;
    cursor: pointer;
  }

  /* Focused state matches hover */
  .preview-content.focused {
    background-color: var(--gruvbox-bg);
  }

  /* Expanded zen mode */
  .preview-content.expanded {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.05);
    width: 70vw; /* slightly smaller */
    height: 80vh;
    z-index: 1000;
    border: none;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(12px);
    padding: 1rem;
    overflow-y: auto; /* allow scrolling in expanded mode */
  }

  .preview-content:not(.expanded) {
    transform: translate(0, 0) scale(1);
  }
</style>
