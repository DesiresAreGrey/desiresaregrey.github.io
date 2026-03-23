import { CSSUtils } from "../utils/css.js";

export default class OutLog {
    static async init(minimized = true) {
        await CSSUtils.applyStylesheet("/stylesheets/ui/outlog.css");

        if ($id("out-log")) {
            const logContainer = $id("out-log")!;
            logContainer.style.display = "block";
            if (minimized)
                logContainer.$("pre")!.style.display = "none";
            return;
        }
        const logContainer = document.createElement("div");
        logContainer.id = "out-log";
        logContainer.style.display = "none";
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
        if (minimized) {
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
            for (let i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'object')
                    log.innerHTML += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />'; 
                else
                    log.innerHTML += arguments[i] + '<br />';
            }
            log.scrollTop = log.scrollHeight;
            consoleLog.apply(console, arguments as any);
        };
        console.log("Created OutLog");
    }

    static async show() {
        await this.init();

        const logContainer = $id("out-log");
        if (logContainer)
            logContainer.style.display = "block";
    }

    static hide() {
        const logContainer = $id("out-log");
        if (logContainer)
            logContainer.style.display = "none";
    }
}
void OutLog.init();