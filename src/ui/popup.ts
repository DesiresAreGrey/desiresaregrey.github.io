import { CSSUtils } from "../utils/css.js";
import { Utils } from "../utils/utils.js";

export class Popup {
    static async init() {
        await CSSUtils.applyStylesheet("/stylesheets/ui/popup.css");
    }

    static async showPopup(content: string) {
        await this.init();

        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        overlay.style.display = "flex";

        overlay.innerHTML = /* html */ `
            <div class="popup">
                <div class="close">
                    <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Menu / Close_SM"><path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                </div>
                ${content}
            </div>
        `;
        document.body.prepend(overlay);
        void overlay.offsetHeight;
        overlay.classList.add('active');
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                Utils.runAfter(() => overlay.remove(), 250, overlay);
            }
        });
        overlay.$('.close')?.addEventListener('click', () => {
            overlay.classList.remove('active');
            Utils.runAfter(() => overlay.remove(), 250, overlay);
        });

        return overlay;
    }
}
void Popup.init();