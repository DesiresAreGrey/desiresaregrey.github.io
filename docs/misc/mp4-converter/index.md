---
title: Video to MP4 Converter
description: Convert and compress videos into MP4/H.264 files entirely in your browser without uploading them to a server.
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

  <setting-group disabled>
    <setting-item 
      id="setting-transcode"
      type="dropdown"
      name="Transcode"
      width="4.5rem"
      tooltip="Transcode the video or just change the container to MP4.&#10;Transcoding takes significantly longer but can fix compatibility issues and reduce file size."
      options="true:Yes,false:No"
      default="false">
    </setting-item>
    <setting-group id="transcoding-settings" style="margin-top: 0">
      <setting-item 
        id="setting-speed"
        type="dropdown"
        name="Speed"
        width="7rem"
        tooltip="Faster presets result in faster encoding but larger file sizes and potentially lower quality.&#10;Ultra Fast produces very large files compared to the rest, while also having significantly more artifacts. Almost never worth using over Super Fast."
        options="ultrafast:Ultra Fast,superfast:Super Fast,veryfast:Very Fast,faster:Faster,fast:Fast,medium:Medium,slow:Slow,slower:Slower,veryslow:Very Slow"
        default="veryfast">
      </setting-item>
      <setting-item 
        id="setting-quality"
        type="number"
        name="Quality"
        subtitle="CRF"
        tooltip="The quality of the output video using Constant Rate Factor.&#10;A lower value generally leads to higher quality, consider 17 or 18 to be visually lossless or nearly so. The range is exponential, so increasing the CRF value +6 results in roughly half the bitrate / file size, while -6 leads to roughly twice the bitrate."
        min="17"
        max="28"
        default="23">
      </setting-item>
      <setting-item 
        id="setting-start-end"
        type="start-end"
        name="Trim"
        tooltip="Set the start and end time of the output video.&#10;You can preview the trim on the input video"
        width="3.5rem"
        hidden>
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