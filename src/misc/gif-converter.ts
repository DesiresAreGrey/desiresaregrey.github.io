import { LoadingBar } from '../ui/loadingbar.js';
import { Popup } from '../ui/popup.js';
import { TimeSpan } from '../utils/timespan.js';
import { FFmpegHelper, Video, Gif, Media } from '../utils/ffmpeg.js';
import { API } from '../utils/api.js';
import { JsonFetch } from '../utils/jsonfetch.js';
import { Utils } from '../utils/utils.js';
import { WebHaptics, defaultPatterns } from 'web-haptics';
// @ts-ignore
import gifsicle from 'gifsicle-wasm-browser';

await pwaSetup();

const haptics = new WebHaptics();

LoadingBar.startTrickle();

await FFmpegHelper.loadFFmpeg()

LoadingBar.finish();

let video: Video | null = null;

const videoPreview = $id('video-preview') as HTMLVideoElement;

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
    Utils.runAfter(() => dropOverlay.style.display = 'none', 200, dropOverlay);
});
document.addEventListener('drop', (e) => {
    e.preventDefault();
    dropOverlay.classList.remove('active');
    if (e.dataTransfer?.files?.item(0)) {
        fileInput.files = e.dataTransfer.files;
        selectedVideo();
    }
});

const heightInput = $id('setting-resolution')?.$('.height') as HTMLInputElement;
const widthInput = $id('setting-resolution')?.$('.width') as HTMLInputElement;
const resPercent = $id('setting-resolution')?.$('.subtitle') as HTMLSpanElement;

heightInput.addEventListener('input', () => {
    if (video?.videoStream == null)
        return;

    let height = parseInt(heightInput.value);
    if (height > video.videoStream.height)
        height = video.videoStream.height;
    else if (height < 1)
        height = 1;
    const width = Math.round(height * video.aspectRatio);

    heightInput.value = height.toString();
    widthInput.value = width.toString();
    updatePercentages();
});
widthInput.addEventListener('input', () => {
    if (video?.videoStream == null)
        return;

    let width = parseInt(widthInput.value);
    if (width > video.videoStream.width)
        width = video.videoStream.width;
    else if (width < 1)
        width = 1;
    const height = Math.round(width / video.aspectRatio);

    heightInput.value = height.toString();
    widthInput.value = width.toString();

    updatePercentages();
});

const frameRateInput = $id('setting-fps')?.$('input') as HTMLInputElement;
const fpsPercent = $id('setting-fps')?.$('.subtitle') as HTMLSpanElement;

frameRateInput.addEventListener('input', updatePercentages);
frameRateInput.addEventListener('blur', () => {
    const frameRate = parseFloat(frameRateInput.value);
    if (frameRate < 1)
        frameRateInput.value = '1';
    else if (frameRate > 50)
        frameRateInput.value = '50';

    updatePercentages();
});

const speedInput = $id('setting-speed')?.$('input') as HTMLInputElement;
speedInput.addEventListener('input', updatePercentages);
speedInput.addEventListener('blur', () => {
    let speed = parseFloat(speedInput.value);
    if (isNaN(speed) || speed < 1)
        speed = 1;
    else if (speed > 10000)
        speed = 10000;
    speedInput.value = speed.toString();

    updatePercentages();
});

async function updatePercentages() {
    if (!video?.videoStream)
        return;

    const width = parseInt(widthInput.value);
    resPercent.textContent = `${((width / video.videoStream.width) * 100).roundTo(1)}%`;

    const frameRate = parseFloat(frameRateInput.value);
    const speed = parseFloat(speedInput.value) / 100;
    
    const fpsPercentValue = (frameRate / (video.fps * speed)) * 100;
    if (fpsPercentValue >= 5)
        fpsPercent.textContent = fpsPercentValue.roundTo(2) + "%";
    else
        fpsPercent.textContent =  fpsPercentValue.roundTo(3) + "%";
}

const paletteQuality = $id('setting-quality')?.$('select') as HTMLSelectElement;

const optimizationInput = $id('setting-optimization')?.$('input') as HTMLInputElement;
const optimizationEnabled = $id('setting-optimization')?.$('.subtitle') as HTMLSpanElement;
optimizationInput.addEventListener('blur', () => {
    let compression = parseInt(optimizationInput.value);
    if (isNaN(compression) || compression < 1) {
        compression = 0;
        optimizationEnabled.textContent = "Optimization Disabled";
    }
    else {
        optimizationEnabled.textContent = "";
    }
        
    if (compression > 200)
        compression = 200;

    optimizationInput.value = compression.toString();
});

const convertButton = $id('convert-button') as HTMLButtonElement;
convertButton.addEventListener('click', convertToGif);

const outputImg = $id('output-gif') as HTMLImageElement;

const downloadButton = $id('download-button') as HTMLButtonElement;

