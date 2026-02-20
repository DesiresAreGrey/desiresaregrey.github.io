import { LoadingBar } from '../utils/loadingbar.js';
import { TimeSpan } from '../utils/timespan.js';
import '../utils/utils.js';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
// @ts-ignore
import gifsicle from 'gifsicle-wasm-browser';

LoadingBar.startTrickle();

const ffmpeg = new FFmpeg();

const progress = (progress: number) => LoadingBar.update(progress);
let updateProgress = progress;

let latestDuration = 0;
ffmpeg.on('log', ({ message }) => {
    console.log('[FFmpeg]', message);

    if (message.includes("Duration:")) {
        const durationMatch = message.match(/Duration: (\d{2}):(\d{2}):(\d{2})\.(\d{2})/) ?? [];
        const duration = (+durationMatch[1]) * 3600 + (+durationMatch[2]) * 60 + (+durationMatch[3]) + (+durationMatch[4]) / 100;
        console.log(`Video duration: ${duration} seconds`);
        latestDuration = duration;
    }
    if (message.includes("time=")) {
        const timeMatch = message.match(/time=(\d{2}):(\d{2}):(\d{2})\.(\d{2})/) ?? [];
        const currentTime = (+timeMatch[1]) * 3600 + (+timeMatch[2]) * 60 + (+timeMatch[3]) + (+timeMatch[4]) / 100;
        if (latestDuration > 0) {
            const progress = (currentTime / latestDuration * 100).roundTo(2);
            updateProgress(currentTime / latestDuration);
            console.log(`Progress: ${progress}%`);
        }
    }
});

await ffmpeg.load({
    coreURL: '/assets/misc/ffmpeg/core/ffmpeg-core.js',
    wasmURL: '/assets/misc/ffmpeg/core/ffmpeg-core.wasm',
});

LoadingBar.finish();

let video: Video | null = null;

const videoPreview = $id('video-preview') as HTMLVideoElement;

const fileInput = $id('video-input') as HTMLInputElement;
fileInput.addEventListener('change', selectedVideo);

const heightInput = $id('res-height-input') as HTMLInputElement;
const widthDisplay = $id('res-width') as HTMLSpanElement;
const frameRateInput = $id('frame-rate-input') as HTMLInputElement;

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
    widthDisplay.textContent = width.toString();
});

frameRateInput.addEventListener('input', () => {
    const frameRate = parseInt(frameRateInput.value);
    if (frameRate < 1)
        frameRateInput.value = '1';
    else if (frameRate > 60)
        frameRateInput.value = '60';
});

const convertButton = $id('convert-button') as HTMLButtonElement;
convertButton.addEventListener('click', convertToGif);

const outputImg = $id('output-gif') as HTMLImageElement;
const downloadButton = $id('download-button') as HTMLButtonElement;

async function selectedVideo() {
    if (!fileInput.files || fileInput.files.length === 0)
        return;
    const file = fileInput.files[0];
    videoPreview.src = URL.createObjectURL(file);

    LoadingBar.startTrickle();
    video = await Video.fromFile(file);
    LoadingBar.finish();

    console.log(video);
    
    if (!video.videoStream) {
        console.log('No video stream found in the file.');
        return;
    }

    heightInput.value = (video.videoStream.height / 2).toString();
    widthDisplay.textContent = (video.videoStream.width / 2).toString();
    frameRateInput.value = (video.fps / 2).toString();

    const infoEl = $id('video-info') as HTMLParagraphElement;
    infoEl.innerHTML = getInfoHtml(video);
    convertButton.disabled = false;
}

