import { CSSUtils } from "../utils/css.js";

export default class OutLog {
    private static minimized = true;

    static async init(minimized ?: boolean) {
        if (minimized !== undefined)
            this.minimized = minimized;

        await CSSUtils.applyStylesheet("/stylesheets/ui/outlog.css");

        if ($id("out-log")) {
            const logContainer = $id("out-log")!;
            logContainer.style.display = "block";
            if (this.minimized == true)
                logContainer.$("pre")!.style.display = "none";
            if (logContainer.style.opacity === "0") {
                void logContainer.offsetHeight;
                logContainer.style.opacity = "1";
            }
            return;
        }
        const logContainer = document.createElement("div");
        logContainer.id = "out-log";
        logContainer.style.display = "none";
        logContainer.style.opacity = "0";
        logContainer.innerHTML = /* html */ `
            <div id="header">
                Log
                <div id="close">
                    <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Menu / Close_SM"><path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                </div>
            </div>
            <pre></pre>
        `;
        document.body.appendChild(logContainer);
        const log = logContainer.$("pre")!;
        if (this.minimized == true) {
            log.style.display = "none";
            logContainer.$("#close")!.style.transform = `rotate(-45deg)`;
        }
            
        logContainer.$("#close")?.addEventListener("click", () => {
            if (log.style.display === "none") {
                log.style.display = "block";
                log.scrollTop = log.scrollHeight;
                logContainer.$("#close")!.style.transform = `rotate(0deg)`;
            } 
            else {
                log.style.display = "none";
                logContainer.$("#close")!.style.transform = `rotate(-45deg)`;
            }
            
        });
        const consoleLog = console.log;
        console.log = function () {
            let line = '<span class="prefix">&gt;</span>';
            for (let i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'number' || typeof arguments[i] == 'boolean') {
                    line += `<span class="highlighted">${arguments[i]}</span> `; 
                }
                else if (typeof arguments[i] == 'object') {
                    try {
                        const type = (arguments[i] as { constructor?: { name?: string } }).constructor?.name ?? "Object";
                        const objectString = JSON.stringify(arguments[i], undefined, 2) ?? arguments[i];
                        line += `<span class="highlighted">${type}</span> ${objectString} `; 
                    }
                    catch {
                        line += `${arguments[i]} `;
                    }
                }
                else {
                    line += `${arguments[i]} `;
                }
            }
            log.innerHTML += line.trim() + '<br/>';
            log.scrollTop = log.scrollHeight;
            consoleLog.apply(console, arguments as any);
        };
        console.log("Created Log Window");
    }

    static async show(minimized ?: boolean) {
        await this.init(minimized);

        const logContainer = $id("out-log");
        if (logContainer) {
            logContainer.style.display = "block";
            logContainer.runAfter(() => {
                if (logContainer.style.opacity === "0") {
                    void logContainer.offsetHeight;
                    logContainer.style.opacity = "1";
                }
            }, 100);
            
        }
    }

    static hide() {
        const logContainer = $id("out-log");
        if (logContainer) {
            logContainer.style.opacity = "0";
            logContainer.runAfter(() => logContainer.style.display = "none", 250);
        }
    }
}
void OutLog.init();