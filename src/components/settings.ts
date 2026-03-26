class SettingItem extends HTMLElement {
    get input() {
        return this.querySelector('.setting-input') as HTMLInputElement | HTMLSelectElement;
    }

    static get observedAttributes() {
        return [
            "hidden",
        ]; 
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (name === "hidden") {
            this.style.display = newValue !== null ? "none" : "";
        }
    }

    connectedCallback() {
        const name = this.getAttribute("name");
        const subtitle = this.getAttribute("subtitle") ?? "";
        const tooltip = this.getAttribute("tooltip");
        const width = this.getAttribute("width");
        if (this.hasAttribute("hidden"))
            this.style.display = "none";

        this.innerHTML = /* html */`
            <span class="info" ${tooltip ? `tooltip="${tooltip}"` : ''}>
                <span class="name">${name}</span>
                <span class="subtitle">${subtitle}</span>
            </span>
        `;

        if (this.getAttribute("type") === "width-height") {
            const defaultValue = this.getAttribute("default") || "1920x1080";
            const [defaultWidth, defaultHeight] = defaultValue.split("x").map(Number);
            this.innerHTML += /* html */`
                <div style="float: right;">
                    <input class="setting-input width" type="number" inputmode="decimal" step="1" value="${defaultWidth}" style="width: ${width ?? '3rem'};">
                    <span style="min-width: 12ch; margin-right: -0.1rem; margin-left: -0.1rem; font-size: 12px; font-variation-settings: 'wght' 400; opacity: 0.5">x</span>
                    <input class="setting-input height" type="number" inputmode="decimal" step="1" value="${defaultHeight}" style="width: ${width ?? '3rem'};">
                </div>
            `;
        }
        else if (this.getAttribute("type") === "number") {
            const defaultValue = this.getAttribute("default");
            const suffix = this.getAttribute("suffix") ?? "";
            this.innerHTML += /* html */`
                <div style="float: right;">
                    <input class="setting-input" type="number" inputmode="decimal" step="1" value="${defaultValue}" style="width: ${width ?? '3rem'};">
                    <span style="min-width: 12ch; margin-top: 4px; margin-bottom: -0.325rem; margin-left: -0.1rem; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.5">${suffix}</span>
                </div>
            `;
            this.querySelector('.setting-input')?.addEventListener('blur', (e) => {
                const input = e.target as HTMLInputElement;
                const min = this.getAttribute("min");
                const max = this.getAttribute("max");
                if (min !== null && parseFloat(input.value) < parseFloat(min))
                    input.value = min;
                if (max !== null && parseFloat(input.value) > parseFloat(max))
                    input.value = max;
            });
        }
        else if (this.getAttribute("type") === "dropdown") {
            const defaultValue = this.getAttribute("default");
            const options = this.getAttribute("options")?.split(",").map(o => ({ value: o.split(":")[0], label: o.split(":")[1] })) ?? [];
            const suffix = this.getAttribute("suffix") ?? "";
            this.innerHTML += /* html */`
                <div style="float: right;">
                    <select class="setting-input" style="width: ${width ?? '5.5rem'};">
                        ${options.map(o => `<option value="${o.value}" ${o.value === defaultValue ? 'selected' : ''}>${o.label}</option>`).join('')}
                    </select>
                    <span style="min-width: 12ch; margin-top: 4px; margin-bottom: -0.325rem; margin-left: -0.1rem; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.5">${suffix}</span>
                </div>
            `;
        }
    }
}
customElements.define("setting-item", SettingItem);