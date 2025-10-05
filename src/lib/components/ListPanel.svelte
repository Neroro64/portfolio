<script lang="ts">
  /**
   * Component for displaying a list of items within the selected section.
   *
   * This component renders a list of portfolio items (projects, experience, blog posts)
   * or external links that belong to the currently selected navigation section.
   *
   * It uses the `currentSection` and `currentItems` stores to determine what to display
   * and `listIndex` to track which item is currently selected.
   */

  import {
    currentSection,
    currentItems,
    listIndex,
    focusedPanel,
  } from "$lib/store";
  import { navigateToListItem } from "$lib/store";
  import type { NavigationItem, ExternalLink } from "$types/index";

  /**
   * Function to select a list item.
   *
   * This function updates the list index and sets focus back to the list panel
   * when an item is selected.
   *
   * @param index - The index of the item to select
   */
  function selectListItem(sortedIndex: number) {
    navigateToListItem(sortedIndex);
    focusedPanel.set("list");
  }

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

  /**
   * Format a date string into a readable format.
   *
   * This function takes a date string and formats it to a more user-friendly display.
   *
   * @param dateString - The date string to format
   * @returns A formatted date string or empty string if no date provided
   */
  function formatDate(dateString?: string): string {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
</script>

<h2>{$currentSection?.name ?? "SectionName"}</h2>
<ul>
  {#if $currentItems && $currentItems.length > 0}
    {#each $currentItems as item, i}
      <li>
        <button
          class:selected={$listIndex === i && $focusedPanel === "list"}
          on:click={() => selectListItem(i)}
          aria-label={isExternalLink(item)
            ? `External link: ${item.title}`
            : `Item: ${item.title}`}
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
    font-family: var(--mono-font);
    border-bottom: 1px solid var(--gruvbox-bg3);
  }

li button:hover,
li button:focus {
    background-color: var(--gruvbox-bg2);
    /* Remove outline to match hover */
  }




  .item-title {
    flex-grow: 1;
  }

  .item-date {
    margin-left: 1rem;
    color: var(--gruvbox-fg4);
    font-size: 0.9em;
  }

  /* Ensure the selected state is properly styled */
    li button.selected {
      background-color: var(--gruvbox-bg2);
      color: var(--gruvbox-fg);
    }
</style>
