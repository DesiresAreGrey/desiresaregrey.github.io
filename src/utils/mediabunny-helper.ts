import { ALL_FORMATS, BlobSource, Input, InputVideoTrack, InputAudioTrack, type VideoCodec, type FrameRateMetrics } from "mediabunny";

export class VideoInput {
    readonly input: Input;
    readonly file: File;

    videoTrack: InputVideoTrack;
    audioTracks: InputAudioTrack[];

    duration: number;
    width: number;
    height: number;
    codec: VideoCodec | null;
    frameRateMetrics: FrameRateMetrics;

    get size() { return this.file.size; }
    get aspectRatio() { return this.width / this.height; }

    constructor(input: Input, file: File, videoStream: InputVideoTrack, audioTracks: InputAudioTrack[], duration: number, width: number, height: number, codec: VideoCodec | null, frameRateMetrics: FrameRateMetrics) {
        this.input = input;
        this.file = file;
        this.videoTrack = videoStream;
        this.audioTracks = audioTracks;
        this.duration = duration;
        this.width = width;
        this.height = height;
        this.codec = codec;
        this.frameRateMetrics = frameRateMetrics;
    }

    static async fromFile(file: File): Promise<VideoInput | null> {
        const input = new Input({
            formats: ALL_FORMATS,
            source: new BlobSource(file),
        });
        await input.canRead();

        const videoTrack = await input.getPrimaryVideoTrack();
        if (!videoTrack)
            return null;

        const audioTracks = await input.getAudioTracks();
        
        const duration = await input.computeDuration();
        const width = await videoTrack.getDisplayWidth();
        const height = await videoTrack.getDisplayHeight();
        const codec = await videoTrack.getCodec() as VideoCodec | null;
        const fps = await videoTrack.computeFrameRateMetrics()

        return new VideoInput(input, file, videoTrack, audioTracks, duration, width, height, codec, fps);
    }
}