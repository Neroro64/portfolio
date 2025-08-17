<script lang="ts">
  let { title = 'Echoes of the Deep' } = $props();
  
  // Personal information
  const name = 'Alex Morgan';
  const email = 'alex.morgan@example.com';
  const jobTitle = 'Senior Frontend Developer';
  const motto = 'Crafting digital experiences with code and creativity';
</script>

<header>
  <div class="header-content">
    <div class="personal-info">
      <h1>{title}</h1>
      <p class="info-line">
        <span class="name">{name}</span>
        <span class="title">{jobTitle}</span>
        <span class="motto">{motto}</span>
        <span class="email"><a href={`mailto:${email}`}>{email}</a></span>
      </p>
    </div>
  </div>
</header>

<style>
  header {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--gruvbox-bg3);
    background-color: var(--gruvbox-bg0);
    /* Add blur effect */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); /* For Safari support */
    background-color: rgba(29, 32, 33, 0.7); /* Semi-transparent background to show blur effect */
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .personal-info {
    text-align: left;
  }
  
  .info-line {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .name {
    font-size: 1.5rem;
    margin: 0;
    color: var(--gruvbox-yellow);
  }
  
  .title {
    font-size: 1.1rem;
    margin: 0;
    color: var(--gruvbox-blue);
  }
  
  .motto {
    font-size: 0.9rem;
    margin: 0;
    color: var(--gruvbox-gray);
    font-style: italic;
  }
  
  .email {
    font-size: 0.9rem;
    margin: 0;
    color: var(--gruvbox-aqua);
  }
  
  .email a {
    color: var(--gruvbox-aqua);
    text-decoration: none;
  }
  
  .email a:hover {
    text-decoration: underline;
  }
</style>