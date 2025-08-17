<script lang="ts">
  /**
   * Component for displaying the site header.
   *
   * This component renders the main header of the portfolio site, including
   * the site title and personal information such as name, job title, motto,
   * and email address.
   */

  let { title = "Echoes of the Deep" } = $props();

  // Personal information
const name = "Nuo Chen";
const jobTitle = "Software engineer";
const email = "me@nuoc.dev";
const description = "This species is typically found in professional settings where reliability and ownership are paramount.";
const motto = "Every challenge is an opportunity to grow stronger."
</script>

<header>
  <div class="header-content">
    <div class="personal-info">
      <h1>{title}</h1>
      <p class="info-line">
        <span class="name">{name}</span>
        <span class="email"><a href={`mailto:${email}`}>{email}</a></span>
        <span class="title">{jobTitle}</span>
        <span class="motto">{motto}</span>
      </p>
      <p class="info-line">
        <span class="description">{description}</span>
      </p>
      <p class="info-line">
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
    background-color: rgba(
      29,
      32,
      33,
      0.7
    ); /* Semi-transparent background to show blur effect */
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
    gap: 2rem;
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

  .description {
    font-size: 0.9rem;
    margin: 0;
    font-style: italic;
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
