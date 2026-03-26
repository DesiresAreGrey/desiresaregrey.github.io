
import { defaultPatterns, WebHaptics } from 'web-haptics';
import { LoadingBar } from '../ui/loadingbar.js';
import OutLog from '../ui/outlog.js';
import { Popup } from '../ui/popup.js';
import { FFmpegHelper, Video } from '../utils/ffmpeg.js';
import { TimeSpan } from '../utils/timespan.js';
import { ErrorPopup } from '../ui/errorpopup.js';
import { API } from '../utils/api.js';
import { JsonFetch } from '../utils/jsonfetch.js';
import Catbox from '../utils/catbox.js';
import '../utils/utils.js';

OutLog.show();

await pwaSetup();

const haptics = new WebHaptics();

LoadingBar.startFullTrickle();

console.log("Loading FFmpeg...");
await FFmpegHelper.loadFFmpeg();
console.log("FFmpeg loaded");

await customElements.whenDefined('setting-item');

LoadingBar.finish();

let video: Video | null = null;

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
if (window.matchMedia('(display-mode: standalone)').matches) {
    $('header .md-header__title .md-header__ellipsis')?.addEventListener('click', () => {
        console.log("Copying URL to clipboard");
        navigator.clipboard.writeText(window.location.href);
        haptics.trigger(defaultPatterns.selection);
    });
}

const reencodeSetting = $id('setting-reencode') as SettingItem;
reencodeSetting.input.addEventListener('change', changedReencodeSetting);

function changedReencodeSetting() {
    if (reencodeSetting.input.value === 'true') {
        $id('reencode-settings')?.removeAttribute('disabled');
    }
    else {
        $id('reencode-settings')?.setAttribute('disabled', '');
    }
}

// settings
const speedSetting = $id('setting-speed') as SettingItem;
const qualitySetting = $id('setting-quality') as SettingItem;

const startEndSetting = $id('setting-start-end') as SettingItem;
const [startInput, endInput] = startEndSetting.inputs;

// inVideoPreview.addEventListener("timeupdate", () => {
//     if (video && (inVideoPreview.currentTime < Number(startInput.value) || (!Number(endInput.value).approx(video.format.duration, 0.1) && inVideoPreview.currentTime >= Number(endInput.value)))) {
//         inVideoPreview.currentTime = Number(startInput.value);
//     }
// });

inVideoPreview.addEventListener('play', () => requestAnimationFrame(updateTime));
function updateTime() {
    if (video && (inVideoPreview.currentTime < Number(startInput.value) || (!Number(endInput.value).approx(video.format.duration, 0.1) && inVideoPreview.currentTime >= Number(endInput.value))))
        inVideoPreview.currentTime = Number(startInput.value);

    if (!inVideoPreview.paused && !inVideoPreview.ended)
        requestAnimationFrame(updateTime);
}

startInput.addEventListener('blur', startEndChanged);
endInput.addEventListener('blur', startEndChanged);

