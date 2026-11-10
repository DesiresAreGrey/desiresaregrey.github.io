
import { defaultPatterns, WebHaptics } from 'web-haptics';
import { LoadingBar } from '../ui/loadingbar.js';
import OutLog from '../ui/outlog.js';
import { Popup } from '../ui/popup.js';
import { TimeSpan } from '../utils/timespan.js';
import { ErrorPopup } from '../ui/errorpopup.js';
import Catbox from '../utils/catbox.js';
import SWHelper from '../utils/swhelper.js';
import { getSettings, openSettingsPopup } from '../utils/site-settings.js';
import { BufferTarget, Conversion, Mp4OutputFormat, Output, Quality, type QualityLevel } from 'mediabunny';
import { VideoInput } from '../utils/mediabunny-helper.js';

if (getSettings().log.settings.showLoggingWindow.value)
    OutLog.show();

LoadingBar.startFullTrickle();

void SWHelper.addVersionToHeader();

await pwaSetup();
if (window.matchMedia('(display-mode: standalone)').matches) {
    const titlebar = $('header .md-header__title')!;
    
    titlebar.innerHTML += /* html */ `
        <div style="position: absolute; top: 0; right: 0;">
            <a id="settings-button" title="Settings" class="md-header__button md-icon" style="cursor: pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/></svg>
            </a>
        </div>
    `;
    titlebar.$('#settings-button')?.addEventListener('click', () => {
        openSettingsPopup();
    });
    titlebar.$('.md-header__ellipsis')?.addEventListener('click', () => {
        console.log("Copying URL to clipboard");
        navigator.clipboard.writeText(window.location.href);
        haptics.trigger(defaultPatterns.selection);
    });
}

const haptics = new WebHaptics();

await customElements.whenDefined('setting-item');

LoadingBar.finish();

let video: VideoInput | null = null;

const inVideoPreview = $id('in-video-preview') as HTMLVideoElement;

const fileInput = $id('video-input') as HTMLInputElement;
fileInput.addEventListener('change', selectedVideo);

const dropOverlay = $('.drop-overlay') as HTMLDivElement;

document.addEventListener('dragover', (e) => {
    if (!e.dataTransfer?.types.includes('Files'))
        return;
    e.preventDefault();
    
    dropOverlay.style.display = 'flex';
    void dropOverlay.offsetHeight;
    dropOverlay.classList.add('active')
});
document.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropOverlay.classList.remove('active');
    dropOverlay.runAfter(() => dropOverlay.style.display = 'none', 200);
});
document.addEventListener('drop', (e) => {
    e.preventDefault();
    dropOverlay.classList.remove('active');
    if (e.dataTransfer?.files?.item(0)) {
        fileInput.files = e.dataTransfer.files;
        selectedVideo();
    }
});

const transcodeSetting = $id('setting-transcode') as ToggleSettingItem;
transcodeSetting.input.addEventListener('change', changedReencodeSetting);

function changedReencodeSetting() {
    const transcodingSettings = $id('transcoding-settings') as SettingGroup;

    transcodeSetting.value ? transcodingSettings.enable() : transcodingSettings.disable();
}

// settings
const qualityLevelSetting = $id('setting-quality') as DropdownSettingItem;
type QualitySettingOptions = "custom" | "very-high" | "high" | "medium" | "low" | "very-low";

const sizeTargetSetting = $id('setting-size-target') as NumberSettingItem;

const resolutionSetting = $id('setting-resolution') as WidthHeightSettingItem;
const [widthInput, heightInput] = resolutionSetting.inputs;

const fpsSetting = $id('setting-fps') as NumberSettingItem;

const startEndSetting = $id('setting-start-end') as StartEndSettingItem;
const [startInput, endInput] = startEndSetting.inputs;

