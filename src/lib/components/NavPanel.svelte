<script lang="ts">
  import { navIndex, focusedPanel, sections } from '$lib/store';
  import { navigateToSection } from '$lib/store';
  import type { NavigationItem } from '$types/index';

  function selectSection(index: number) {
    navigateToSection(index);
    focusedPanel.set('nav'); // Set this panel as focused
  }
  
  function isExternalLink(item: NavigationItem): item is ExternalLink {
    return (item as ExternalLink).url !== undefined;
  }
  
  function handleItemClick(item: NavigationItem) {
    if (isExternalLink(item)) {
      // Open external link in new tab
      window.open(item.url, '_blank');
      // Clear the list and preview panels when an external link is clicked
      focusedPanel.set('nav');
    } else {
      // Handle portfolio item navigation
      selectSection(0); // This would navigate to the first section for now
    }
  }
</script>

<h2>Sections</h2>
<ul>
  {#each sections as section, i}
    <li>
      <button
        class:selected={$navIndex === i && $focusedPanel === 'nav'}
        on:click={() => selectSection(i)}
      >
        {section.icon} {section.name}
      </button>
      <!-- Display external links if any -->
      {#if section.items.some(item => isExternalLink(item))}
        <ul class="external-links">
          {#each section.items as item}
            {#if isExternalLink(item)}
              <li>
                <button
                  on:click={() => handleItemClick(item)}
                >
                  {item.icon} {item.title}
                </button>
              </li>
            {/if}
          {/each}
        </ul>
      {/if}
    </li>
  {/each}
</ul>

<style>
  .external-links {
    margin-left: 1rem;
    padding-left: 0.5rem;
    border-left: 1px solid var(--gruvbox-bg3);
  }
  
  .external-links li button {
    text-align: left;
    padding-left: 1rem;
  }
</style>