class SettingItem extends HTMLElement {
    get input() {
        return this.querySelector('.setting-input') as HTMLInputElement | HTMLSelectElement;
    }
    get value() {
        return this.input.value;
    }
    set value(val: string | number) {
        this.input.value = val.toString();
    }

    get inputs() {
        return [...this.querySelectorAll('.setting-input')] as HTMLInputElement[];
    }

    hide() {
        this.setAttribute("hidden", "");
    }
    show() {
        this.removeAttribute("hidden");
    }

    set subtitle(value: string) {
        this.setAttribute("subtitle", value);
    }

    static get observedAttributes() {
        return [
            "duration",
            "subtitle"
        ]; 
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (this.querySelector('.setting-input.end') && name === "duration") {
            const input = this.querySelector('.setting-input.end') as HTMLInputElement;
            const duration = Number(this.getAttribute("duration"));
            if (duration !== null)
                input.value = Number(duration.toFixed(2)).toString();
        }
        if (name === "subtitle") {
            const subtitleElement = this.querySelector('.subtitle');
            if (subtitleElement)
                subtitleElement.textContent = newValue ?? "";
        }
    }

    connectedCallback() {
        const name = this.getAttribute("name");
        const subtitle = this.getAttribute("subtitle") ?? "";
        const tooltip = this.getAttribute("tooltip");
        const width = this.getAttribute("width");

        this.innerHTML = /* html */ `
            <span class="info" ${tooltip ? `tooltip="${tooltip}"` : ''}>
                <span class="name">${name}</span>
                <span class="subtitle">${subtitle}</span>
            </span>
        `;

        if (this.getAttribute("type") === "width-height") {
            const defaultValue = this.getAttribute("default") || "1920x1080";
            const [defaultWidth, defaultHeight] = defaultValue.split("x").map(Number);
            this.innerHTML += /* html */ `
                <div style="float: right;">
                    <input class="setting-input width" type="number" inputmode="decimal" step="1" value="${defaultWidth}" style="width: ${width ?? '3rem'};">
                    <span style="vertical-align: 2px; min-width: 12ch; margin-right: -0.1rem; margin-left: -0.1rem; font-size: 12px; font-variation-settings: 'wght' 400; opacity: 0.5">x</span>
                    <input class="setting-input height" type="number" inputmode="decimal" step="1" value="${defaultHeight}" style="width: ${width ?? '3rem'};">
                </div>
            `;
        }
        else if (this.getAttribute("type") === "start-end") {
            this.innerHTML += /* html */ `
                <div style="float: right;">
                    <input class="setting-input start" type="number" inputmode="decimal" step="any" value="0.0" style="width: ${width ?? '3rem'};">
                    <span style="vertical-align: 1px; min-width: 12ch; margin-right: -0.1rem; margin-left: -0.1rem; font-size: 15px; font-variation-settings: 'wght' 550; opacity: 0.5">-</span>
                    <input class="setting-input end" type="number" inputmode="decimal" step="any" value="${Number(this.getAttribute("duration"))?.toFixed(1) ?? '10.0'}" style="width: ${width ?? '3rem'};">
                </div>
            `;

            this.querySelector('.setting-input.start')?.addEventListener('blur', (e) => {
                const input = e.target as HTMLInputElement;
                const end = parseFloat((this.querySelector('.setting-input.end') as HTMLInputElement)?.value);
                if (parseFloat(input.value) < 0)
                    input.value = '0.0';
                else if (parseFloat(input.value) > end)
                    input.value = end.toString();
                input.value = Number(Number(input.value).toFixed(2)).toString();
            });
            this.querySelector('.setting-input.end')?.addEventListener('blur', (e) => {
                const input = e.target as HTMLInputElement;
                const duration = this.getAttribute("duration");
                if (parseFloat(input.value) < 0)
                    input.value = '0.0';
                else if (duration !== null && parseFloat(input.value) > Number(duration))
                    input.value = duration;
                input.value = Number(Number(input.value).toFixed(2)).toString();
            });
        }
        else if (this.getAttribute("type") === "number") {
            const defaultValue = this.getAttribute("default");
            const suffix = this.getAttribute("suffix") ?? "";
            const step = this.getAttribute("step") ?? "1";
            this.innerHTML += /* html */ `
                <div style="float: right;">
                    <input class="setting-input" type="number" inputmode="decimal" step="${step}" value="${defaultValue}" style="width: ${width ?? '3rem'};">
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
            this.innerHTML += /* html */ `
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