inVideoPreview.addEventListener('play', () => requestAnimationFrame(updateTime));
function updateTime() {
    if (video && (inVideoPreview.currentTime < Number(startInput.value) || (!Number(endInput.value).approx(video.duration, 0.05) && inVideoPreview.currentTime >= Number(endInput.value))))
        inVideoPreview.currentTime = Number(startInput.value);

    if (!inVideoPreview.paused && !inVideoPreview.ended)
        requestAnimationFrame(updateTime);
}

heightInput.addEventListener('input', () => {
    if (video == null)
        return;

    let height = parseInt(heightInput.value);
    if (height > video.height)
        height = video.height;
    else if (height < 1)
        height = 1;
    const width = Math.round(height * video.aspectRatio);

    heightInput.value = height.toString();
    widthInput.value = width.toString();
    updatePercentages();
});
widthInput.addEventListener('input', () => {
    if (video == null)
        return;

    let width = parseInt(widthInput.value);
    if (width > video.width)
        width = video.width;
    else if (width < 1)
        width = 1;
    const height = Math.round(width / video.aspectRatio);

    heightInput.value = height.toString();
    widthInput.value = width.toString();

    updatePercentages();
});

fpsSetting.input.addEventListener('input', updatePercentages);
fpsSetting.input.addEventListener('blur', () => {
    const frameRate = fpsSetting.value;
    if (frameRate < 1)
        fpsSetting.value = 1;

    updatePercentages();
});

let prevQualityLevel = qualityLevelSetting.value as QualityLevel;
async function updateQualitySettings() {
    const qualityLevel = qualityLevelSetting.value as QualitySettingOptions;
    
    if (sizeTargetSetting.value > 0) {
        if (qualityLevel !== "custom")
            prevQualityLevel = qualityLevel as QualityLevel;
        qualityLevelSetting.subtitle = "Using Size Target";
        sizeTargetSetting.subtitle = `~${sizeTargetSetting.value} MB`;
        qualityLevelSetting.value = "custom"
    }
    else {
        if (qualityLevel === "custom")
            qualityLevelSetting.value = prevQualityLevel;
        qualityLevelSetting.subtitle = "";
        sizeTargetSetting.subtitle = "Using Quality Level";
    }

    updatePercentages();
}

sizeTargetSetting.input.addEventListener('input', updateQualitySettings);
qualityLevelSetting.input.addEventListener('input', () => {
    const qualityLevel = qualityLevelSetting.value as QualitySettingOptions;
    if (qualityLevel === "custom" && sizeTargetSetting.value == 0)
        sizeTargetSetting.value = 10;
    else if (qualityLevel !== "custom" && sizeTargetSetting.value > 0)
        sizeTargetSetting.value = 0;
    updateQualitySettings();
});
updateQualitySettings();

async function updatePercentages() {
    if (!video)
        return;

    const width = Number(widthInput.value);
    resolutionSetting.subtitle = `${((width / video.width) * 100).roundTo(1)}%`;

    const speed = 1;
    
    const fpsPercentValue = (fpsSetting.value / (video.frameRateMetrics.bestGuessFrameRate.roundTo(1) * speed)) * 100;
    if (fpsPercentValue >= 5)
        fpsSetting.subtitle = fpsPercentValue.roundTo(2) + "%";
    else
        fpsSetting.subtitle =  fpsPercentValue.roundTo(3) + "%";
}

startInput.addEventListener('blur', startEndChanged);
endInput.addEventListener('blur', startEndChanged);

function startEndChanged() {
    const startValue = Number(startInput.value);
    const endValue = Number(endInput.value);
    inVideoPreview.currentTime = startValue;
    if (startValue !== 0 || (!endValue.approx(video?.duration ?? 0, 0.05) && endValue > startValue)) {
        startEndSetting.subtitle = 'Enabled';
    }
    else {
        startEndSetting.subtitle = '';
    }
}

const convertButton = $id('convert-button') as HTMLButtonElement;
convertButton.addEventListener('click', convertToMp4);

const outputVideo = $id('out-video-preview') as HTMLVideoElement;

const downloadButton = $id('download-button') as HTMLButtonElement;

