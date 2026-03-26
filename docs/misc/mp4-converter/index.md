---
title: Video to MP4 Converter
description: Convert videos into MP4/H.264 files entirely in your browser without uploading them to a server.
extra_head: |
  <script src="/js/components/settings.js"></script>
  <link rel="stylesheet" href="/stylesheets/components/settings.css">
  <link rel="manifest" href="/misc/mp4-converter/manifest.json"/>
  <link rel="apple-touch-icon" href="/assets/DesiresAreGrey192x.png"/>
---
<script type="module" src="/js/misc/mp4-converter.js"></script>
<link rel="stylesheet" href="/stylesheets/misc/mp4-converter.css">

# Video to MP4 Converter
<p class="description">The conversion happens in your browser without being uploaded/processed on a server. The page can also be added to your home
screen so it can be used offline.</p>

<div class="drop-overlay" style="display: none;">
  <i class="fa-solid fa-arrow-up-from-bracket" style="font-size: 48px;"></i>
</div>

<div class="converter-container">

  <input id="video-input" type="file" accept="video/*,.mkv" />
  
  <div>
    <div class="preview-wrapper noselect">
      <video id="in-video-preview" class="preview" autoplay controls playsinline disablePictureInPicture></video>
    </div>
    <p id="video-info" style="font-size: 13px; color: #999; margin-top: 0.1rem; margin-bottom: 0; text-align: center;">Input Video</p>
  </div>
  
  <button id="convert-button" disabled>Convert to MP4</button>
  
  <div>
    <div class="preview-wrapper noselect">
      <video id="out-video-preview" class="preview" autoplay controls playsinline disablePictureInPicture></video>
    </div>
    <p id="mp4-info" style="font-size: 13px; color: #999; margin-top: 0.1rem; margin-bottom: 0; text-align: center;">Output MP4</p>
  </div>
  
  <div class="button-row">
    <button id="share-button" disabled>Share MP4</button>
    <button id="upload-button" disabled>Upload MP4</button>
  </div>
  <div class="button-row">
    <button id="download-button" disabled>Download MP4</button>
  </div>
</div>