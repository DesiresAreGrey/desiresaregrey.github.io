---
title: Apex Legends Weapon Stats
description: Compare detailed weapon stats for Apex Legends weapons across across seasons, firing modes, and weapon variants.
image: https://api.desiresaregrey.com/misc/apex/season-icon.png
tags:
  - Miscellaneous
hide:
  - tags
extra_head: |
  <link rel="manifest" href="/misc/apex-weapon-stats/manifest.json"/>
  <link rel="apple-touch-icon" href="https://api.desiresaregrey.com/misc/apex/season-icon.png?size=192"/>
---
<link rel="stylesheet" href="/stylesheets/misc/apex-weapon-stats.css">
<script type="module" src="apexweaponstats.js"></script>

# Apex Legends Weapon Stats

<hr id="top-divider">

<div id="settings" style="margin: -0.5rem 0; gap: 1rem;">
  <div class="side">
    <div class="label">Weapons</div>
    <div class="side">
      <a id="decrease-columns" class="big-button plusminus-button noselect" style="opacity: 0.5; pointer-events: none;">-</a>
      <p id="column-count" class="noselect" style="margin: 0; font-size: 0.9rem;">2</p>
      <a id="increase-columns" class="big-button plusminus-button noselect" style="opacity: 0.5; pointer-events: none;">+</a>
    </div>
  </div>
  <div style="height: 0.35rem;"></div>
  <div class="side">
    <div class="label">Units</div>
    <input type="checkbox" id="converted-values-toggle" class="toggleCheckbox" />
    <label for="converted-values-toggle" class='toggleContainer'>
      <div class="noselect" style="margin-right: 48px;margin-left: 24px;padding-left: 0px;padding-right: 16px;">Converted</div>   
      <div class="noselect" style="margin-right: 24px;margin-left: 0px;padding-left: 0px;padding-right: 16px;">Engine</div>
    </label>
  </div>
  <div style="height: 0.35rem;"></div>
  <div class="side">
    <div class="label">Auto Hide Rows</div>
    <input type="checkbox" id="auto-hide-rows-toggle" class="toggleCheckbox" />
    <label for="auto-hide-rows-toggle" class='toggleContainer'>
      <div class="noselect" style="margin-right: 48px;margin-left: 24px;padding-left: 0px;padding-right: 5px;">Yes</div>   
      <div class="noselect" style="margin-right: 24px;margin-left: 0px;padding-left: 0px;padding-right: 5px;">No</div>
    </label>
  </div>
  <div style="height: 0.35rem;"></div>
  <div class="side">
    <div class="label">Save to URL</div>
    <input type="checkbox" id="save-to-url-toggle" class="toggleCheckbox" />
    <label for="save-to-url-toggle" class='toggleContainer'>
      <div class="noselect" style="margin-right: 48px;margin-left: 24px;padding-left: 0px;padding-right: 5px;">Yes</div>   
      <div class="noselect" style="margin-right: 24px;margin-left: 0px;padding-left: 0px;padding-right: 5px;">No</div>
    </label>
  </div>
</div>

___

