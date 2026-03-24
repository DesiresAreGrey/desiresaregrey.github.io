import { TimeSpan } from "./timespan.js";
import "./utils.js";

export class Cache {
    static set<T>(key: string, value: T, lifetime: number | TimeSpan = TimeSpan.fromDays(1)): void {
        const lifetimeMs = lifetime instanceof TimeSpan ? lifetime.ms : lifetime;
        const expiresAt = lifetimeMs < 0 ? null : Date.now() + lifetimeMs;
        localStorage.setItem(key, { value, expiresAt }.toJson());
    }

    static get<T>(key: string): T | null {
        const cached = localStorage.getItem(key)?.parseJson() as { value: T; expiresAt: number | null } | null;

        if (cached && (cached.expiresAt === null || cached.expiresAt > Date.now()))
            return cached.value;
        localStorage.removeItem(key);
        return null;
    }
}