async function convertToGif() {
    if (!video)
        return;

    convertButton.disabled = true;
    LoadingBar.start();

    convertButton.textContent = "Loading...";

    const fileData = await fetchFile(video.file);
    await ffmpeg.writeFile('input.mp4', fileData);

    LoadingBar.update(0.333);
    convertButton.textContent = "Converting...";
    
    updateProgress = (progress: number) => LoadingBar.update(progress.remap(0.333, 0.666));

    const newWidth = Math.round(parseInt(heightInput.value) * video.aspectRatio);
    const frameRate = frameRateInput.value.parseFloat() ?? 15;

    await ffmpeg.exec([
        '-v', 'info',
        '-i', 'input.mp4', 
        '-vf', `fps=${frameRate},scale=${newWidth}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
        '-c:v', 'gif', 
        'unoptimized.gif'
    ]);

    LoadingBar.update(0.666);
    convertButton.textContent = "Optimizing...";

    const unoptimizedData = await ffmpeg.readFile('unoptimized.gif');
    const unoptimizedBlob = new Blob([new Uint8Array(unoptimizedData as Uint8Array)], { type: 'image/gif' });

    const optimizedFiles: File[] = await gifsicle.run({
        input: [{
            file: unoptimizedBlob,
            name: "unoptimized.gif"
        }],
        command: ['--lossy=80 unoptimized.gif -o /out/final.gif']
    });

    const finalBlob = new Blob([optimizedFiles[0]], { type: 'image/gif' });
    const url = URL.createObjectURL(finalBlob);
    outputImg.src = url;
    
    const infoEl = $id('gif-info') as HTMLParagraphElement;
    if (infoEl)
        infoEl.innerHTML = getInfoHtml(await Gif.fromFile(optimizedFiles[0]));
    
    downloadButton.addEventListener('click', () => {
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'output.gif';

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    });
    downloadButton.disabled = false;

    void ffmpeg.deleteFile('input.mp4');
    void ffmpeg.deleteFile('unoptimized.gif');
    
    convertButton.textContent = "Convert to GIF";
    convertButton.disabled = false;
    LoadingBar.finish();

    updateProgress = progress;
}

function getInfoHtml(media: Video | Gif) {
    return `
        Size: <span style="font-weight: bold;">${(media.format.size / (1024 * 1024)).roundTo(2)} MB</span>
        •
        Dimensions: <span style="font-weight: bold;">${media.videoStream.width}x${media.videoStream.height}</span>
        •
        FPS: <span style="font-weight: bold;">${media.fps.roundTo(2)}</span>
        •
        Duration: <span style="font-weight: bold;">${TimeSpan.fromSeconds(media.format.duration).toTrimmedHms()}</span>
    `
}

class Video {
    file: File;

    format: any;
    streams: any[];

    get videoStream() {
        return this.streams.find(s => s.codec_type === 'video');
    }
    get audioStream() {
        return this.streams.find(s => s.codec_type === 'audio');
    }

    get fps() {
        return eval(this.videoStream.r_frame_rate);
    }

    get aspectRatio() {
        return this.videoStream.width / this.videoStream.height;
    }

    constructor(video: File, format: any, streams: any[]) {
        this.file = video;
        this.format = format;
        this.streams = streams;
    }

    static async fromFile(file: File): Promise<Video> {
        await ffmpeg.writeFile('input.mp4', await fetchFile(file));

        await ffmpeg.ffprobe([
            '-v', 'quiet',
            '-print_format', 'json',
            '-show_format',
            '-show_streams',
            'input.mp4',
            '-o', 'metadata.json'
        ]);

        void ffmpeg.deleteFile('input.mp4');

        const rawData = await ffmpeg.readFile('metadata.json');
        const jsonString = new TextDecoder().decode(rawData as Uint8Array);
        const json = jsonString.parseJson();
        return new Video(file, json.format, json.streams);
    }
}

class Gif {
    file: File;

    format: any;
    streams: any[];

    get videoStream() {
        return this.streams.find(s => s.codec_type === 'video');
    }

    get fps() {
        return eval(this.videoStream.r_frame_rate).roundTo(2);
    }

    get aspectRatio() {
        return this.videoStream.width / this.videoStream.height;
    }

    constructor(gif: File, format: any, streams: any[]) {
        this.file = gif;
        this.format = format;
        this.streams = streams;
    }

    static async fromFile(file: File): Promise<Gif> {
        await ffmpeg.writeFile('input.gif', await fetchFile(file));

        await ffmpeg.ffprobe([
            '-v', 'quiet',
            '-print_format', 'json',
            '-show_format',
            '-show_streams',
            'input.gif',
            '-o', 'metadata.json'
        ]);

        void ffmpeg.deleteFile('input.gif');

        const rawData = await ffmpeg.readFile('metadata.json');
        const jsonString = new TextDecoder().decode(rawData as Uint8Array);
        const json = jsonString.parseJson();
        return new Gif(file, json.format, json.streams);
    }
}