<div id="weapon" class="comparison">
  <div class="column" id="column-template">
    <div class="dropdowns">
      <select class="dropdown season-dropdown" style="width: 100%;"><option value="">Season</option></select>
      <select class="dropdown weapon-dropdown" style="width: 100%;"><option value="">Weapon</option></select>
      <select class="dropdown mode-dropdown" style="width: 100%;"><option value="">Mode</option></select>
    </div>
    <h3 id="ammo">Ammo</h3>
    <div class="stat">
      <span class="label">Type</span>
      <span class="value" id="ammo-type">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Magazine Size</span>
      <span class="value" id="magazine-size">-</span>
    </div>
    <div class="stat">
      <span class="label">Time to Empty</span>
      <span class="value" id="time-to-empty">-</span>
    </div>
    <h3 id="firing">Firing</h3>
    <div class="stat">
      <span class="label">Firing Mode</span>
      <span class="value" id="firing-mode">-</span>
    </div>
    <div class="stat">
      <span class="label">Firerate</span>
      <span class="value" id="firerate">-</span>
    </div>
    <div class="stat">
      <span class="label">Rechamber Time</span>
      <span class="value" id="rechamber-time">-</span>
    </div>
    <div class="stat">
      <span class="label">Charge Time</span>
      <span class="value" id="charge-time">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Burst Count</span>
      <span class="value" id="burst-count">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Burst Delay</span>
      <span class="value" id="burst-delay">-</span>
    </div>
    <div class="stat">
      <span class="label">Burst Firerate</span>
      <span class="value" id="burst-firerate">-</span>
    </div>
    <h3 id="shot">Shot</h3>
    <div class="stat thin-divider">
      <span class="label">Projectiles Per Shot</span>
      <span class="value" id="projectiles-per-shot">-</span>
    </div>
    <div class="stat">
      <span class="label">Ammo Consumed</span>
      <span class="value" id="ammo-consumed">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Projectile Speed</span>
      <span class="value" id="projectile-speed">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Drag Coefficient</span>
      <span class="value" id="drag-coefficient">-</span>
    </div>
    <div class="stat">
      <span class="label">Gravity Multiplier</span>
      <span class="value" id="gravity-multiplier">-</span>
    </div>
    <div class="stat">
      <span class="label">Max Headshot Distance</span>
      <span class="value" id="max-headshot-distance">-</span>
    </div>
    <div style="border-bottom: 1px solid rgba(255,255,255,0.125);">
      <h3 id="projectile-damage" style="border-bottom: none;">Projectile Damage</h3>
      <div style="font-size: 0.5rem; opacity: 0.7; margin-top: 0; display: flex; align-items: center; justify-content: center;">Body / Head / Limb</div>
    </div>
    <div class="stat">
      <span class="label">Base</span>
      <span class="value" id="damage-amount">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Flesh</span>
      <span class="value" id="damage-flesh">-</span>
    </div>
    <div class="stat">
      <span class="label">Shield</span>
      <span class="value" id="damage-shield">-</span>
    </div>
    <div class="stat">
      <span class="label">Critical Hit</span>
      <span class="value" id="damage-critical">-</span>
    </div>
    <form class="tabs">
      <div class="toggle">
        <label class="noselect"><input id="damage-distance-near-tab" class="vh" type="radio" name="damage-distance" checked>Near</label>
        <label class="noselect"><input id="damage-distance-far-tab" class="vh" type="radio" name="damage-distance">Far</label>
        <label class="noselect"><input id="damage-distance-very-far-tab" class="vh" type="radio" name="damage-distance">Very Far</label>
      </div>
    </form>
    <div style="border-bottom: 1px solid rgba(255,255,255,0.125);">
      <h3 id="shot-damage" style="border-bottom: none;">Shot Damage</h3>
      <div style="font-size: 0.5rem; opacity: 0.7; margin-top: 0; display: flex; align-items: center; justify-content: center;">Body / Head / Limb</div>
    </div>
    <div class="stat">
      <span class="label">Base</span>
      <span class="value" id="shot-damage-amount">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Flesh</span>
      <span class="value" id="shot-damage-flesh">-</span>
    </div>
    <div class="stat">
      <span class="label">Shield</span>
      <span class="value" id="shot-damage-shield">-</span>
    </div>
    <div class="stat">
      <span class="label">Critical Hit</span>
      <span class="value" id="shot-damage-critical">-</span>
    </div>
    <form class="tabs">
      <div class="toggle">
        <label class="noselect"><input id="shot-damage-distance-near-tab" class="vh" type="radio" name="shot-damage-distance" checked>Near</label>
        <label class="noselect"><input id="shot-damage-distance-far-tab" class="vh" type="radio" name="shot-damage-distance">Far</label>
        <label class="noselect"><input id="shot-damage-distance-very-far-tab" class="vh" type="radio" name="shot-damage-distance">Very Far</label>
      </div>
    </form>
    <div style="border-bottom: 1px solid rgba(255,255,255,0.125);">
      <h3 id="shots-to-kill" style="border-bottom: none;">Shots To Kill</h3>
      <div style="font-size: 0.5rem; opacity: 0.7; margin-top: 0; display: flex; align-items: center; justify-content: center;">Body / Head / Limb</div>
    </div>
    <div class="stat thin-divider">
      <span class="label" style="color:var(--base);">No Armor</span>
      <span class="value" id="shotstokill-base">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label" style="color:var(--common);">Common</span>
      <span class="value" id="shotstokill-common">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label" style="color:var(--rare);">Rare</span>
      <span class="value" id="shotstokill-rare">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label" style="color:var(--epic);">Epic</span>
      <span class="value" id="shotstokill-epic">-</span>
    </div>
    <div class="stat">
      <span class="label" style="color:var(--mythic);">Mythic</span>
      <span class="value" id="shotstokill-mythic">-</span>
    </div>
    <form class="tabs">
      <div class="toggle">
        <label class="noselect"><input id="shotstokill-distance-near-tab" class="vh" type="radio" name="shotstokill-distance" checked>Near</label>
        <label class="noselect"><input id="shotstokill-distance-far-tab" class="vh" type="radio" name="shotstokill-distance">Far</label>
        <label class="noselect"><input id="shotstokill-distance-very-far-tab" class="vh" type="radio" name="shotstokill-distance">Very Far</label>
      </div>
    </form>
    <h3 id="dps">Damage Per Second</h3>
    <div class="stat thin-divider">
      <span class="label">Body <span class="label-subtitle">BASE</span></span>
      <span class="value" id="dps-base-body">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Head <span class="label-subtitle">BASE</span></span>
      <span class="value" id="dps-base-head">-</span>
    </div>
    <div class="stat">
      <span class="label">Limb <span class="label-subtitle">BASE</span></span>
      <span class="value" id="dps-base-limb">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Body <span class="label-subtitle">FLESH</span></span>
      <span class="value" id="dps-flesh-body">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Head <span class="label-subtitle">FLESH</span></span>
      <span class="value" id="dps-flesh-head">-</span>
    </div>
    <div class="stat">
      <span class="label">Limb <span class="label-subtitle">FLESH</span></span>
      <span class="value" id="dps-flesh-limb">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Body <span class="label-subtitle">SHIELD</span></span>
      <span class="value" id="dps-shield-body">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Head <span class="label-subtitle">SHIELD</span></span>
      <span class="value" id="dps-shield-head">-</span>
    </div>
    <div class="stat">
      <span class="label">Limb <span class="label-subtitle">SHIELD</span></span>
      <span class="value" id="dps-shield-limb">-</span>
    </div>
    <form class="tabs">
      <div class="toggle">
        <label class="noselect"><input id="dps-distance-near-tab" class="vh" type="radio" name="dps-distance" checked>Near</label>
        <label class="noselect"><input id="dps-distance-far-tab" class="vh" type="radio" name="dps-distance">Far</label>
        <label class="noselect"><input id="dps-distance-very-far-tab" class="vh" type="radio" name="dps-distance">Very Far</label>
      </div>
    </form>
    <h3 id="tdpm">Total Damage Per Magazine</h3>
    <div class="stat thin-divider">
      <span class="label">Body <span class="label-subtitle">BASE</span></span>
      <span class="value" id="tdpm-base-body">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Head <span class="label-subtitle">BASE</span></span>
      <span class="value" id="tdpm-base-head">-</span>
    </div>
    <div class="stat">
      <span class="label">Limb <span class="label-subtitle">BASE</span></span>
      <span class="value" id="tdpm-base-limb">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Body <span class="label-subtitle">FLESH</span></span>
      <span class="value" id="tdpm-flesh-body">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Head <span class="label-subtitle">FLESH</span></span>
      <span class="value" id="tdpm-flesh-head">-</span>
    </div>
    <div class="stat">
      <span class="label">Limb <span class="label-subtitle">FLESH</span></span>
      <span class="value" id="tdpm-flesh-limb">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Body <span class="label-subtitle">SHIELD</span></span>
      <span class="value" id="tdpm-shield-body">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Head <span class="label-subtitle">SHIELD</span></span>
      <span class="value" id="tdpm-shield-head">-</span>
    </div>
    <div class="stat">
      <span class="label">Limb <span class="label-subtitle">SHIELD</span></span>
      <span class="value" id="tdpm-shield-limb">-</span>
    </div>
    <form class="tabs">
      <div class="toggle">
        <label class="noselect"><input id="tdpm-distance-near-tab" class="vh" type="radio" name="tdpm-distance" checked>Near</label>
        <label class="noselect"><input id="tdpm-distance-far-tab" class="vh" type="radio" name="tdpm-distance">Far</label>
        <label class="noselect"><input id="tdpm-distance-very-far-tab" class="vh" type="radio" name="tdpm-distance">Very Far</label>
      </div>
    </form>
    <h3 id="ttk">Time To Kill</h3>
    <div class="stat thin-divider">
      <span class="label">Body <span class="label-subtitle" style="color:var(--base); opacity: 0.8;">NO ARMOR</span></span>
      <span class="value" id="ttk-no-armor-body">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Head <span class="label-subtitle" style="color:var(--base); opacity: 0.8;">NO ARMOR</span></span>
      <span class="value" id="ttk-no-armor-head">-</span>
    </div>
    <div class="stat">
      <span class="label">Limb <span class="label-subtitle" style="color:var(--base); opacity: 0.8;">NO ARMOR</span></span>
      <span class="value" id="ttk-no-armor-limb">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Body <span class="label-subtitle" style="color:var(--common); opacity: 0.8;">COMMON</span></span>
      <span class="value" id="ttk-common-body">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Head <span class="label-subtitle" style="color:var(--common); opacity: 0.8;">COMMON</span></span>
      <span class="value" id="ttk-common-head">-</span>
    </div>
    <div class="stat">
      <span class="label">Limb <span class="label-subtitle" style="color:var(--common); opacity: 0.8;">COMMON</span></span>
      <span class="value" id="ttk-common-limb">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Body <span class="label-subtitle" style="color:var(--rare); opacity: 0.8;">RARE</span></span>
      <span class="value" id="ttk-rare-body">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Head <span class="label-subtitle" style="color:var(--rare); opacity: 0.8;">RARE</span></span>
      <span class="value" id="ttk-rare-head">-</span>
    </div>
    <div class="stat">
      <span class="label">Limb <span class="label-subtitle" style="color:var(--rare); opacity: 0.8;">RARE</span></span>
      <span class="value" id="ttk-rare-limb">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Body <span class="label-subtitle" style="color:var(--epic); opacity: 0.8;">EPIC</span></span>
      <span class="value" id="ttk-epic-body">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Head <span class="label-subtitle" style="color:var(--epic); opacity: 0.8;">EPIC</span></span>
      <span class="value" id="ttk-epic-head">-</span>
    </div>
    <div class="stat">
      <span class="label">Limb <span class="label-subtitle" style="color:var(--epic); opacity: 0.8;">EPIC</span></span>
      <span class="value" id="ttk-epic-limb">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Body <span class="label-subtitle" style="color:var(--mythic); opacity: 0.8;">MYTHIC</span></span>
      <span class="value" id="ttk-mythic-body">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Head <span class="label-subtitle" style="color:var(--mythic); opacity: 0.8;">MYTHIC</span></span>
      <span class="value" id="ttk-mythic-head">-</span>
    </div>
    <div class="stat">
      <span class="label">Limb <span class="label-subtitle" style="color:var(--mythic); opacity: 0.8;">MYTHIC</span></span>
      <span class="value" id="ttk-mythic-limb">-</span>
    </div>
    <form class="tabs">
      <div class="toggle">
        <label class="noselect"><input id="ttk-distance-near-tab" class="vh" type="radio" name="ttk-distance" checked>Near</label>
        <label class="noselect"><input id="ttk-distance-far-tab" class="vh" type="radio" name="ttk-distance">Far</label>
        <label class="noselect"><input id="ttk-distance-very-far-tab" class="vh" type="radio" name="ttk-distance">Very Far</label>
      </div>
    </form>
    <h3 id="projectile-size">Projectile Size</h3>
    <div class="stat thin-divider">
      <span class="label">Initial Size</span>
      <span class="value" id="initial-size">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Step 1</span>
      <span class="value" id="step-1">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Step 2</span>
      <span class="value" id="step-2">-</span>
    </div>
    <div class="stat">
      <span class="label">Final Step</span>
      <span class="value" id="final-step">-</span>
    </div>
    <h3 id="patterns">Patterns</h3>
    <div class="stat">
      <span class="label">Recoil Pattern</span>
      <svg class="pattern" id="recoil-pattern" style="background:#111;border:1px solid #333"></svg>
    </div>
    <div class="stat">
      <span class="label">Blast Pattern</span>
      <svg class="pattern" id="blast-pattern" style="background:#111;border:1px solid #333"></svg>
    </div>
    <h3 id="reload-time">Reload Time</h3>
    <div class="stat thin-divider">
      <span class="label">Tac Reload</span>
      <span class="value" id="reload-tac">-</span>
    </div>
    <div class="stat">
      <span class="label">Empty Reload</span>
      <span class="value" id="reload-empty">-</span>
    </div>
    <h3 id="handling">Handling</h3>
    <div class="stat">
      <span class="label">First Pickup Time</span>
      <span class="value" id="pickup-time">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Equip Time</span>
      <span class="value" id="equip-time">-</span>
    </div>
    <div class="stat">
      <span class="label">Holster Time</span>
      <span class="value" id="holster-time">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Raise Time</span>
      <span class="value" id="raise-time">-</span>
    </div>
    <div class="stat">
      <span class="label">Lower Time</span>
      <span class="value" id="lower-time">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Zoom In Time</span>
      <span class="value" id="zoom-in-time">-</span>
    </div>
    <div class="stat">
      <span class="label">Zoom Out Time</span>
      <span class="value" id="zoom-out-time">-</span>
    </div>
    <div class="stat">
      <span class="label">ADS Movement Speed Multiplier</span>
      <span class="value" id="ads-movement-speed-multiplier">-</span>
    </div>
    <h3 id="spread">Spread</h3>
    <div class="stat thin-divider">
      <span class="label">Decay Delay</span>
      <span class="value" id="spread-decay-delay">-</span>
    </div>
    <div class="stat">
      <span class="label">Decay Rate</span>
      <span class="value" id="spread-decay-rate">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Increase Rate <span class="label-subtitle">MOVING</span></span>
      <span class="value" id="spread-increase-rate-moving">-</span>
    </div>
    <div class="stat">
      <span class="label">Decay Rate <span class="label-subtitle">MOVING</span></span>
      <span class="value" id="spread-decay-rate-moving">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Standing <span class="label-subtitle">HIPFIRE</span></span>
      <span class="value" id="spread-standing-hipfire">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Walking <span class="label-subtitle">HIPFIRE</span></span>
      <span class="value" id="spread-walking-hipfire">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Sprinting <span class="label-subtitle">HIPFIRE</span></span>
      <span class="value" id="spread-sprinting-hipfire">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Crouching <span class="label-subtitle">HIPFIRE</span></span>
      <span class="value" id="spread-crouching-hipfire">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">In Air <span class="label-subtitle">HIPFIRE</span></span>
      <span class="value" id="spread-in-air-hipfire">-</span>
    </div>
    <div class="stat">
      <span class="label">Hovering <span class="label-subtitle">HIPFIRE</span></span>
      <span class="value" id="spread-hovering-hipfire">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Standing <span class="label-subtitle">ADS</span></span>
      <span class="value" id="spread-standing-ads">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">Crouching <span class="label-subtitle">ADS</span></span>
      <span class="value" id="spread-crouching-ads">-</span>
    </div>
    <div class="stat thin-divider">
      <span class="label">In Air <span class="label-subtitle">ADS</span></span>
      <span class="value" id="spread-in-air-ads">-</span>
    </div>
    <div class="stat">
      <span class="label">Hovering <span class="label-subtitle">ADS</span></span>
      <span class="value" id="spread-hovering-ads">-</span>
    </div>

  </div>
