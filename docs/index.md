---
image: https://desiresaregrey.com/assets/DesiresAreGrey.png
---
<link rel="stylesheet" href="/stylesheets/socialmedia.css">
<link rel="preload" href="assets/DesiresAreGrey.png" as="image">

<style>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 70vh;
  opacity: 0;
  animation: fadeInUp 750ms ease-out 250ms forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-pic {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 1rem;
  box-shadow: 0 0 48px #3c02e899;
}

.home-title {
  font-size: 2em !important;
  font-weight: 800 !important;
  color: #FFFFFF !important;
  margin-bottom: 0.25rem;
  letter-spacing: -1.5px;
}

.home-subtitle {
  font-size: 1.2rem;
  font-weight: 350 !important;
  color: #c4c4c4;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 2rem;
  font-size: 0.8rem;
  font-variation-settings: 'wght' 650;
  transition: all 200ms ease !important;
}
.social-link:hover {
  font-variation-settings: 'wght' 800;
}

.social-link .fa-brands {
  font-size: 1.2rem;
}
</style>

<div class="home-container">
  <img class="profile-pic no-lb" src="assets/DesiresAreGrey.png">
  <h1 class="home-title">DesiresAreGrey</h1>
  <p class="home-subtitle">passoid of color</p>
  <div class="social-links">
    <a class="social-link noselect reddit" href="https://www.reddit.com/user/DesiresAreGrey" target="_blank">
      <i class="fa-brands fa-reddit-alien"></i>
      <span>Reddit</span>
    </a>
    <a class="social-link noselect twitter" href="https://twitter.com/DesiresAreGrey" target="_blank">
      <i class="fa-brands fa-twitter"></i>
      <span>Twitter</span>
    </a>
    <a class="social-link noselect youtube" href="https://www.youtube.com/@DesiresAreGrey" target="_blank">
      <i class="fa-brands fa-youtube"></i>
      <span>YouTube</span>
    </a>
  </div>
</div>