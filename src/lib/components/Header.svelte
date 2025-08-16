<script lang="ts">
  import { appStore } from '$lib/store';
  
  let { title = 'Echoes of the Deep' } = $props();
</script>

<header class="border p-2 mb-4">
  <div class="flex justify-between items-center">
    <h1 class="text-xl font-bold highlight">{title}</h1>
    <div class="text-sm">
      <span class="highlight">[</span>
      <span>ESC</span>
      <span class="highlight">]</span>
      <span> Exit | </span>
      <span class="highlight">[</span>
      <span>F1</span>
      <span class="highlight">]</span>
      <span> Help</span>
    </div>
  </div>
</header>