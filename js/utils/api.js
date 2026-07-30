import { Cache } from "./cache.js";
import { JsonFetch } from "./jsonfetch.js";
import { TimeSpan } from "./timespan.js";
import "./utils.js";
export class API {
    static #urlPromise = null;
    static get url() {
        this.#urlPromise ??= (async () => {
            const cached = Cache.get("api-url");
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
        return this.#urlPromise;
    }
    static async get(endpoint, params) {
        if (endpoint.startsWith('/'))
            endpoint = endpoint.substring(1);
        return JsonFetch.get(await API.url + endpoint, params);
    }
    static async post(endpoint, data) {
        if (endpoint.startsWith('/'))
            endpoint = endpoint.substring(1);
        return JsonFetch.post(await API.url + endpoint, data);
    }
}
void API.url;
//# sourceMappingURL=api.js.map