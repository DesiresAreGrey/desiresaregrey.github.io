---
title: Gif Converter (Clientside)
description: Convert/Optimize gifs on your browser without uploading them to a server.
image: https://desiresaregrey.com/assets/misc/minecraft/thumb.png
---
<script src="/coi-serviceworker.js"></script>
<script type="module" src="/js/misc/gif-converter.js"></script>
<link rel="stylesheet" href="/stylesheets/misc/gif-converter.css">

# Gif Converter (Clientside)

<div class="gif-converter-container">

  <input id="video-input" type="file"  accept="video/mp4" />
  
  <div>
    <div class="preview-wrapper noselect">
      <video id="video-preview" class="preview" autoplay muted loop playsinline disablePictureInPicture></video>
    </div>
    <p id="video-info" style="font-size: 13px; color: #999; margin-top: 0.1rem; margin-bottom: 0; text-align: center;">Input Video</p>
  </div>

  <div class="settings">
    <div>
      <span style="min-width: 12ch; margin-top: 4px; margin-bottom: -0.325rem; font-size: 18px; font-variation-settings: 'wght' 600; opacity: 0.75">Resolution</span>
      <div style="float: right;">
        <span style="min-width: 12ch; margin-top: 4px; margin-bottom: -0.325rem; margin-right: -0.1rem; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.5">
          <span id="res-width">1920</span><span style="margin-left: 0.075rem; font-size: 12px;">x</span>
        </span>
        <input id="res-height-input" class="input" type="number" inputmode="decimal" step="1" value="1080" style="width: 3rem;">
      </div>
    </div>
    <div>
      <span style="min-width: 12ch; margin-top: 4px; margin-bottom: -0.325rem; font-size: 18px; font-variation-settings: 'wght' 600; opacity: 0.75">Frame Rate</span>
      <div style="float: right;">
        <input id="frame-rate-input" class="input" type="number" inputmode="decimal" step="1" value="30" style="width: 3rem;">
        <span style="min-width: 12ch; margin-top: 4px; margin-bottom: -0.325rem; margin-left: -0.1rem; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.5">FPS</span>
      </div>
    </div>
  </div>
  
  <button id="convert-button" disabled>Convert to GIF</button>
  
  <div>
    <div class="preview-wrapper noselect">
      <img id="output-gif" class="preview no-lb" />
    </div>
    <p id="gif-info" style="font-size: 13px; color: #999; margin-top: 0.1rem; margin-bottom: 0; text-align: center;">Output GIF</p>
  </div>
  
  <button id="download-button" disabled>Download GIF</button>

</div>