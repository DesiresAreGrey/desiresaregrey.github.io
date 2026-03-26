import { FFmpeg, FileData } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

export class FFmpegHelper {
    static ffmpeg: FFmpeg = new FFmpeg();

    private static readonly logProgress: (progress: number) => void = (progress) => console.log(`Progress: ${Math.round(progress * 100)}%`);

    private static progressEvent: (progress: number) => void = this.logProgress;

    public static durationMod: (d: number | undefined) => number = d => d ?? 0;
    public static set onProgress(callback: (progress: number) => void) {
        this.progressEvent = (progress) => {
            callback(progress); 
            this.logProgress(progress); 
        };
    }
    public static resetOnProgress() {
        this.progressEvent = this.logProgress;
        this.durationMod = d => d ?? 0;
    }

    public static errors: Set<string> = new Set();

    public static currentMedia: Media | null = null;

    public static async loadFFmpeg() {
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

    public static async run(media: Media, args: string[]) {
        this.currentMedia = media;
        this.errors = new Set();
        try {
            return await this.ffmpeg.exec(['-v', 'info', ...args]);
        }
        finally {
            this.currentMedia = null;
        }
    }
    public static async probe(args: string[]) {
        return await this.ffmpeg.ffprobe(args);
    }

    public static async fetchFile(file: string | File | Blob | Media) {
        if (file instanceof Media)
            file = file.file;
        return await fetchFile(file);
    }
    public static async writeFile(name: string, data: FileData) {
        await this.ffmpeg.writeFile(name, data);
    }
    public static async readFile(name: string) {
        return await this.ffmpeg.readFile(name);
    }
    public static async deleteFile(name: string) {
        await this.ffmpeg.deleteFile(name);
    }
    public static async deleteFiles(names: string[]) {
        for (const name of names)
            await this.deleteFile(name);
    }
}

export class Media {
    readonly file: File;

    format: any;
    streams: any[];
    
    get videoStream(): VideoStream | null {
        const stream = this.streams.find(s => s.codec_type === 'video');
        return stream ? stream as VideoStream : null;
    }
    get audioStreams() {
        return this.streams.filter(s => s.codec_type === 'audio') as AudioStream[];
    }

    get fps(): number {
        return this.videoStream ? eval(this.videoStream.avg_frame_rate) : 0;
    }

    get aspectRatio() {
        return this.videoStream ? this.videoStream.width / this.videoStream.height : 0;
    }

    constructor(video: File, format: any, streams: any[]) {
        this.file = video;
        this.format = format;
        this.streams = streams;
    }
}

export class Video extends Media {
    static async fromFile(file: File): Promise<Video> {
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
        const jsonString = new TextDecoder().decode(rawData as Uint8Array);
        const json = jsonString.parseJson();

        void FFmpegHelper.deleteFiles([`input.${ext}`, 'metadata.json']);

        return new Video(file, json.format, json.streams);
    }
}

export class Gif extends Media {
    static async fromFile(file: File): Promise<Gif> {
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
        const jsonString = new TextDecoder().decode(rawData as Uint8Array);
        const json = jsonString.parseJson();

        void FFmpegHelper.deleteFiles(['input.gif', 'metadata.json']);

        return new Gif(file, json.format, json.streams);
    }
}

interface VideoStream {
    index: number;

    width: number;
    height: number;

    duration: number;

    avg_frame_rate: string;
    bit_rate: number;

    codec_name: string;
    codec_long_name: string;
}
interface AudioStream {
    index: number;

    duration: number;

    codec_name: string;
}