let downloadUrl: string | null = null;
let downloadSize: number | null = null;
downloadButton.addEventListener('click', () => {
    if (!downloadUrl)
        return;
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = (video?.file.name.split('.').slice(0, -1).join('.') ?? "output") + '.gif';

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    haptics.trigger(defaultPatterns.selection);
});

const shareButton = $id('share-button') as HTMLButtonElement;
if (!(navigator.canShare && navigator.canShare({ files: [new File(["test"], "test.gif", { type: 'image/gif' })] }))) {
    shareButton.style.display = 'none';
}

shareButton.addEventListener('click', async () => {
    if (!downloadUrl)
        return;

    const response = await fetch(downloadUrl);
    const blob = await response.blob();
    const file = new File([blob], (video?.file.name.split('.').slice(0, -1).join('.') ?? "output") + '.gif', { type: 'image/gif' });
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

    LoadingBar.start();
    uploadButton.disabled = true;
    
    const response = await fetch(downloadUrl);
    const blob = await response.blob();
    const file = new File([blob], (video?.file.name.split('.').slice(0, -1).join('.') ?? "output") + '.gif', { type: 'image/gif' });
    if (file.size > 50 * 1024 * 1024)
        return;

    const reader = new FileReader();
    reader.onload = async () => {
        try {
            const base64String = reader.result?.toString().replace("data:", "").replace(/^.+,/, "");
            if (base64String) {
                const upload = await API.post("proxy/freeimage/upload", {
                    base64Image: base64String,
                });
                console.log(upload.image.url);
                currentUploadUrl = upload.image.url;
                lastDownloadUrl = downloadUrl;

                showUploadedPopup();
                
                haptics.trigger(defaultPatterns.success);
            }
        }
        catch (error) {
            console.error("Upload failed", error);
        }

        LoadingBar.finish();
        uploadButton.disabled = false;
    }
    reader.readAsDataURL(file);
});

async function selectedVideo() {
    if (!fileInput.files || fileInput.files.length === 0)
        return;
    const file = fileInput.files[0];
    if (!file.type.startsWith('video/'))
        return;

    haptics.trigger(defaultPatterns.selection);

    videoPreview.src = URL.createObjectURL(file);

    LoadingBar.startTrickle();
    video = await Video.fromFile(file);
    LoadingBar.finish();
    
    if (!video.videoStream) {
        console.log('No video stream found in the file.');
        return;
    }

    heightInput.value = (video.videoStream.height / 2).toString();
    widthInput.value = (video.videoStream.width / 2).toString();
    if (video.fps > 30)
        frameRateInput.value = (video.fps.roundTo() / 4).toString();
    else
        frameRateInput.value = (video.fps.roundTo() / 2).toString();
    updatePercentages();

    const infoEl = $id('video-info') as HTMLParagraphElement;
    infoEl.innerHTML = getInfoHtml(video);
    convertButton.disabled = false;
    $("setting-group")?.removeAttribute('disabled');
}

