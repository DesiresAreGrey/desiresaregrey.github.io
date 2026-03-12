import { API } from './utils/api.js';
import { BrowserIdentity } from './utils/identity.js';
import { WordCloud } from './charts/wordcloud.js';
import { Utils } from './utils/utils.js';
import { JsonFetchError } from './utils/jsonfetch.js';
import { LoadingBar } from './ui/loadingbar.js';

const identityId = await BrowserIdentity.id;
console.log('Identity ID:', identityId);

let userWordList: string[] = [];

await document.fonts.load("700 1em 'Bitter'");

loadWordcloud();

async function loadWordcloud(reload = false) {
    const wordcloudData = await API.get("about/wordcloud" + (reload ? `?reload=${Date.now()}` : ""), { identity: identityId });

    const el = $id("your-wordcloud")!;
    const height = el.style.height.replace("px", "")?.parseFloat() ?? 300;
    WordCloud.createWordCloud(el.id, wordcloudData, height, "#a46fff", {
        minSize: 15,
        maxSize: 80,
        padding: 2.5,
        scaleLinear: false,
        unit: "submission"
    });
    
    const input = $id("words-input") as HTMLTextAreaElement;
    const updateButton = $id("submit-button") as HTMLElement;

    if (userWordList.length === 0) {
        try {
            const user = await API.get("about/wordcloud/user", { identity: identityId });
            console.log(user);
            userWordList = user.wordList;
            input.value = userWordList.join(", ");
        } catch (e) {
            console.error(e);
            if (e instanceof JsonFetchError && e.response.status !== 404) {
                showMessage(await e.responseMessage);
            }
        }
    }

    toggleUpdateButton(updateButton, input.value);
    
    if (!reload) {
        input.addEventListener("keydown", e => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const input = e.target as HTMLTextAreaElement;
                input.blur();
                updateButton.click();
            }
        });
        input.addEventListener("input", () => toggleUpdateButton(updateButton, input.value));
        updateButton.addEventListener("click", async () => {
            if (parseWordList(input.value).join(", ") === userWordList?.join(", "))
                return;

            LoadingBar.startTrickle();
            try {
                const response = await API.post("about/wordcloud/submit", { identity: identityId, wordList: parseWordList(input.value) });
                console.log(response);
                if (response.wordList.length > 0) {
                    userWordList = response.wordList;
                    input.value = userWordList.join(", ");
                    loadWordcloud(true);
                    showMessage("Success");
                }
            }
            catch (e) {
                console.error(e);
                if (e instanceof JsonFetchError)
                    showMessage(await e.responseMessage);
            }
            LoadingBar.finish();
        });
    }
}

function parseWordList(input: string) {
    return input
        .split(/(?:,|\n)/)
        .map(v => v.trim())
        .filter(v => v.length > 0);
}

function toggleUpdateButton(button: HTMLElement, input: string) {
    button.classList.toggle("disabled", parseWordList(input).join(", ") === userWordList?.join(", "));
}

function showMessage(message: string) {
    const inputWrapper = $(".input-wrapper") as HTMLDivElement;
    if (inputWrapper) {
        inputWrapper.classList.add("show-message");
        inputWrapper.setAttribute("data-message", message);
        Utils.runAfter(() => inputWrapper.classList.remove("show-message"), 2500, inputWrapper);
    }
}