<script lang="ts">
  import NavPanel from "$lib/components/NavPanel.svelte";
  import ListPanel from "$lib/components/ListPanel.svelte";
  import PreviewPanel from "$lib/components/PreviewPanel.svelte";
</script>

<div class="panel-container">
  <div class="panel"><NavPanel /></div>
  <div class="panel"><ListPanel /></div>
  <div class="panel preview"><PreviewPanel /></div>
</div>

<style>
  .panel-container {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  @media (max-width: 768px) {
    .panel-container { flex-direction: column; }
    /* Keep preview visible but allow scrolling */
    .panel { flex: 1; overflow-y: auto; }
  }
</style>