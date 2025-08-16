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
      <p class="name">{name}</p>
      <p class="title">{jobTitle}</p>
      <p class="motto">{motto}</p>
      <p class="email"><a href={`mailto:${email}`}>{email}</a></p>
    </div>
  </div>
</header>

<style>
  header {
    padding: 1rem;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .personal-info {
    text-align: left;
  }
  
  .name {
    font-size: 1.5rem;
    margin: 0.25rem 0;
    color: var(--gruvbox-yellow);
  }
  
  .title {
    font-size: 1.1rem;
    margin: 0.25rem 0;
    color: var(--gruvbox-blue);
  }
  
  .motto {
    font-size: 0.9rem;
    margin: 0.25rem 0;
    color: var(--gruvbox-gray);
    font-style: italic;
  }
  
  .email {
    font-size: 0.9rem;
    margin: 0.25rem 0;
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