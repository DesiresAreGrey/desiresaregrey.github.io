export class JsonFetch {
    static async get(url, params) {
        if (params)
            url += (url.includes('?') ? '&' : '?') + new URLSearchParams(params).toString();
        const response = await fetch(url);
        if (!response.ok) {
            throw new JsonFetchError(response);
        }
        return response.json();
    }
    static async post(url, data) {
        const response = await fetch(url, {
            method: "POST",
            headers: data instanceof FormData ? undefined : {
                "Content-Type": "application/json"
            },
            body: data instanceof FormData ? data : JSON.stringify(data)
        });
        if (!response.ok) {
            throw new JsonFetchError(response, "POST");
        }
        return response.json();
    }
    static async isReachable(url) {
        try {
            const response = await fetch(url);
            return response.ok;
        }
        catch {
            return false;
        }
    }
}
export class JsonFetchError extends Error {
    constructor(response, method = "GET") {
        super(`Failed to fetch ${method} JSON: ${response.status} ${response.statusText}`);
        this.name = "JsonFetchError";
        this.method = method;
        this.response = response;
        try {
            this.responseMessage = response.json().then(json => json.detail ?? json.message ?? json);
        }
        catch {
            this.responseMessage = Promise.resolve("Unknown error");
        }
    }
    method;
    response;
    responseMessage;
}
//# sourceMappingURL=jsonfetch.js.map