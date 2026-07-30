import { API } from "./api.js";
export class BrowserIdentity {
    static #id = null;
    static get id() {
        if (!this.#id) {
            const id = localStorage.getItem("browseridentity") ?? "";
            this.#id = API.get("identity", { id: id }).then(json => {
                localStorage.setItem("browseridentity", json.identity.id);
                return json.identity.id;
            });
        }
        return this.#id;
    }
}
void BrowserIdentity.id;
//# sourceMappingURL=identity.js.map