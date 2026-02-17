export class JsonFetch {
    static async get<T = any>(url: string, params?: any): Promise<T> {
        if (params)
            url += (url.includes('?') ? '&' : '?') + new URLSearchParams(params).toString();
        const response = await fetch(url);
        if (!response.ok)
            throw new JsonFetchError(response);
        return response.json() as Promise<T>;
    }

    static async post<T = any>(url: string, data: unknown): Promise<T> {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok)
            throw new JsonFetchError(response, "POST");

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
        this.status = response.status;
        this.statusText = response.statusText;
    }
    method: string;
    status: number;
    statusText: string;
}