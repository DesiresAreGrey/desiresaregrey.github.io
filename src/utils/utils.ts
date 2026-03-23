export class Utils {
    static readableDateTime(timestamp: string): string {
        return new Date(timestamp).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short"
        });
    }

    static readableDate(timestamp: string): string {
        return new Date(timestamp).toLocaleString(undefined, {
            dateStyle: "medium"
        });
    }

    static pageLoaded = () => new Promise<void>(resolve => {
        document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => resolve(), { once: true }) : resolve();
    });

    static async wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static runAfter(callback: () => void, delay: number, element?: HTMLElement): void {
        if (!element)
            element = document.documentElement;
        const el = element as HTMLElement & { timeout?: number };
        if (el.timeout)
            clearTimeout(el.timeout);
        el.timeout = setTimeout(() => {
            callback();
            delete el.timeout;
        }, delay);
    }

    /**
    * -1 if left is older, 1 if right is older, 0 if equal, NaN if invalid version
    */
    static compareVersions(left: string, right: string): number {
        const parts1 = left.split('.').map(Number);
        const parts2 = right.split('.').map(Number);

        if (parts1.some(isNaN) || parts2.some(isNaN))
            return NaN;

        for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            const part1 = parts1[i] ?? 0;
            const part2 = parts2[i] ?? 0;

            if (part1 > part2) return 1;
            if (part1 < part2) return -1;
        }
        
        return 0;
    }

    static testAppend(text: string) {
        $(".md-content__inner.md-typeset div")?.appendHtml(`<p>${text}</p>`);
    }
}

declare global {
    type UnitSystem = "metric" | "imperial";

    interface NodeListOf<TNode extends Node> {
        toArray(): TNode[];
    }

    interface HTMLCollection {
        toArray(): Element[];
    }

    interface HTMLElement {
        $<T extends HTMLElement>(selector: string): T | null;
        $id<T extends HTMLElement>(id: string): T | null;
        $$<T extends HTMLElement>(selector: string): NodeListOf<T>;
        appendHtml(htmlString: string): void;
    }

    interface Object {
        toJson(): string;
    }

    interface String {
        parseJson(): any | null;
        parseFloat(): number | null;
        unquote(): string;
        escapeHTML(): string;
    }

    interface Number {
        roundTo(precision?: number): number;
        floorTo(precision?: number): number;

        abs(): number;
        clamp(min?: number, max?: number): number;
        remap(fromMin: number, fromMax: number, toMin: number, toMax: number): number;
        remap(toMin: number, toMax: number): number;

        mult(multiplier: number): number;
        multFloor(multiplier: number): number;
        multRound(multiplier: number): number;

        appendOrdinal(): string;

        toFeetInches(decimals?: number, fromUnit?: UnitSystem): string;
        asInches(fromUnit?: UnitSystem): number;
        asCm(fromUnit?: UnitSystem): number;
        asPounds(fromUnit?: UnitSystem): number;
        asKg(fromUnit?: UnitSystem): number;
    }

    function $<T extends HTMLElement>(selector: string): T | null;
    function $id<T extends HTMLElement>(id: string): T | null;
    function $$<T extends HTMLElement>(selector: string): NodeListOf<T>;

    function checkCache(key: string): Element | null;
}

Object.defineProperty(NodeList.prototype, 'toArray', { value: function() { return [...this]; } });

Object.defineProperty(HTMLCollection.prototype, 'toArray', { value: function() { return [...this]; } });

Object.defineProperty(HTMLElement.prototype, '$', { value: function(this: HTMLElement, selector: string) { return this.querySelector(selector); } });
Object.defineProperty(HTMLElement.prototype, '$id', { value: function(this: HTMLElement, id: string) { return this.querySelector("#" + id); } });
Object.defineProperty(HTMLElement.prototype, '$$', { value: function(this: HTMLElement, selector: string) { return this.querySelectorAll(selector); } });

Object.defineProperty(HTMLElement.prototype, 'appendHtml', { 
    value: function(this: HTMLElement, htmlString: string) { this.insertAdjacentHTML('beforeend', htmlString); } 
});

