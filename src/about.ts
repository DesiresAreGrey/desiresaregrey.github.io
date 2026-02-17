import { API } from './utils/api.js';
import { Fingerprint } from './utils/fp.js';
import { WordCloud } from './charts/wordcloud.js';

const visitorId = await Fingerprint.visitorId;
console.log('Fingerprint visitor ID:', visitorId);

let userWordList: string[];

await document.fonts.load("700 1em 'Bitter'");

loadWordcloud();

async function loadWordcloud(reload = false) {
    const wordcloudData = await API.get("about/wordcloud" + (reload ? `?reload=${Date.now()}` : ""), { fingerprint: visitorId });

    const el = $id("your-wordcloud")!;
    const height = el.style.height.replace("px", "")?.parseFloat() ?? 300;
    WordCloud.createWordCloud(el.id, wordcloudData, height, "#a46fff", {
        minSize: 15,
        maxSize: 80,
        padding: 3,
        scaleLinear: false,
        unit: "submission"
    });
    
    
    const input = $id("words-input") as HTMLTextAreaElement;
    const updateButton = $id("submit-button") as HTMLElement;

    console.log(updateButton);

    try {
        const user = await API.get("about/wordcloud/user", { fingerprint: visitorId });
        console.log(user);
        userWordList = user.wordList;
        input.value = userWordList.join(", ");
    } catch {}

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

            const response = await API.post("about/wordcloud/submit", { fingerprint: visitorId, wordList: parseWordList(input.value) });
            console.log(response);
            if (response.wordList.length > 0) {
                userWordList = response.wordList;
                input.value = userWordList.join(", ");
                loadWordcloud(true);
            }
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