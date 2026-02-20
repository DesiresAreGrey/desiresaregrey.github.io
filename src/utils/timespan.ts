export class TimeSpan {
    constructor(public milliseconds: number) {}

    get ms(): number {
        return this.milliseconds;
    }

    get totalSeconds(): number {
        return this.milliseconds / 1000;
    }

    get totalMinutes(): number {
        return this.totalSeconds / 60;
    }

    get totalHours(): number {
        return this.totalMinutes / 60;
    }

    get totalDays(): number {
        return this.totalHours / 24;
    }

    get seconds(): number {
        return Math.floor(this.totalSeconds) % 60;
    }
    get minutes(): number {
        return Math.floor(this.totalMinutes) % 60;
    }
    get hours(): number {
        return Math.floor(this.totalHours) % 24;
    }
    get days(): number {
        return Math.floor(this.totalDays);
    }

    toHms(): string {
        return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}.${(this.milliseconds % 1000).roundTo(3).toString().padStart(3, '0')}`;
    }

    toTrimmedHms(): string {
        const h = this.hours > 0 ? `${this.hours.toString().padStart(2, '0')}:` : "";
        const m = this.minutes > 0 ? `${this.minutes.toString().padStart(2, '0')}:` : "";
        const s = this.seconds > 0 ? `${this.seconds.toString().padStart(2, '0')}.` : "";
        const ms = (this.milliseconds % 1000).roundTo(0).toString().padStart(3, '0');
        return (h + m + s + ms).trim();
    }

    static fromSeconds(seconds: number): TimeSpan {
        return new TimeSpan(seconds * 1000);
    }

    static fromMinutes(minutes: number): TimeSpan {
        return TimeSpan.fromSeconds(minutes * 60);
    }

    static fromHours(hours: number): TimeSpan {
        return TimeSpan.fromMinutes(hours * 60);
    }

    static fromDays(days: number): TimeSpan {
        return TimeSpan.fromHours(days * 24);
    }
}