import { TimeSpan } from "./timespan.js";
import "./utils.js";

export class Cache {
    static set<T>(key: string, value: T, lifetimeMs: number = TimeSpan.fromDays(1).ms): void {
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