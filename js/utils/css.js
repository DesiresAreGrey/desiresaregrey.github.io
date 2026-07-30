export class CSSUtils {
    static appliedStylesheets = new Set();
    static async getStylesheet(url) {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Failed to load stylesheet: ${response.status} ${response.statusText}`);
        const css = await response.text();
        const sheet = new CSSStyleSheet();
        return await sheet.replace(css);
    }
    static async applyStylesheet(url) {
        if (this.appliedStylesheets.has(url))
            return;
        this.appliedStylesheets.add(url);
        try {
            const sheet = await this.getStylesheet(url);
            document.adoptedStyleSheets.push(sheet);
        }
        catch (e) {
            this.appliedStylesheets.delete(url);
            console.error(`Error applying stylesheet ${url}:`, e);
        }
    }
    static async applyCss(css) {
        const sheet = new CSSStyleSheet();
        await sheet.replace(css);
        document.adoptedStyleSheets.push(sheet);
    }
}
//# sourceMappingURL=css.js.map