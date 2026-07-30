import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
export class FFmpegHelper {
    static ffmpeg = new FFmpeg();
    static logProgress = (progress) => console.log(`Progress: ${Math.round(progress * 100)}%`);
    static progressEvent = this.logProgress;
    static durationMod = d => d ?? 0;
    static set onProgress(callback) {
        this.progressEvent = (progress) => {
            callback(progress);
            this.logProgress(progress);
        };
    }
    static resetOnProgress() {
        this.progressEvent = this.logProgress;
        this.durationMod = d => d ?? 0;
    }
    static errors = new Set();
    static currentMedia = null;
    static async loadFFmpeg() {
        this.ffmpeg.on('log', ({ message }) => {
            console.log('[FFmpeg]', message);
            if (message.includes("time=")) {
                const timeMatch = message.match(/time=(\d{2}):(\d{2}):(\d{2})\.(\d{2})/) ?? [];
                const currentTime = (+timeMatch[1]) * 3600 + (+timeMatch[2]) * 60 + (+timeMatch[3]) + (+timeMatch[4]) / 100;
                this.progressEvent(currentTime / this.durationMod(this.currentMedia?.format.duration));
            }
            if (message.startsWith("Error ")) {
                this.errors.add(message);
            }
            if (message.includes("Your platform doesn't sup") && message.includes("AV1 decoding")) {
                this.errors.add(message.replace(/^\[.*?]\s*/, '').replace("suppport", "support"));
            }
        });
        await this.ffmpeg.load({
            coreURL: '/assets/misc/ffmpeg/core/ffmpeg-core.js',
            wasmURL: '/assets/misc/ffmpeg/core/ffmpeg-core.wasm',
        });
    }
    static async run(media, args) {
        this.currentMedia = media;
        this.errors = new Set();
        try {
            return await this.ffmpeg.exec(['-v', 'info', ...args]);
        }
        finally {
            this.currentMedia = null;
        }
    }
    static async probe(args) {
        return await this.ffmpeg.ffprobe(args);
    }
    static async fetchFile(file) {
        if (file instanceof Media)
            file = file.file;
        return await fetchFile(file);
    }
    static async writeFile(name, data) {
        await this.ffmpeg.writeFile(name, data);
    }
    static async readFile(name) {
        return await this.ffmpeg.readFile(name);
    }
    static async deleteFile(name) {
        await this.ffmpeg.deleteFile(name);
    }
    static async deleteFiles(names) {
        for (const name of names)
            await this.deleteFile(name);
    }
}
export class Media {
    file;
    format;
    streams;
    get videoStream() {
        const stream = this.streams.find(s => s.codec_type === 'video');
        return stream ? stream : null;
    }
    get audioStreams() {
        return this.streams.filter(s => s.codec_type === 'audio');
    }
    get fps() {
        return this.videoStream ? eval(this.videoStream.avg_frame_rate) : 0;
    }
    get aspectRatio() {
        return this.videoStream ? this.videoStream.width / this.videoStream.height : 0;
    }
    constructor(video, format, streams) {
        this.file = video;
        this.format = format;
        this.streams = streams;
    }
}
export class Video extends Media {
    static async fromFile(file) {
        const ext = file.name.split('.').slice(-1)[0];
        await FFmpegHelper.writeFile(`input.${ext}`, await fetchFile(file));
        await FFmpegHelper.ffmpeg.ffprobe([
            '-v', 'quiet',
            '-print_format', 'json',
            '-show_format',
            '-show_streams',
            `input.${ext}`,
            '-o', 'metadata.json'
        ]);
        const rawData = await FFmpegHelper.ffmpeg.readFile('metadata.json');
        const jsonString = new TextDecoder().decode(rawData);
        const json = jsonString.parseJson();
        void FFmpegHelper.deleteFiles([`input.${ext}`, 'metadata.json']);
        return new Video(file, json.format, json.streams);
    }
}
export class Gif extends Media {
    static async fromFile(file) {
        await FFmpegHelper.writeFile('input.gif', await fetchFile(file));
        await FFmpegHelper.ffmpeg.ffprobe([
            '-v', 'quiet',
            '-print_format', 'json',
            '-show_format',
            '-show_streams',
            'input.gif',
            '-o', 'metadata.json'
        ]);
        const rawData = await FFmpegHelper.ffmpeg.readFile('metadata.json');
        const jsonString = new TextDecoder().decode(rawData);
        const json = jsonString.parseJson();
        void FFmpegHelper.deleteFiles(['input.gif', 'metadata.json']);
        return new Gif(file, json.format, json.streams);
    }
}
//# sourceMappingURL=ffmpeg.js.map