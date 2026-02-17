export class JsonFetch {
    static async get<T = any>(url: string, params?: any): Promise<T> {
        if (params)
            url += (url.includes('?') ? '&' : '?') + new URLSearchParams(params).toString();
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Failed to get JSON from ${url}: ${response.status} ${response.statusText}`);
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
            throw new Error(`Failed to post JSON to ${url}: ${response.status} ${response.statusText}`);

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