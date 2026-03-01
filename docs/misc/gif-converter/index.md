---
title: MP4 to GIF Converter
description: Convert+optimize videos into gifs entirely in your browser without uploading them to a server.
image: https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Rotating_earth_%28large%29.gif/250px-Rotating_earth_%28large%29.gif
extra_head: |
  <link rel="manifest" href="/misc/gif-converter/manifest.json"/>
  <link rel="apple-touch-icon" href="/assets/DesiresAreGrey192x.png" />
---
<script type="module" src="/js/misc/gif-converter.js"></script>
<link rel="stylesheet" href="/stylesheets/misc/gif-converter.css">

# MP4 to GIF Converter
<p class="description">The conversion happens in your browser without being uploaded/processed on a server. The page can also be added to your home
screen so it can be used offline.</p>

<div class="drop-overlay" style="display: none;">
  <i class="fa-solid fa-arrow-up-from-bracket" style="font-size: 48px;"></i>
</div>

<div class="uploaded-overlay" style="display: none;">
  <div class="popup">
    <i class="fa-solid fa-xmark close"></i>
    <div class="title" style="text-align: center;">GIF Uploaded</div>
    <div class="preview-wrapper noselect">
      <img id="uploaded-gif" class="preview no-lb" />
    </div>
    <p id="uploaded-link" style="font-size: 13px; color: #999; margin-top: 0.1rem; margin-bottom: 0; text-align: center;">Output GIF</p>
    <div class="button-row" style="margin-top: 0.5rem;">
      <button id="copy-link-button" disabled><i class="fa-solid fa-copy"></i> Link</button>
      <button id="copy-markdown-button" disabled><i class="fa-solid fa-copy"></i> MD</button>
    </div>
  </div>
</div>

<div class="gif-converter-container">

  <input id="video-input" type="file" accept="video/*" />
  
  <div>
    <div class="preview-wrapper noselect">
      <video id="video-preview" class="preview" autoplay muted loop playsinline disablePictureInPicture></video>
    </div>
    <p id="video-info" style="font-size: 13px; color: #999; margin-top: 0.1rem; margin-bottom: 0; text-align: center;">Input Video</p>
  </div>

  <div class="settings disabled">
    <div>
      <span class="title">Resolution</span>
      <span id="res-percent" class="subtitle">100%</span>
      <div style="float: right;">
        <input id="res-width-input" class="input" type="number" inputmode="decimal" step="1" value="1920" style="width: 3rem;">
        <span style="min-width: 12ch; margin-top: 4px; margin-bottom: -0.325rem; margin-right: -0.1rem; margin-left: -0.1rem; font-size: 12px; font-variation-settings: 'wght' 400; opacity: 0.5">x</span>
        <input id="res-height-input" class="input" type="number" inputmode="decimal" step="1" value="1080" style="width: 3rem;">
      </div>
    </div>
    <div>
      <span class="title">Frame Rate</span>
      <span id="fps-percent" class="subtitle">100%</span>
      <div style="float: right;">
        <input id="frame-rate-input" class="input" type="number" inputmode="decimal" step="1" value="30" style="width: 3rem;">
        <span style="min-width: 12ch; margin-top: 4px; margin-bottom: -0.325rem; margin-left: -0.1rem; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.5">FPS</span>
      </div>
    </div>
    <div>
      <span class="title">Speed</span>
      <div style="float: right;">
        <input id="speed-input" class="input" type="number" inputmode="decimal" step="1" value="100" style="width: 3rem;">
        <span style="min-width: 12ch; margin-top: 4px; margin-bottom: -0.325rem; margin-left: -0.1rem; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.5">%</span>
      </div>
    </div>
    <div>
      <span class="title tooltip" data-tooltip="The quality of the output GIF's color palette.&#10;Higher qualities takes longer to process and are usually larger.&#10;&#10;High - Generates the palette from the whole video&#10;Medium - Generates the palette from the first frame of the video&#10;Fast - Uses the default color palette">Quality</span>
      <div style="float: right;">
        <select id="palette-quality-select" class="input noselect" style="width: 5.5rem;">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="fast">Fast</option>
        </select>
      </div>
    </div>
    <div>
      <span class="title tooltip" data-tooltip="The compression level of the output GIF using Gifsicle.&#10;Setting the compression level to 0 disables compression and optimization.">Compression</span>
      <span id="optimization-enabled" class="subtitle"></span>
      <div style="float: right;">
        <input id="optimization-input" class="input" type="number" inputmode="decimal" step="1" value="50" style="width: 3rem;">
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
  
  <div class="button-row">
    <button id="share-button" disabled>Share GIF</button>
    <button id="upload-button" disabled>Upload GIF</button>
  </div>
  <div class="button-row">
    <button id="download-button" disabled>Download GIF</button>
  </div>
</div>