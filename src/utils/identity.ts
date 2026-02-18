import { API } from "./api.js";

export class BrowserIdentity {
    static #id: Promise<string> | null = null;

    static get id(): Promise<string> {
        if (!this.#id) {
            const id = localStorage.getItem("browseridentity") ?? "";
            this.#id = API.get("identity", { id: id }).then(json => {
                localStorage.setItem("browseridentity", json.identity.id);
                return json.identity.id;
            })
        }
        
        return this.#id;
    }
}
void BrowserIdentity.id;