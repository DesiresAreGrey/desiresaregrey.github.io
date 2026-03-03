import { TimeSpan } from "./timespan.js";
import "./utils.js";

export class Cache {
    static set<T>(key: string, value: T, lifetime: number | TimeSpan = TimeSpan.fromDays(1)): void {
        const lifetimeMs = lifetime instanceof TimeSpan ? lifetime.ms : lifetime;
        const expiresAt = Date.now() + lifetimeMs;
        localStorage.setItem(key, { value, expiresAt }.toJson());
    }

    static get<T>(key: string): T | null {
        const cached = localStorage.getItem(key)?.parseJson();

        if (cached && cached.expiresAt > Date.now())
            return cached.value as T;
        localStorage.removeItem(key);
        return null;
    }
}