let downloadUrl: string | null = null;
let downloadSize: number | null = null;
downloadButton.addEventListener('click', () => {
    if (!downloadUrl)
        return;
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = (video?.file.name.split('.').slice(0, -1).join('.') ?? "output") + '.mp4';

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    haptics.trigger(defaultPatterns.selection);
});

const shareButton = $id('share-button') as HTMLButtonElement;
if (!(navigator.canShare && navigator.canShare({ files: [new File(["test"], "test.mp4", { type: 'video/mp4' })] }))) {
    shareButton.style.display = 'none';
}

shareButton.addEventListener('click', async () => {
    if (!downloadUrl)
        return;

    const response = await fetch(downloadUrl);
    const blob = await response.blob();
    const file = new File([blob], (video?.file.name.split('.').slice(0, -1).join('.') ?? "output") + '.mp4', { type: 'video/mp4' });
    const shareData = {
      title: (video?.file.name.split('.').slice(0, -1).join('.') ?? "output"),
      files: [file] 
    };

    haptics.trigger(defaultPatterns.selection);

    if (navigator.canShare && navigator.canShare(shareData))
        await navigator.share(shareData);
});

let currentUploadUrl: string | null = null;
let lastDownloadUrl: string | null = null;

const uploadButton = $id('upload-button') as HTMLButtonElement;
uploadButton.addEventListener('click', async () => {
    if (!downloadUrl)
        return;

    if (downloadUrl === lastDownloadUrl && currentUploadUrl) {
        showUploadedPopup();
        return;
    }

    haptics.trigger(defaultPatterns.selection);
    
    uploadButton.disabled = true;
    
    const response = await fetch(downloadUrl);
    const blob = await response.blob();
    const file = new File([blob], (video?.file.name.split('.').slice(0, -1).join('.') ?? "output") + '.mp4', { type: 'video/mp4' });

    LoadingBar.startFullTrickle(TimeSpan.fromSeconds((file.size / 1250000 + 1).roundTo(0)));

    try {
        const uploadedUrl = await Catbox.upload(file);
        console.log(uploadedUrl);
        currentUploadUrl = uploadedUrl;
        lastDownloadUrl = downloadUrl;

        inVideoPreview.pause();
        outputVideo.pause();

        haptics.trigger(defaultPatterns.success);
        showUploadedPopup();
    }
    catch (e) {
        haptics.trigger(defaultPatterns.error);
        console.error("Upload failed", e);
        ErrorPopup.show(e ?? "Unknown error occurred", "Upload Failed");
    }
    finally {
        LoadingBar.finish();
        uploadButton.disabled = false;
    }
});

async function selectedVideo() {
    if (!fileInput.files || fileInput.files.length === 0)
        return;
    const file = fileInput.files[0];
    if (!file.type.startsWith('video/'))
        return;

    haptics.trigger(defaultPatterns.selection);

    inVideoPreview.src = URL.createObjectURL(file);

    LoadingBar.startTrickle();

    video = await VideoInput.fromFile(file);

    if (!video) {
        console.log('No video stream found in the file.');
        return;
    }

    LoadingBar.finish();

    if (video.codec === 'avc') {
        transcodeSetting.value = false;
        transcodeSetting.enable();
    }
    else {
        transcodeSetting.value = true;
        transcodeSetting.disable();
    }
    changedReencodeSetting();
    
    heightInput.value = video.height.toString();
    widthInput.value = video.width.toString();
    resolutionSetting.show();
    
    fpsSetting.value = video.frameRateMetrics.bestGuessFrameRate.roundTo(1);
    fpsSetting.show();

    startInput.value = '0';
    startEndSetting.setAttribute('duration', video.duration.toString());
    startEndSetting.show();

    qualityLevelSetting.show();
    sizeTargetSetting.show();

    const infoEl = $id('video-info') as HTMLParagraphElement;
    infoEl.innerHTML = getInfoHtml(video);
    convertButton.disabled = false;
    $("setting-group")?.removeAttribute('disabled');
}