function startEndChanged() {
    const startValue = Number(startInput.value);
    const endValue = Number(endInput.value);
    inVideoPreview.currentTime = startValue;
    if (startValue !== 0 || (!endValue.approx(video?.format.duration ?? 0, 0.1) && endValue > startValue)) {
        startEndSetting.subtitle = 'Trimming Enabled';
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
    video = await Video.fromFile(file);
    LoadingBar.finish();
    
    if (!video.videoStream) {
        console.log('No video stream found in the file.');
        return;
    }

    if (video.videoStream.codec_name === 'h264') {
        reencodeSetting.input.value = 'false';
        reencodeSetting.removeAttribute('disabled');
    }
    else {
        reencodeSetting.input.value = 'true';
        reencodeSetting.setAttribute('disabled', '');
    }
    changedReencodeSetting();

    startEndSetting.show();
    startInput.value = '0';
    startEndSetting.setAttribute('duration', video.format.duration.toString());

    const infoEl = $id('video-info') as HTMLParagraphElement;
    infoEl.innerHTML = getInfoHtml(video);
    convertButton.disabled = false;
    $("setting-group")?.removeAttribute('disabled');
}

async function convertToMp4() {
    if (!video?.videoStream)
        return;

    haptics.trigger(defaultPatterns.selection);

    convertButton.disabled = true;
    $("setting-group")?.setAttribute('disabled', '');
    LoadingBar.start();
    const start = performance.now();

    try {
        convertButton.textContent = "Loading...";

        const ext = video.file.name.split('.').slice(-1)[0];
        const fileData = await FFmpegHelper.fetchFile(video);
        await FFmpegHelper.writeFile(`input.${ext}`, fileData);
    
        LoadingBar.update(0.1);
        convertButton.textContent = "Converting...";

        let command: string[];
        if (reencodeSetting.input.value === 'false') {
            command = [
                '-i', `input.${ext}`, 
                '-c:v', 'copy',
                '-c:a', video.audioStreams[0]?.codec_name === 'aac' || video.audioStreams[0]?.codec_name === 'mp3'? 'copy' : 'aac',
                'output.mp4'
            ];
        }
        else {
            const startSeconds = Number(startInput.value);
            const endSeconds = Number(endInput.value);
            FFmpegHelper.durationMod = () => (endSeconds - startSeconds) / 1;

            const trimArgs: string[] = [
                ...(startSeconds > 0 ? ['-ss', String(startSeconds)] : []),
                ...(!endSeconds.approx(video.format.duration, 0.1) && endSeconds > startSeconds
                    ? ['-t', (endSeconds - startSeconds).toString()]
                    : [])
            ];

            command = [
                '-i', `input.${ext}`,
                ...trimArgs,
                '-c:v', 'libx264', 
                '-preset', speedSetting.input.value,
                '-crf', qualitySetting.input.value,
                '-c:a', 'aac',
                '-vf', 'format=yuv420p',
                'output.mp4'
            ];
        }
        
        console.log("FFmpeg", command.join(' '));
        FFmpegHelper.onProgress = (progress: number) => LoadingBar.update(progress.remap(0.1, 1));
        if (await FFmpegHelper.run(video, command) !== 0)
            throw "FFMpeg error(s):<br>" + [...FFmpegHelper.errors].join('<br>');

        console.log("FFmpeg completed in", ((performance.now() - start) / 1000).roundTo(2), "seconds");

        const data = await FFmpegHelper.readFile('output.mp4');
        const blob = new Blob([new Uint8Array(data as Uint8Array)], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        outputVideo.src = url;
        inVideoPreview.pause();

        const infoEl = $id('mp4-info') as HTMLParagraphElement;
        if (infoEl)
            infoEl.innerHTML = getInfoHtml(await Video.fromFile(new File([blob], video.file.name.split('.').slice(0, -1).join('.') + ".mp4")));

        downloadButton.disabled = false;
        shareButton.disabled = false;

        downloadUrl = url;
        downloadSize = blob.size;

        console.log("File size:", (downloadSize / (1024 * 1024)).roundTo(2), "MB");

        try {
            void FFmpegHelper.deleteFiles([`input.${ext}`, 'output.mp4']);
        }
        catch {}
                
        haptics.trigger(defaultPatterns.success);

        console.log("Conversion completed in", ((performance.now() - start) / 1000).roundTo(2), "seconds");

        if (downloadSize <= 50 * 1024 * 1024 && await JsonFetch.isReachable(await API.url))
            uploadButton.disabled = false;
        else
            uploadButton.disabled = true;   
    }
    catch (e) {
        haptics.trigger(defaultPatterns.error);
        ErrorPopup.show(e, "Conversion Failed");
    }
    finally {
        convertButton.textContent = "Convert to MP4";
        convertButton.disabled = false;
        LoadingBar.finish();
        FFmpegHelper.resetOnProgress();
        $("setting-group")?.removeAttribute('disabled');
    }
}

function getInfoHtml(video: Video) {
    console.log(video);
    return /* html */ `
        Size: <span style="font-weight: bold;">${(video.format.size / (1024 * 1024)).roundTo(2)} MB</span>
        •
        Format: <span style="font-weight: bold;">${video.format.filename.split('.').slice(-1)[0].toUpperCase()}</span>
        •
        Codec: <span style="font-weight: bold;">${video.videoStream?.codec_long_name?.split('/')[0].trim()
            .replace('H.265', "HEVC") ?? "Unknown"}</span>
        •
        Dimensions: <span style="font-weight: bold;">${video.videoStream?.width ?? "??"}x${video.videoStream?.height ?? "??"}</span>
        •
        FPS: <span style="font-weight: bold;">${video.fps.roundTo(2)}</span>
        •
        Duration: <span style="font-weight: bold;">${TimeSpan.fromSeconds(video.format.duration).toTrimmedHms()}</span>
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