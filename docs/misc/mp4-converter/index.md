---
title: Video to MP4 Converter
description: Convert and compress videos into MP4/H.264 files entirely in your browser without uploading them to a server.
tags:
  - Miscellaneous
hide:
  - tags
settings: Video,Log
extra_head: |
  <link rel="stylesheet" href="/stylesheets/components/settings.css">
  <link rel="manifest" href="/misc/mp4-converter/manifest.json"/>
  <link rel="apple-touch-icon" href="/assets/DesiresAreGrey192x.png"/>
---
<script type="module" src="/js/misc/mp4-converter.js"></script>
<link rel="stylesheet" href="/stylesheets/misc/mp4-converter.css">

# Video to MP4 Converter
<p class="description">The conversion happens in your browser using <a href="https://mediabunny.dev" target="_blank">Mediabunny</a> without being uploaded/processed on a server. The page can also be added to your home
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

  <setting-group disabled>
    <setting-item 
      id="setting-transcode"
      type="toggle"
      name="Transcode"
      tooltip="Transcode the video or just change the container to MP4.&#10;Transcoding takes significantly longer but can fix compatibility issues and reduce file size."
      default="true">
    </setting-item>
    <setting-group id="transcoding-settings">
      <setting-item 
        id="setting-resolution"
        type="width-height"
        name="Resolution"
        subtitle="100%"
        default="1920x1080"
        hidden>
      </setting-item>
      <setting-item 
        id="setting-fps"
        type="number"
        name="Frame Rate"
        subtitle="100%"
        suffix="FPS"
        hidden>
      </setting-item>
      <setting-item 
        id="setting-start-end"
        type="start-end"
        name="Trim"
        tooltip="Set the start and end time of the output video.&#10;You can preview the trim on the input video"
        width="3.5rem"
        hidden>
      </setting-item>
      <setting-item 
        id="setting-quality"
        type="dropdown"
        name="Quality Level"
        width="6rem"
        options="custom:Custom,very-high:Very High,high:High,medium:Medium,low:Low,very-low:Very Low"
        default="medium">
      </setting-item>
      <setting-item 
        id="setting-size-target"
        type="number"
        name="File Size Target"
        subtitle="MB"
        tooltip="The target file size for the output video.&#10;Calculates the bitrate using the input and duration."
        min="0"
        max="100">
      </setting-item>
    </setting-group>
  </setting-group>
  
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