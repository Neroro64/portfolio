<script lang="ts">
import { isPreviewExpanded, focusedPanel, setPreviewExpanded } from "$lib/store";
import NavPanel from "$lib/components/NavPanel.svelte";
import ListPanel from "$lib/components/ListPanel.svelte";
import PreviewPanel from "$lib/components/PreviewPanel.svelte";
</script>

<div class="panel-container" class:preview-expanded={$isPreviewExpanded}>
<div class="panel" class:focused={$focusedPanel === 'nav'}><NavPanel /></div>
   <div class="panel" class:focused={$focusedPanel === 'list'}><ListPanel /></div>
   <div class="panel preview" class:focused={$focusedPanel === 'preview'}><PreviewPanel /></div>
</div>

 {#if $isPreviewExpanded}
   <div class="backdrop"
        on:click={() => setPreviewExpanded(false)}
        on:touchstart={() => setPreviewExpanded(false)}
        role="button"
        tabindex="0"
        aria-label="Close expanded preview"
        on:keydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setPreviewExpanded(false);
          }
        }}></div>
 {/if}

<style>
  .panel-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%; /* Ensure container fills available width */
    min-width: 0; /* Ensure flex container doesn't overflow */
    transition: all 0.3s ease;
  }
  
.panel-container.preview-expanded .panel:not(:last-child) {
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    .panel-container { flex-direction: column; }
    /* Show only focused panel on mobile */
    .panel { display: none; }
    .panel.focused { display: flex; flex: 1; overflow-y: auto; }
  }
  
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--gruvbox-bg);
    z-index: 999;
    backdrop-filter: blur(2px);
  }
</style>