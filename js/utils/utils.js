import { TimeSpan } from "./timespan.js";
export class Utils {
    static readableDateTime(timestamp) {
        return new Date(timestamp).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short"
        });
    }
    static readableDate(timestamp) {
        return new Date(timestamp).toLocaleString(undefined, {
            dateStyle: "medium"
        });
    }
    static pageLoaded = () => new Promise(resolve => {
        document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => resolve(), { once: true }) : resolve();
    });
    static async wait(time) {
        const ms = time instanceof TimeSpan ? time.ms : time;
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    static runAfter(callback, delay, element) {
        if (!element)
            element = document.documentElement;
        const el = element;
        if (el.timeout)
            clearTimeout(el.timeout);
        el.timeout = setTimeout(() => {
            callback();
            delete el.timeout;
        }, delay);
    }
    static compareVersions(left, right) {
        const parts1 = left.split('.').map(Number);
        const parts2 = right.split('.').map(Number);
        if (parts1.some(isNaN) || parts2.some(isNaN))
            return NaN;
        for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            const part1 = parts1[i] ?? 0;
            const part2 = parts2[i] ?? 0;
            if (part1 > part2)
                return 1;
            if (part1 < part2)
                return -1;
        }
        return 0;
    }
    static testAppend(text) {
        $(".md-content__inner.md-typeset div")?.appendHtml(`<p>${text}</p>`);
    }
}
Object.defineProperty(NodeList.prototype, 'toArray', { value: function () { return [...this]; } });
Object.defineProperty(HTMLCollection.prototype, 'toArray', { value: function () { return [...this]; } });
Object.defineProperty(HTMLElement.prototype, '$', { value: function (selector) { return this.querySelector(selector); } });
Object.defineProperty(HTMLElement.prototype, '$id', { value: function (id) { return this.querySelector("#" + id); } });
Object.defineProperty(HTMLElement.prototype, '$$', { value: function (selector) { return this.querySelectorAll(selector); } });
Object.defineProperty(HTMLElement.prototype, 'appendHtml', {
    value: function (htmlString) { this.insertAdjacentHTML('beforeend', htmlString); }
});
Object.defineProperty(HTMLElement.prototype, 'runAfter', {
    value: function (callback, delay) {
        Utils.runAfter(callback, delay, this);
    }
});
Object.defineProperty(Object.prototype, 'toJson', {
    value: function () {
        return JSON.stringify(this);
    }
});
Object.defineProperty(String.prototype, 'parseJson', {
    value: function () {
        try {
            return JSON.parse(this);
        }
        catch {
            return null;
        }
    }
});
Object.defineProperty(String.prototype, 'parseFloat', {
    value: function () {
        const parsed = parseFloat(this);
        if (isNaN(parsed))
            return null;
        return parsed;
    }
});
Object.defineProperty(String.prototype, 'escapeHTML', {
    value: function () {
        return this.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});
Object.defineProperty(String.prototype, 'unquote', {
    value: function () {
        if ((this.startsWith('"') && this.endsWith('"')) || (this.startsWith("'") && this.endsWith("'")))
            return this.slice(1, -1);
        return this;
    }
});
Object.defineProperty(Number.prototype, 'roundTo', {
    value: function (precision = 0) { return Number(this.toFixed(precision)); }
});
Object.defineProperty(Number.prototype, 'floorTo', {
    value: function (precision = 0) { return Math.floor(this * (10 ** precision)) / (10 ** precision); }
});
Object.defineProperty(Number.prototype, 'abs', {
    value: function () { return Math.abs(this); }
});
Object.defineProperty(Number.prototype, 'clamp', {
    value: function (min = 0, max = 1) { return Math.min(Math.max(this, min), max); }
});
Object.defineProperty(Number.prototype, 'remap', {
    value: function (a = 0, b = 1, c, d) {
        if (c === undefined || d === undefined) {
            const toMin = a;
            const toMax = b;
            return this * (toMax - toMin) + toMin;
        }
        const fromMin = a;
        const fromMax = b;
        const toMin = c;
        const toMax = d;
        const range = fromMax - fromMin;
        if (range === 0)
            return toMin;
        const normalized = (this - fromMin) / range;
        return normalized * (toMax - toMin) + toMin;
    }
});
Object.defineProperty(Number.prototype, 'mult', { value: function (multiplier) { return this * multiplier; } });
Object.defineProperty(Number.prototype, 'multFloor', { value: function (multiplier) { return Math.floor(this * multiplier); } });
Object.defineProperty(Number.prototype, 'multRound', { value: function (multiplier) { return Math.round(this * multiplier); } });
Object.defineProperty(Number.prototype, 'approx', {
    value: function (other, tolerance = 0.0001) {
        return Math.abs(this - other) < tolerance;
    }
});
Object.defineProperty(Number.prototype, 'appendOrdinal', {
    value: function () {
        const stringValue = this.toString();
        if (stringValue.endsWith('11') || stringValue.endsWith('12') || stringValue.endsWith('13')) {
            return stringValue + 'th';
        }
        const lastChar = stringValue[stringValue.length - 1];
        switch (lastChar) {
            case '1': return stringValue + 'st';
            case '2': return stringValue + 'nd';
            case '3': return stringValue + 'rd';
            default: return stringValue + 'th';
        }
    }
});
Object.defineProperty(Number.prototype, 'toFeetInches', {
    value: function (decimals = 0, fromUnit = "imperial") {
        const totalInches = this.asInches(fromUnit);
        const feet = Math.floor(totalInches / 12);
        const inches = (totalInches - feet * 12).roundTo(decimals);
        return `${feet}'${inches}"`;
    }
});
Object.defineProperty(Number.prototype, 'asInches', {
    value: function (fromUnit = "metric") {
        return fromUnit === "metric" ? this / 2.54 : this;
    }
});
Object.defineProperty(Number.prototype, 'asCm', {
    value: function (fromUnit = "imperial") {
        return fromUnit === "imperial" ? this * 2.54 : this;
    }
});
Object.defineProperty(Number.prototype, 'asPounds', {
    value: function (fromUnit = "metric") {
        return fromUnit === "metric" ? this * 2.20462 : this;
    }
});
Object.defineProperty(Number.prototype, 'asKg', {
    value: function (fromUnit = "imperial") {
        return fromUnit === "imperial" ? this / 2.20462 : this;
    }
});
window.$ = (selector) => document.querySelector(selector);
window.$id = (id) => document.querySelector("#" + id);
window.$$ = (selector) => document.querySelectorAll(selector);
window.checkCache = (key) => {
    const cached = localStorage.getItem(key)?.parseJson();
    if (cached)
        cached.isExpired = cached.expiresAt <= Date.now();
    return cached ?? "Cache Value does not exist";
};
//# sourceMappingURL=utils.js.map