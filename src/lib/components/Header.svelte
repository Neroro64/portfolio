<script lang="ts">
  import { appStore } from '$lib/store';
  
  let { title = 'Echoes of the Deep' } = $props();
</script>

<header class="border p-2 mb-4 bg-black text-green-400 font-mono">
  <div class="flex justify-between items-center">
    <h1 class="text-xl font-bold">{title}</h1>
    <div class="text-sm">
      <span>[</span>
      <span>ESC</span>
      <span>] Exit | </span>
      <span>[</span>
      <span>F1</span>
      <span>] Help</span>
    </div>
  </div>
</header>