<script lang="ts">
  /**
   * Main layout component for the application.
   *
   * This component defines the overall structure of the page, including:
   * - The header with site information
   * - The main content area
   * - The footer with debugging information
   * - The keyboard handler for navigation
   */

  import Footer from "$lib/components/Footer.svelte";
  import KeyboardHandler from "$lib/components/KeyboardHandler.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <title>Echoes of the Deep</title>
</svelte:head>


<main class="container">
  {@render children()}
  <style>
  @import "/src/styles/global.css";
  </style>
</main>

<Footer />
<KeyboardHandler />
