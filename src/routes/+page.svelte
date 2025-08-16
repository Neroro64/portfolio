<script lang="ts">
  import { appStore } from '$lib/store';
  
  // Initialize with some sample data (already in store)
</script>

<div class="container">
  <h1>Welcome to Echoes of the Deep</h1>
  <p>This is a terminal-inspired portfolio website with Ranger-like navigation.</p>
  <p>Use the navigation panes to explore different sections of my work.</p>
  
  <div class="mt-4 p-2 border bg-black text-green-400 font-mono">
    <h2 class="highlight">Navigation Guide</h2>
    <ul class="mt-2">
      <li><span class="highlight">j/k or Arrow Keys</span> - Navigate between items in the current pane</li>
      <li><span class="highlight">Enter</span> - Select item to view details (drill down)</li>
      <li><span class="highlight">Tab</span> - Switch between panes</li>
    </ul>
  </div>
  
  <div class="mt-4 p-2 border bg-black text-green-400 font-mono">
    <h2 class="highlight">Ranger-like UX Pattern</h2>
    <p>This interface follows a cascading pane structure:</p>
    <ul class="mt-2">
      <li><span class="highlight">Left Pane</span> - Shows the broader context (sections)</li>
      <li><span class="highlight">Middle Pane</span> - Shows contents of selected item</li>
      <li><span class="highlight">Right Pane</span> - Shows detailed preview of selected item</li>
    </ul>
  </div>
</div>