async function convertToMp4() {
    if (!video)
        return;

    haptics.trigger(defaultPatterns.selection);

    convertButton.disabled = true;
    $("setting-group")?.setAttribute('disabled', '');
    LoadingBar.start();
    const start = performance.now();

    try {
        convertButton.textContent = "Loading...";

        const ext = video.file.name.split('.').slice(-1)[0];
        const startSeconds = Number(startInput.value);
        const endSeconds = Number(endInput.value);
        
        const output = new Output({
            format: new Mp4OutputFormat(),
            target: new BufferTarget()
        });

        const conversion = await Conversion.init({
            input: video.input,
            output,
            tracks: 'primary',

            video: transcodeSetting.value ? {
                codec: 'avc',
                width: Math.max(2, Math.round(Number(widthInput.value) / 2) * 2),
                frameRate: !video.frameRateMetrics.bestGuessFrameRate.approx(fpsSetting.value, 0.05) ? fpsSetting.value : undefined,
                quality: new Quality(qualityLevelSetting.value === "custom" ? {
                    bitrate: Math.floor((sizeTargetSetting.value * 1024 * 1024 * 8) / video.duration),
                    bitrateMode: 'variable'
                } : qualityLevelSetting.value as QualityLevel),
                hardwareAcceleration: 'no-preference',
                forceTranscode: true
            } : {
                codec: 'avc'
            },
            audio: {
                codec: 'aac'
            },

            trim: transcodeSetting.value && (startSeconds > 0 || !endSeconds.approx(video.duration, 0.05) && endSeconds > startSeconds) ? {
                start: startSeconds,
                end: endSeconds > startSeconds ? endSeconds : video.duration
            } : undefined
        });

        console.log(conversion);
        if (conversion.utilizedTracks.length > 0)
            console.log("Utilized tracks: ", conversion.utilizedTracks);
        if (conversion.discardedTracks.length > 0)
            console.log("Discarded tracks: ", conversion.discardedTracks);
        if (!conversion.isValid) {
            console.error("Conversion is not valid");
            throw "Conversion is not valid";
        }
    
        LoadingBar.update(0.1);
        convertButton.textContent = "Converting...";
        
        let lastProgress = 0;
        conversion.onProgress = (progress: number) => {
            if (progress - lastProgress >= 0.01) {
                lastProgress = progress;
                LoadingBar.update(progress.remap(0.1, 1));
                convertButton.textContent = `Converting ${Math.round(progress * 100)}%...`;
                console.log(`Conversion progress: ${Math.round(progress * 100)}%`);
            }
        };

        await conversion.execute();

        console.log("Mediabunny completed in", ((performance.now() - start) / 1000).roundTo(2), "seconds");

        const buffer = output.target.buffer;
        if (!buffer)
            throw new Error('No MP4 output was produced.');

        const blob = new Blob([buffer], { type: 'video/mp4' });

        const url = URL.createObjectURL(blob);
        outputVideo.src = url;
        inVideoPreview.pause();

        const infoEl = $id('mp4-info') as HTMLParagraphElement;
        if (infoEl)
            infoEl.innerHTML = getInfoHtml(await VideoInput.fromFile(new File([blob], video.file.name.split('.').slice(0, -1).join('.') + ".mp4")));

        downloadButton.disabled = false;
        shareButton.disabled = false;

        downloadUrl = url;
        downloadSize = blob.size;

        console.log("File size:", (downloadSize / (1024 * 1024)).roundTo(2), "MB");
                
        haptics.trigger(defaultPatterns.success);

        console.log("Conversion completed in", ((performance.now() - start) / 1000).roundTo(2), "seconds");

        uploadButton.disabled = true;
        // if (downloadSize <= 50 * 1024 * 1024 && await JsonFetch.isReachable(await API.url))
        //     uploadButton.disabled = false;
        // else
        //     uploadButton.disabled = true;   
    }
    catch (e) {
        haptics.trigger(defaultPatterns.error);
        ErrorPopup.show(e, "Conversion Failed");
    }
    finally {
        convertButton.textContent = "Convert to MP4";
        convertButton.disabled = false;
        LoadingBar.finish();
        $("setting-group")?.removeAttribute('disabled');
    }
}

