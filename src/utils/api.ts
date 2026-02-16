import { Cache } from "./cache.js";
import { JsonFetch } from "./jsonfetch.js";
import { TimeSpan } from "./timespan.js";
import "./utils.js";

export class API {
    static #urlPromise: Promise<string> | null = null;

    static get url(): Promise<string> {
        this.#urlPromise ??= (async () => {
            const cached = Cache.get<string>("api-url");
            if (cached && cached == "https://api.desiresaregrey.com/") {
                return cached;
            }
            try {
                const isReachable = await JsonFetch.isReachable("https://api.desiresaregrey.com/status");
                if (isReachable)
                    Cache.set("api-url", "https://api.desiresaregrey.com/", TimeSpan.fromHours(1).ms);
                return isReachable ? "https://api.desiresaregrey.com/" : "https://desiresapi.runasp.net/";
            } 
            catch {
                return "https://desiresapi.runasp.net/";
            }
        })();
        return this.#urlPromise!;
    }

    static async get<T = any>(endpoint: string): Promise<T> {
        if (endpoint.startsWith('/'))
            endpoint = endpoint.substring(1);
        return JsonFetch.get(await API.url + endpoint);
    }

    static async post<T = any>(endpoint: string, data: unknown): Promise<T> {
        if (endpoint.startsWith('/'))
            endpoint = endpoint.substring(1);
        return JsonFetch.post(await API.url + endpoint, data);
    }
}

void API.url;