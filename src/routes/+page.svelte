<script lang="ts">
  import { appStore } from '$lib/store';
  
  // Initialize with some sample data (already in store)
</script>

<div class="container">
  <div class="panel">
    <h2>Welcome to Echoes of the Deep</h2>
    <p>This is a terminal-inspired portfolio website with Ranger-like navigation.</p>
    <p>Use the navigation panes to explore different sections of my work.</p>
    
    <div class="mt-4">
      <h3>Navigation Guide</h3>
      <ul class="mt-2">
        <li><span class="highlight">j/k or Arrow Keys</span> - Navigate between items</li>
        <li><span class="highlight">Enter</span> - Select item to view details</li>
      </ul>
    </div>
    
    <div class="mt-4">
      <h3>Ranger-like UX Pattern</h3>
      <p>This interface follows a cascading pane structure:</p>
      <ul class="mt-2">
        <li><span class="highlight">Left Pane</span> - Shows sections (Projects, Experience, Blog)</li>
        <li><span class="highlight">Middle Pane</span> - Shows contents of selected item</li>
        <li><span class="highlight">Right Pane</span> - Shows detailed preview</li>
      </ul>
    </div>
  </div>
</div>