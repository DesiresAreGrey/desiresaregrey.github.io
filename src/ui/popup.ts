import { CSSUtils } from "../utils/css.js";
import { Utils } from "../utils/utils.js";

export class Popup {
    static async init() {
        await CSSUtils.applyStylesheet("/stylesheets/ui/popup.css");
    }

    static async show(content: string, id?: string): Promise<HTMLElement> {
        await this.init();

        const popup = document.createElement("div");
        popup.classList.add("popup-overlay");
        popup.innerHTML = /* html */ `
            <div class="popup" ${id ? `id="${id}"` : ''}>
                <div class="close">
                    <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Menu / Close_SM"><path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                </div>
                ${content}
            </div>
        `;
        document.body.prepend(popup);
        void popup.offsetHeight;
        popup.classList.add('active');
        
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
                Utils.runAfter(() => popup.remove(), 250, popup);
            }
        });
        popup.$('.close')?.addEventListener('click', () => {
            popup.classList.remove('active');
            Utils.runAfter(() => popup.remove(), 250, popup);
        });

        return popup;
    }
}
void Popup.init();