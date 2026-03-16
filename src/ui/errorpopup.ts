import { CSSUtils } from "../utils/css.js";
import { Popup } from "./popup.js";

export class ErrorPopup {
    static async init() {
        await CSSUtils.applyStylesheet("/stylesheets/ui/errorpopup.css");
    }

    static async show(error: unknown, title: string = "Error") {
        await this.init();

        Popup.show( /* html */ `
            <div class="title">${title}</div>
            <div class="message">${error instanceof Error ? error.stack : error}</div>
        `, "error-popup");
    }
}
void ErrorPopup.init();