function getInfoHtml(video: VideoInput | null) {
    console.log(video);
    if (!video)
        return "";
    return /* html */ `
        Size: <span style="font-weight: bold;">${(video.size / (1024 * 1024)).roundTo(2)} MB</span>
        •
        Format: <span style="font-weight: bold;">${video.file.name.split('.').slice(-1)[0].toUpperCase()}</span>
        •
        Codec: <span style="font-weight: bold;">${video.codec?.toUpperCase() ?? "Unknown"}</span>
        •
        Dimensions: <span style="font-weight: bold;">${video.width ?? "??"}x${video.height ?? "??"}</span>
        •
        FPS: <span style="font-weight: bold;">${video.frameRateMetrics.bestGuessFrameRate.roundTo(1)}</span>
        •
        Duration: <span style="font-weight: bold;">${TimeSpan.fromSeconds(video.duration).toTrimmedHms()}</span>
    `
}

async function showUploadedPopup() {
    const popup = await Popup.show( /* html */ `
        <div class="title" style="text-align: center;">MP4 Uploaded</div>
        <div class="preview-wrapper noselect">
            <video id="uploaded-mp4" class="preview no-lb" autoplay controls playsinline disablePictureInPicture src="${currentUploadUrl}"></video>
        </div>
        <p id="uploaded-link" style="font-size: 13px; color: #999; margin-top: 0.1rem; margin-bottom: 0; text-align: center;">${currentUploadUrl}</p>
        <div class="button-row" style="margin-top: 0.5rem;">
            <button id="copy-link-button"><i class="fa-solid fa-copy"></i> Link</button>
            <button id="copy-markdown-button"><i class="fa-solid fa-copy"></i> MD</button>
        </div>
    `);

    const copyLinkButton = popup.$id('copy-link-button') as HTMLButtonElement;
    const copyMarkdownButton = popup.$id('copy-markdown-button') as HTMLButtonElement;
    copyLinkButton.addEventListener('click', () => {
        if (!currentUploadUrl)
            return;
        navigator.clipboard.writeText(currentUploadUrl!);
        const icon = copyLinkButton.$("i")!;
        icon.classList.remove("fa-copy");
        icon.classList.add("fa-check");

        haptics.trigger(defaultPatterns.selection);

        copyLinkButton.runAfter(() => {
            icon.classList.remove("fa-check");
            icon.classList.add("fa-copy");
        }, 2500);
    });
    copyMarkdownButton.addEventListener('click', () => {
        if (!currentUploadUrl)
            return;
        navigator.clipboard.writeText(`![${video?.file.name.split('.').slice(0, -1).join('.') ?? "Video"}](${currentUploadUrl})`);
        const icon = copyMarkdownButton.$("i")!;
        icon.classList.remove("fa-copy");
        icon.classList.add("fa-check");

        haptics.trigger(defaultPatterns.selection);

        copyMarkdownButton.runAfter(() => {
            icon.classList.remove("fa-check");
            icon.classList.add("fa-copy");
        }, 2500);
    });
}

async function pwaSetup() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('sw.js', { scope: '/misc/mp4-converter/' });
            if (registration.installing)
                console.log("Service worker installing");
            else if (registration.waiting)
                console.log("Service worker installed");
            else if (registration.active)
                console.log("Service worker active");
            console.log("Registration scope:", registration.scope);
        }
        catch (error) {
            console.error("Registration failed with", error);
        }
        for (let registration of await navigator.serviceWorker.getRegistrations()) {
            if (!registration.active?.scriptURL.endsWith('sw.js')) {
                registration.unregister();
            }
        }
    }
}