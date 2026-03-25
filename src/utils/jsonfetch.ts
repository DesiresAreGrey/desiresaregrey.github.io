export class JsonFetch {
    static async get<T = any>(url: string, params?: any): Promise<T> {
        if (params)
            url += (url.includes('?') ? '&' : '?') + new URLSearchParams(params).toString();
        const response = await fetch(url);

        if (!response.ok) {
            throw new JsonFetchError(response);
        }
        return response.json() as Promise<T>;
    }

    static async post<T = any>(url: string, data: unknown | FormData): Promise<T> {
        const response = await fetch(url, {
            method: "POST",
            headers: data instanceof FormData ? undefined : {
                "Content-Type":  "application/json"
            },
            body: data instanceof FormData ? data : JSON.stringify(data)
        });

        if (!response.ok) {
            throw new JsonFetchError(response, "POST");
        }
        return response.json() as Promise<T>;
    }

    static async isReachable(url: string): Promise<boolean> {
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
    constructor(response: Response, method: string = "GET") {
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
    method: string;
    response: Response;
    responseMessage: Promise<string>;
}