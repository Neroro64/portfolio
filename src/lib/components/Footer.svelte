<script lang="ts">
  import { currentSection, selectedItem } from '$lib/store';
</script>

<footer>
  Section: {$currentSection?.name || 'None'} | Item: {$selectedItem?.title || 'None'}
</footer>

<style>
  footer {
    padding: 0.5rem;
    border-top: 1px solid var(--gruvbox-bg3);
    text-align: left;
    font-size: 0.8rem;
    background-color: var(--gruvbox-bg0);
    color: var(--gruvbox-gray);
    /* Add blur effect */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); /* For Safari support */
    background-color: rgba(29, 32, 33, 0.7); /* Semi-transparent background to show blur effect */
  }
</style>