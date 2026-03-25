---
title: File Uploader
description: Quickly upload files to FreeimageHost or Catbox.moe
extra_head: |
  <script src="/js/components/settings.js"></script>
  <link rel="stylesheet" href="/stylesheets/components/settings.css">
  <link rel="manifest" href="/misc/upload/manifest.json"/>
  <link rel="apple-touch-icon" href="/assets/DesiresAreGrey192x.png"/>
---
<script type="module" src="/js/misc/upload.js"></script>
<link rel="stylesheet" href="/stylesheets/misc/upload.css">

# File Uploader

<div class="drop-overlay" style="display: none;">
  <i class="fa-solid fa-arrow-up-from-bracket" style="font-size: 48px;"></i>
</div>

<input id="file-input" type="file"/>

<div class="preview-wrapper noselect">
  <video id="video-preview" class="preview" autoplay controls playsinline disablePictureInPicture></video>
  <img id="image-preview" class="preview no-lb"/>
</div>
<p id="file-info" style="font-size: 13px; color: #999; margin-top: 0.1rem; margin-bottom: 0; text-align: center;">0 MB</p>

<button id="upload-button" disabled>Upload</button>