---
title: MP4 to GIF Converter
description: Convert+optimize videos into gifs entirely in your browser without uploading them to a server.
image: https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Rotating_earth_%28large%29.gif/250px-Rotating_earth_%28large%29.gif
tags:
  - Miscellaneous
hide:
  - tags
extra_head: |
  <script src="/js/components/settings.js"></script>
  <link rel="stylesheet" href="/stylesheets/components/settings.css">
  <link rel="manifest" href="/misc/gif-converter/manifest.json"/>
  <link rel="apple-touch-icon" href="/assets/DesiresAreGrey192x.png"/>
---
<script type="module" src="/js/misc/gif-converter.js"></script>
<link rel="stylesheet" href="/stylesheets/misc/gif-converter.css">

# MP4 to GIF Converter
<p class="description">The conversion happens in your browser without being uploaded/processed on a server. The page can also be added to your home
screen so it can be used offline.</p>

<div class="drop-overlay" style="display: none;">
  <i class="fa-solid fa-arrow-up-from-bracket" style="font-size: 48px;"></i>
</div>

<div class="gif-converter-container">

  <input id="video-input" type="file" accept="video/*,.mkv" />
  
  <div>
    <div class="preview-wrapper noselect">
      <video id="video-preview" class="preview" autoplay muted loop playsinline disablePictureInPicture></video>
    </div>
    <p id="video-info" style="font-size: 13px; color: #999; margin-top: 0.1rem; margin-bottom: 0; text-align: center;">Input Video</p>
  </div>

  <setting-group disabled>
    <setting-item 
      id="setting-resolution"
      type="width-height"
      name="Resolution"
      subtitle="100%"
      default="640x360">
    </setting-item>
    <setting-item 
      id="setting-fps"
      type="number"
      name="Frame Rate"
      subtitle="100%"
      default="15"
      suffix="FPS">
    </setting-item>
    <setting-item 
      id="setting-speed"
      type="number"
      name="Speed"
      default="100"
      suffix="%">
    </setting-item>
    <setting-item 
      id="setting-quality"
      type="dropdown"
      name="Quality"
      tooltip="The quality of the output GIF's color palette.&#10;Higher qualities takes longer to process and are usually larger.&#10;&#10;High - Generates the palette from the whole video&#10;Medium - Generates the palette from the first frame of the video&#10;Fast - Uses the default color palette"
      options="high:High,medium:Medium,fast:Fast"
      default="high">
    </setting-item>
    <setting-item 
      id="setting-optimization"
      type="number"
      name="Compression"
      tooltip="The compression level of the output GIF using Gifsicle.&#10;Setting the compression level to 0 disables compression and optimization.&#10;&#10;Range: 0-200"
      default="50">
    </setting-item>
  </setting-group>
  
  <button id="convert-button" disabled>Convert to GIF</button>
  
  <div>
    <div class="preview-wrapper noselect">
      <img id="output-gif" class="preview no-lb" />
    </div>
    <p id="gif-info" style="font-size: 13px; color: #999; margin-top: 0.1rem; margin-bottom: 0; text-align: center;">Output GIF</p>
  </div>
  
  <div class="button-row">
    <button id="share-button" disabled>Share GIF</button>
    <button id="upload-button" disabled>Upload GIF</button>
  </div>
  <div class="button-row">
    <button id="download-button" disabled>Download GIF</button>
  </div>
</div>