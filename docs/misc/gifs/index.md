---
title: GIFs
description: GIFs from Tranistan
extra_head: |
  <script type="module" src="/js/misc/tranistan-gifs.js"></script>
  <link rel="stylesheet" href="/stylesheets/misc/tranistan-gifs.css">
---


# GIFs

<div class="options">
  <select id="sort-select" class="input noselect" style="width: 5rem;">
    <option value="TopAll">Top</option>
    <option value="New">New</option>
  </select>
  <!-- <select id="category-select" class="input noselect" style="width: 7rem;">
    <option value="all">All</option>
    <option value="new" selected>SFW Only</option>
  </select> -->
  <div class="search-container">
    <i class="fa-solid fa-magnifying-glass"></i>
    <input id="search-input" class="input" type="text" style="width: 15rem;">
  </div>
</div>

<gif-list></gif-list>
