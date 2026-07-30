---
title: Popularity of Modded Minecraft Versions
description: Charts showing the number of mods for different Minecraft versions on Modrinth and Curseforge.
image: https://desiresaregrey.com/assets/misc/minecraft/thumb.png
---
<script src="/js/utils/header-title-changer.js" data-mobile-title="Modded Minecraft Versions"></script>

<link rel="stylesheet" href="/stylesheets/misc/moddedminecraftversions.css">
<script type="module" src="/js/misc/moddedminecraftversions.js"></script>

# Popularity of Modded Minecraft Versions

***Update: Curseforge now caps at 10,000 mods per query so the Curseforge data is no longer accurate. Modrinth data is still accurate.***

Charts are Interactive! You can click on legend items to toggle the different options, and you can hover over points for total counts. Data is fetched
from Modrinth and Curseforge APIs, and are cached for 1 day (may take a bit to load the first time).

<div id="overall-total" style="min-height: 500px;"></div>

<div id="overall-versions">
  <div class="versions-row">
    <div class="label">Versions</div>
    <div id="overall-versions-update" class="button disabled fa-solid fa-arrow-rotate-right" style="margin: 0 0 1px -3px;"></div>
  </div>
  <div class="input-wrapper">
    <textarea id="overall-versions-input" class="big-input" rows="1"></textarea>
  </div>
</div>

___

<div class="chart-set">
  <input id="modrinth-a" class="vh" type="radio" name="view-modrinth" checked>
  <input id="modrinth-b" class="vh" type="radio" name="view-modrinth">
  
  <div class="chart-stack" style="min-height: 500px;">
    <div id="modrinth-loader" class="chart-layer layer-a"></div>
    <div id="modrinth-loader-ratio" class="chart-layer layer-b"></div>
  </div>
  <div class="toggle">
    <label for="modrinth-a" class="noselect">Bar</label>
    <label for="modrinth-b" class="noselect">Ratio</label>
  </div>
</div>

<div id="modrinth-versions">
  <div class="versions-row">
    <div class="label">Versions</div>
    <div id="modrinth-versions-update" class="button disabled fa-solid fa-arrow-rotate-right" style="margin: 0 0 1px -3px;"></div>
  </div>
  <div class="input-wrapper">
    <textarea id="modrinth-versions-input" class="big-input" rows="1"></textarea>
  </div>
</div>

___

**Curseforge currently caps at 10,000 mods per query so the Curseforge data is no longer accurate.**

<div class="chart-set">
  <input id="curseforge-a" class="vh" type="radio" name="view-curseforge" checked>
  <input id="curseforge-b" class="vh" type="radio" name="view-curseforge">
  
  <div class="chart-stack" style="min-height: 500px;">
    <div id="curseforge-loader" class="chart-layer layer-a"></div>
    <div id="curseforge-loader-ratio" class="chart-layer layer-b"></div>
  </div>
  <div class="toggle">
    <label for="curseforge-a" class="noselect">Bar</label>
    <label for="curseforge-b" class="noselect">Ratio</label>
  </div>
</div>

<div id="curseforge-versions">
  <div class="versions-row">
    <div class="label">Versions</div>
    <div id="curseforge-versions-update" class="button disabled fa-solid fa-arrow-rotate-right" style="margin: 0 0 1px -3px;"></div>
  </div>
  <div class="input-wrapper">
    <textarea id="curseforge-versions-input" class="big-input" rows="1"></textarea>
  </div>
</div>