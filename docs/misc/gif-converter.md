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
    <div class="preview-wrapper">
      <video id="video-preview" class="preview" autoplay muted loop playsinline disablePictureInPicture></video>
    </div>
    <p id="video-info" style="font-size: 13px; color: #999; margin-top: 0.1rem; margin-bottom: 0; text-align: center;">Test</p>
  </div>
  
  
  
  <button id="convert-button" disabled>Convert to GIF</button>
  
  <div>
    <div class="preview-wrapper">
      <img id="output-gif" class="preview no-lb" />
    </div>
    <p id="gif-info" style="font-size: 13px; color: #999; margin-top: 0.1rem; margin-bottom: 0; text-align: center;">Test</p>
  </div>
  
  <button id="download-button" disabled>Download GIF</button>

</div>