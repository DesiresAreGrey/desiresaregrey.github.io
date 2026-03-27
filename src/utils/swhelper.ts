export default class SWHelper {
    static async getVersion(path = "sw.js"): Promise<string | null> {
        try {
            const response = await fetch(path, { cache: "no-store" });
            const js = await response.text();
            console.log(js);
            const match = js.match(/version\s*=\s*"([^"]+)"/);
            return match?.[1] ?? null;
        } 
        catch {
            return null;
        }
    }
}