</div>

<h2 id="info" style="margin-top: 1.5rem;">Info</h2>

<div style="margin-top: -0.5rem;">
  <p style="margin-top: 0.25rem; font-size: 0.7rem; opacity: 0.7;">
    Season versions are formatted as <code>Season.Split.Hotfix</code>.
  </p>
  <p style="margin-top: 0.25rem; font-size: 0.7rem; opacity: 0.7;">
    Data was extracted from the game using RSX (exported as .vdf files), then later parsed into json using a C# program. The folder linked above
    contains a _index.json file, which is the list of all the seasons. sXX.json is the json file loaded by the site, while the sXX-archive.zip file
    contains all the vdf files, individual weapon json files, and csv files of all the blast/recoil patterns.
  </p>
  <p style="margin-top: 0.25rem; font-size: 0.7rem; opacity: 0.7;">
    Hotfixes are created manually using info released in posts by Respawn rather than pulling the stats using the files from the game, since hotfixes
    are usually serversided.
  </p>
  <p style="margin-top: 0; font-size: 0.7rem; opacity: 0.7;">
    The process is somewhat automated so it should be very easy to update as Apex updates with new seasons/splits.
  </p>
  <div>
    <a href="https://github.com/DesiresAreGrey/Website/tree/main/docs/assets/misc/apex-weapon-stats/data">Browse/Download data</a>
  </div>

  <h3 id="info-calculations">Calculations</h3>
  <div style="margin-top: 0.25rem; font-size: 0.7rem; opacity: 0.7;">
    <p style="margin-bottom: 0.35rem;">
      <span style="font-weight: bold;">Meters:</span> 
      <span style="font-size: 0.65rem;">HammerUnits * 0.0254</span>
    </p>
    <p style="margin-bottom: 0; margin-top: 0.35rem; font-weight: bold; ">Effective RPM:</p>
    <div style="margin-left: 1rem; font-size: 0.65rem;">
      <span style="font-weight: bold;">if RechamberTime:</span> 
      <span style="font-size: 0.6rem;">1 / Math.max(1 / EngineRPS, RechamberTime)</span>
      <br>
      <span style="font-weight: bold;">if BurstCount:</span>
      <span style="font-size: 0.6rem;">BurstCount / (BurstCount / EngineRPS + BurstDelay)</span>
      <br>
      <span style="font-weight: bold;">if Charged Semi Auto:</span> 1 / (1 / EngineRPS + ChargeTime);
      <br>
      <span style="font-weight: bold;">else:</span> 
      <span style="font-size: 0.6rem;">EngineRPS * 60</span>
    </div>
    <p style="margin-bottom: 0.35rem; margin-top: 0.35rem;">
      <span style="font-weight: bold;">Time to Empty:</span> 
      <span style="font-size: 0.65rem;">MagazineSize / (AmmoConsumed * (EffectiveRPM) / 60)</span>
    </p>
    <p style="margin-bottom: 0.35rem; margin-top: 0.35rem;">
      <span style="font-weight: bold;">Projectile Damage:</span> 
      <span style="font-size: 0.65rem;">ProjectileDamage * PartMultiplier</span>
    </p>
    <p style="margin-bottom: 0.35rem; margin-top: 0.35rem;">
      <span style="font-weight: bold;">Shot Damage:</span> 
      <span style="font-size: 0.65rem;">Projectiles * ProjectileDamage</span>
    </p>
    <p style="margin-bottom: 0; margin-top: 0.35rem; font-weight: bold; ">Shots to Kill:</p>
    <div style="margin-left: 1rem; font-size: 0.65rem;">
      <p style="margin-bottom: 0.0rem; margin-top: 0.0rem;">
        <span style="font-weight: bold; font-size: 0.65rem;">No Armor:</span> 
        <span style="font-size: 0.6rem;">StkHealth(100, ShotDamage, PartMultiplier)</span>
      </p>
      <p style="margin-bottom: 0.0rem; margin-top: 0.0rem;">
        <span style="font-weight: bold; font-size: 0.65rem;">Common Armor:</span> 
        <span style="font-size: 0.6rem;">StkHealthAndShield(100, 50, ShotDamage, PartMultiplier)</span>
      </p>
      <p style="margin-bottom: 0.0rem; margin-top: 0.0rem;">
        <span style="font-weight: bold; font-size: 0.65rem;">Rare Armor:</span> 
        <span style="font-size: 0.6rem;">StkHealthAndShield(100, 75, ShotDamage, PartMultiplier)</span>
      </p>
      <p style="margin-bottom: 0.0rem; margin-top: 0.0rem;">
        <span style="font-weight: bold; font-size: 0.65rem;">Epic Armor:</span> 
        <span style="font-size: 0.6rem;">StkHealthAndShield(100, 100, ShotDamage, PartMultiplier)</span>
      </p>
      <p style="margin-bottom: 0.0rem; margin-top: 0.0rem;">
        <span style="font-weight: bold; font-size: 0.65rem;">Mythic Armor:</span> 
        <span style="font-size: 0.6rem;">StkHealthAndShield(100, 125, ShotDamage, PartMultiplier)</span>
      </p>
      <span style="font-weight: bold;">Helpers:</span>
      <div style="margin-left: 1rem; font-size: 0.65rem;">
        <span style="font-weight: bold;">StkCalc(hp, baseDamage, baseMultiplier, partMultiplier = 1):</span> 
        <span style="font-size: 0.6rem;">hp / baseDamage.multFloor(partMultiplier * baseMultiplier)</span>
        <br>
        <span style="font-weight: bold;">StkHealth(health, baseDamage, partMultiplier):</span> 
        <span style="font-size: 0.6rem;">Math.ceil(StkCalc(health, baseDamage, fleshMultiplier, partMultiplier))</span>
        <br>
        <span style="font-weight: bold;">StkHealthAndShield(health, shield, baseDamage, partMultiplier):</span> 
        <span style="font-size: 0.6rem;">Math.ceil(StkCalc(health, baseDamage, fleshMultiplier, partMultiplier) + StkCalc(shield, baseDamage, shieldMultiplier, partMultiplier))</span>
        <br>
      </div>
    </div>
    <p style="margin-bottom: 0.35rem; margin-top: 0.35rem;">
      <span style="font-weight: bold;">Damage Per Second:</span> 
      <span style="font-size: 0.65rem;">ShotDamage * (EffectiveRPM / 60) * PartMultiplier</span>
    </p>
    <p style="margin-bottom: 0.35rem; margin-top: 0.35rem;">
      <span style="font-weight: bold;">Total Damage Per Magazine:</span> 
      <span style="font-size: 0.65rem;">Math.floor(Math.floor(ShotDamage * MagazineSize) / AmmoConsumed)</span>
    </p>
    <p style="margin-bottom: 0.35rem; margin-top: 0.35rem;">
      <span style="font-weight: bold;">Time To Kill:</span> 
      <span style="font-size: 0.65rem;">((ShotsToKill - 1) / FireRate) + ChargeTime</span>
    </p>
  </div>
</div>
<div style="margin-top: 1em;">
  <a href="https://github.com/DesiresAreGrey/Website/blob/main/docs/misc/apex-weapon-stats/apex-weapon-stats.js">View Page Code</a>
</div>

<!-- fake toc -->
## Settings {#settings .faketoc}

## Weapon {#weapon .faketoc}
### Ammo {#ammo .faketoc}
### Firing {#firing .faketoc}
#### Shot {#shot .faketoc}
##### Projectile Damage {#projectile-damage .faketoc}
##### Shot Damage {#shot-damage .faketoc}
##### Shots to Kill {#shots-to-kill .faketoc}
##### Damage Per Second {#dps .faketoc}
##### Total Damage Per Magazine {#tdpm .faketoc}
##### Time To Kill {#ttk .faketoc}
##### Projectile Size {#projectile-size .faketoc}
#### Patterns {#patterns .faketoc}
### Reload Time {#reload-time .faketoc}
### Handling {#handling .faketoc}
### Spread {#spread .faketoc}

## Info {#info .faketoc}