Object.defineProperty(Object.prototype, 'toJson', { 
    value: function(this: object) { 
        return JSON.stringify(this);
    }
});

Object.defineProperty(String.prototype, 'parseJson', { 
    value: function(this: string) { 
        try {
            return JSON.parse(this);
        }
        catch {
            return null;
        }
    }
});

Object.defineProperty(String.prototype, 'parseFloat', { 
    value: function(this: string) { 
        const parsed = parseFloat(this);
        if (isNaN(parsed)) 
            return null;
        return parsed;
    }
});

Object.defineProperty(String.prototype, 'escapeHTML', { 
    value: function(this: string) { 
        return this.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});

Object.defineProperty(String.prototype, 'unquote', { 
    value: function(this: string) { 
        if ((this.startsWith('"') && this.endsWith('"')) || (this.startsWith("'") && this.endsWith("'")))
            return this.slice(1, -1);
        return this;
    }
});

Object.defineProperty(Number.prototype, 'roundTo', { 
    value: function(this: number, precision = 0) { return Number(this.toFixed(precision)) } 
});
Object.defineProperty(Number.prototype, 'floorTo', { 
    value: function(this: number, precision = 0) { return Math.floor(this * (10 ** precision)) / (10 ** precision) } 
});
Object.defineProperty(Number.prototype, 'abs', { 
    value: function(this: number) { return Math.abs(this) } 
});
Object.defineProperty(Number.prototype, 'clamp', { 
    value: function(this: number, min: number = 0, max: number = 1) { return Math.min(Math.max(this, min), max) } 
});

Object.defineProperty(Number.prototype, 'remap', {
    value: function (this: number, a = 0, b = 1, c?: number, d?: number) {
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
        if (range === 0) return toMin;
        const normalized = (this - fromMin) / range;
        return normalized * (toMax - toMin) + toMin;
    }
});

Object.defineProperty(Number.prototype, 'mult', { value: function(this: number, multiplier: number) { return this * multiplier } });
Object.defineProperty(Number.prototype, 'multFloor', { value: function(this: number, multiplier: number) { return Math.floor(this * multiplier) } });
Object.defineProperty(Number.prototype, 'multRound', { value: function(this: number, multiplier: number) { return Math.round(this * multiplier) } });

Object.defineProperty(Number.prototype, 'appendOrdinal', { 
    value: function(this: number) {
        const stringValue = this.toString();
        if (stringValue.endsWith('11') || stringValue.endsWith('12') || stringValue.endsWith('13')) {
            return stringValue + 'th';
        }
        const lastChar = stringValue[stringValue.length - 1];

        switch (lastChar) {
            case '1': return stringValue + 'st';
            case '2': return stringValue + 'nd';
            case '3': return stringValue + 'rd';
            default:  return stringValue + 'th';
        }
    } 
});

Object.defineProperty(Number.prototype, 'toFeetInches', { 
    value: function(this: number, decimals: number = 0, fromUnit: UnitSystem = "imperial") { 
        const totalInches = this.asInches(fromUnit);
        const feet = Math.floor(totalInches / 12);
        const inches = (totalInches - feet * 12).roundTo(decimals);
        return `${feet}'${inches}"`;
    }
});

Object.defineProperty(Number.prototype, 'asInches', { 
    value: function(this: number, fromUnit: UnitSystem = "metric") { 
        return fromUnit === "metric" ? this / 2.54 : this;
    } 
});

Object.defineProperty(Number.prototype, 'asCm', { 
    value: function(this: number, fromUnit: UnitSystem = "imperial") { 
        return fromUnit === "imperial" ? this * 2.54 : this;
    } 
});

Object.defineProperty(Number.prototype, 'asPounds', { 
    value: function(this: number, fromUnit: UnitSystem = "metric") { 
        return fromUnit === "metric" ? this * 2.20462 : this;
    } 
});

Object.defineProperty(Number.prototype, 'asKg', { 
    value: function(this: number, fromUnit: UnitSystem = "imperial") { 
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