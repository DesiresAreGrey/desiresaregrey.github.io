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

    static async addVersionToHeader(path = "sw.js"): Promise<boolean> {
        const version = await this.getVersion(path);
        const headerTitle = $('.md-header__inner.md-grid .md-header__title .md-header__topic[data-md-component="header-topic"] > span');
        
        if (version && headerTitle) {
            headerTitle.innerHTML += /* html */ `<span style="font-size: 0.55em; opacity: 0.7; margin-left: -3px;">v${version}</span>`;
            return true;
        }
        return false;
    }
}