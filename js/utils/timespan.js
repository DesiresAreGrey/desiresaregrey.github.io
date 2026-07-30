import "./utils.js";
export class TimeSpan {
    ms;
    constructor(ms) {
        this.ms = ms;
    }
    get totalMilliseconds() {
        return this.ms;
    }
    get totalSeconds() {
        return this.ms / 1000;
    }
    get totalMinutes() {
        return this.totalSeconds / 60;
    }
    get totalHours() {
        return this.totalMinutes / 60;
    }
    get totalDays() {
        return this.totalHours / 24;
    }
    get seconds() {
        return Math.floor(this.totalSeconds) % 60;
    }
    get minutes() {
        return Math.floor(this.totalMinutes) % 60;
    }
    get hours() {
        return Math.floor(this.totalHours) % 24;
    }
    get days() {
        return Math.floor(this.totalDays);
    }
    toHms() {
        return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}.${(this.ms % 1000).roundTo(0).toString().padStart(3, '0')}`;
    }
    toTrimmedHms() {
        const h = this.hours > 0 ? `${this.hours.toString().padStart(2, '0')}:` : "";
        const m = this.minutes > 0 ? `${this.minutes.toString().padStart(2, '0')}:` : "";
        const s = this.seconds > 0 ? `${this.seconds.toString().padStart(2, '0')}.` : "";
        const ms = (this.ms % 1000).roundTo(0).toString().padStart(3, '0');
        return (h + m + s + ms).trim();
    }
    static fromSeconds(seconds) {
        return new TimeSpan(seconds * 1000);
    }
    static fromMinutes(minutes) {
        return TimeSpan.fromSeconds(minutes * 60);
    }
    static fromHours(hours) {
        return TimeSpan.fromMinutes(hours * 60);
    }
    static fromDays(days) {
        return TimeSpan.fromHours(days * 24);
    }
}
//# sourceMappingURL=timespan.js.map