async function convertToGif() {
    if (!video)
        return;

    haptics.trigger(defaultPatterns.selection);

    convertButton.disabled = true;
    $("setting-group")?.setAttribute('disabled', '');
    LoadingBar.start();
    const start = performance.now();

    convertButton.textContent = "Loading...";

    const fileData = await FFmpegHelper.fetchFile(video);
    await FFmpegHelper.writeFile('input.mp4', fileData);

    LoadingBar.update(0.1);
    convertButton.textContent = "Converting...";

    const newWidth = widthInput.value.parseFloat()?.roundTo(0) ?? video.videoStream!.width / 4;
    const frameRate = frameRateInput.value.parseFloat()?.roundTo(2) ?? 15;
    const speed = (speedInput.value.parseFloat()?.roundTo(2) ?? 100) / 100;
    const compression = optimizationInput.value.parseFloat()?.roundTo(0) ?? 0;
    const compressionEnabled = compression > 0;

    let palette: string | null = null;
    switch (paletteQuality.value) {
        case "high": palette = "split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse"; break;
        case "medium": palette = "split[s0][s1];[s0]select='eq(n\\,0)',palettegen[p];[s1][p]paletteuse"; break;
        case "fast": palette = null; break;
    }

    const filters = [
        speed !== 1 ? `setpts=PTS/${speed}` : null,
        `fps=${frameRate}`,
        `scale=${newWidth}:-1:flags=lanczos`,
        palette 
    ];

    const command = [
        '-i', 'input.mp4', 
        '-vf', filters.filter(f => f !== null).join(','),
        '-c:v', 'gif', 
        'unoptimized.gif'
    ];

    console.log("FFmpeg", command.join(' '));

    FFmpegHelper.durationMod = d => d ? d / speed : 0;
    FFmpegHelper.onProgress = (progress: number) => LoadingBar.update(progress.remap(0.1, compressionEnabled ? 0.8 : 1));
    await FFmpegHelper.run(video, command);

    if (compressionEnabled) {
        LoadingBar.update(0.8);
        convertButton.textContent = "Optimizing...";
        console.log("FFmpeg completed in", ((performance.now() - start) / 1000).roundTo(2), "seconds");

        const unoptimizedData = await FFmpegHelper.readFile('unoptimized.gif');
        const unoptimizedBlob = new Blob([new Uint8Array(unoptimizedData as Uint8Array)], { type: 'image/gif' });

        console.log("File size before optimization:", (unoptimizedBlob.size / (1024 * 1024)).roundTo(2), "MB");

        const command = `-O1 --lossy=${compression} unoptimized.gif -o /out/final.gif`;

        console.log("gifsicle", command);
        const optimizedFiles: File[] = await gifsicle.run({
            input: [{
                file: unoptimizedBlob,
                name: "unoptimized.gif"
            }],
            command: [command]
        });

        const finalBlob = new Blob([optimizedFiles[0]], { type: 'image/gif' });
        const url = URL.createObjectURL(finalBlob);
        outputImg.src = url;
        downloadUrl = url;
        downloadSize = finalBlob.size;
        videoPreview.load();

        console.log("File size after optimization:", (finalBlob.size / (1024 * 1024)).roundTo(2), "MB");
        console.log("File size reduction:", ((finalBlob.size - unoptimizedBlob.size) / (1024 * 1024)).roundTo(2), "MB");

        const infoEl = $id('gif-info') as HTMLParagraphElement;
        if (infoEl)
            infoEl.innerHTML = getInfoHtml(await Gif.fromFile(optimizedFiles[0]));
    }
    else {
        const data = await FFmpegHelper.readFile('unoptimized.gif');
        const blob = new Blob([new Uint8Array(data as Uint8Array)], { type: 'image/gif' });
        const url = URL.createObjectURL(blob);
        outputImg.src = url;
        downloadUrl = url;
        downloadSize = blob.size;
        videoPreview.load();

        console.log("File size:", (blob.size / (1024 * 1024)).roundTo(2), "MB");

        const infoEl = $id('gif-info') as HTMLParagraphElement;
        if (infoEl)
            infoEl.innerHTML = getInfoHtml(await Gif.fromFile(new File([blob], "output.gif")));
    }

    downloadButton.disabled = false;
    shareButton.disabled = false;

    void FFmpegHelper.deleteFiles(['input.mp4', 'unoptimized.gif']);
    
    convertButton.textContent = "Convert to GIF";
    convertButton.disabled = false;
    $("setting-group")?.removeAttribute('disabled');
    LoadingBar.finish();
    FFmpegHelper.resetOnProgress();
    
    haptics.trigger(defaultPatterns.success);

    console.log("Conversion completed in", ((performance.now() - start) / 1000).roundTo(2), "seconds");

    if (downloadSize < 50 * 1024 * 1024 && await JsonFetch.isReachable(await API.url))
        uploadButton.disabled = false;
    else
        uploadButton.disabled = true;
}

function getInfoHtml(media: Media) {
    console.log(media);
    return `
        Size: <span style="font-weight: bold;">${(media.format.size / (1024 * 1024)).roundTo(2)} MB</span>
        •
        Dimensions: <span style="font-weight: bold;">${media.videoStream?.width ?? "??"}x${media.videoStream?.height ?? "??"}</span>
        •
        FPS: <span style="font-weight: bold;">${media.fps.roundTo(2)}</span>
        •
        Duration: <span style="font-weight: bold;">${TimeSpan.fromSeconds(media.format.duration).toTrimmedHms()}</span>
    `
}

async function showUploadedPopup() {
    const popup = await Popup.showPopup( /* html */ `
        <div class="title" style="text-align: center;">GIF Uploaded</div>
        <div class="preview-wrapper noselect">
            <img id="uploaded-gif" class="preview no-lb"  src="${currentUploadUrl}"/>
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

        Utils.runAfter(() => {
            icon.classList.remove("fa-check");
            icon.classList.add("fa-copy");
        }, 2500, copyLinkButton);
    });
    copyMarkdownButton.addEventListener('click', () => {
        if (!currentUploadUrl)
            return;
        navigator.clipboard.writeText(`![${video?.file.name.split('.').slice(0, -1).join('.') ?? "GIF"}](${currentUploadUrl})`);
        const icon = copyMarkdownButton.$("i")!;
        icon.classList.remove("fa-copy");
        icon.classList.add("fa-check");

        haptics.trigger(defaultPatterns.selection);

        Utils.runAfter(() => {
            icon.classList.remove("fa-check");
            icon.classList.add("fa-copy");
        }, 2500, copyMarkdownButton);
    });
}

async function pwaSetup() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('sw.js', { scope: '/misc/gif-converter/' });
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