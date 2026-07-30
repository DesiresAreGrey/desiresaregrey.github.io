import { TimeSpan } from "./timespan.js";
import "./utils.js";
export class Cache {
    static set(key, value, lifetime = TimeSpan.fromDays(1)) {
        const lifetimeMs = lifetime instanceof TimeSpan ? lifetime.ms : lifetime;
        const expiresAt = lifetimeMs < 0 ? null : Date.now() + lifetimeMs;
        localStorage.setItem(key, { value, expiresAt }.toJson());
    }
    static get(key) {
        const cached = localStorage.getItem(key)?.parseJson();
        if (cached && (cached.expiresAt === null || cached.expiresAt > Date.now()))
            return cached.value;
        localStorage.removeItem(key);
        return null;
    }
}
//# sourceMappingURL=cache.js.map