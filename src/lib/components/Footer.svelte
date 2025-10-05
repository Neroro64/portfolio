<script lang="ts">
  /**
   * Component for displaying the site footer.
   *
   * This component renders a simple footer that shows information about
   * the currently selected section and item. It's useful for debugging
   * and understanding which content is being displayed.
   */

  import { currentSection, selectedItem } from "$lib/store";
</script>

<footer>
  Navigation: hjkl or arrow keys | Section: {$currentSection?.name || "None"} | Item: {$selectedItem?.title ||
    "None"}
</footer>

<style>
footer {
  padding: 0.5rem;
  border-top: 1px solid var(--gruvbox-bg3);
  text-align: left;
  font-size: 0.8rem;
  color: var(--gruvbox-gray);
  /* Add blur effect */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* For Safari support */
  background-color: rgba(
    29,
    32,
    33,
    0.7
  ); /* Semi-transparent background to show blur effect */
}

</style>
