<script lang="ts">
  import { isPreviewExpanded } from "$lib/store";
  import NavPanel from "$lib/components/NavPanel.svelte";
  import ListPanel from "$lib/components/ListPanel.svelte";
  import PreviewPanel from "$lib/components/PreviewPanel.svelte";
</script>

<div class="panel-container" class:preview-expanded={$isPreviewExpanded}>
  <div class="panel"><NavPanel /></div>
  <div class="panel"><ListPanel /></div>
  <div class="panel preview"><PreviewPanel /></div>
</div>

{#if $isPreviewExpanded}
  <div class="backdrop" 
       on:click={() => {}} 
       role="button" 
       tabindex="0"
       aria-label="Close expanded preview"
       on:keydown={(e) => {
         if (e.key === 'Enter' || e.key === ' ') {
           // Click handler would be here, but we want to close the preview
           // which is handled by the click outside logic in PreviewPanel
         }
       }}></div>
{/if}

<style>
  .panel-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    transition: all 0.3s ease;
  }
  
  .panel-container.preview-expanded .panel:not(:last-child) {
    opacity: 0.3;
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    .panel-container { flex-direction: column; }
    /* Keep preview visible but allow scrolling */
    .panel { flex: 1; overflow-y: auto; }
  }
  
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    backdrop-filter: blur(2px);
  }
</style>