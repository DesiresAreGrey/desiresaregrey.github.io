import { JsonFetch } from "../utils/jsonfetch.js";
import { LoadingBar } from "../ui/loadingbar.js";
import { Cache } from "../utils/cache.js";
import { TimeSpan } from "../utils/timespan.js";
import { defaultPatterns, WebHaptics } from "web-haptics";
import "../utils/utils.js";
class Gif {
    name;
    url;
    tags = [];
    title;
    link;
    nsfw;
    constructor(post) {
        this.name = post.name;
        this.url = post.url;
        const tagRegex = /#(\w+)/g;
        if (post.body)
            this.tags = Array.from(post.body.matchAll(tagRegex), ([, tag]) => tag);
        this.title = post.name + (this.tags.length > 0 ? ` [${this.tags.map(t => `#${t}`).join(", ")}]` : "");
        this.link = post.ap_id;
        this.nsfw = post.nsfw;
    }
}
const haptics = new WebHaptics();
const gifList = $("gif-list");
const sortSelect = $("#sort-select");
const categorySelect = $("#category-select");
const searchInput = $("#search-input");
sortSelect.value = Cache.get("tranistan-gifs-sort") ?? "TopAll";
Cache.set("tranistan-gifs-sort", sortSelect.value, TimeSpan.fromDays(1));
categorySelect.value = Cache.get("tranistan-gifs-category") ?? "sfw";
Cache.set("tranistan-gifs-category", categorySelect.value, TimeSpan.fromDays(1));
let gifs = await getGifs(sortSelect.value);
sortSelect.addEventListener("change", async () => {
    gifs = await getGifs(sortSelect.value);
    updateAndFilter();
    Cache.set("tranistan-gifs-sort", sortSelect.value, TimeSpan.fromDays(1));
});
categorySelect.addEventListener("change", () => {
    updateAndFilter();
    Cache.set("tranistan-gifs-category", categorySelect.value, TimeSpan.fromDays(1));
});
searchInput.addEventListener("input", () => updateAndFilter());
updateAndFilter();
function updateAndFilter() {
    let filteredGifs = gifs;
    if (searchInput.value)
        filteredGifs = filteredGifs.filter(g => g.name.toLowerCase().includes(searchInput.value.toLowerCase()) || g.tags.some(t => t.toLowerCase().includes(searchInput.value.replace("#", "").toLowerCase())));
    if (categorySelect.value === "sfw")
        filteredGifs = filteredGifs.filter(g => !g.nsfw);
    updateList(filteredGifs);
}
async function getGifs(sort) {
    LoadingBar.start();
    const gifPosts = [];
    let cursor = null;
    do {
        const response = await JsonFetch.get(`https://tranistan.com/api/v3/post/list?community_name=gifs&show_nsfw=true&limit=50&sort=${sort}${cursor ? `&page_cursor=${cursor}` : ""}`);
        gifPosts.push(...response.posts.map((item) => item.post));
        cursor = response.next_page;
    } while (cursor);
    console.log("gifPosts", gifPosts);
    LoadingBar.finish();
    return gifPosts.filter(p => p.url_content_type === "image/gif" && (p.url?.includes("cdn.discordapp.com") == false)).map(p => new Gif(p));
}
function updateList(gifs) {
    if (!gifList)
        return;
    console.log("gifs", gifs);
    gifList.innerHTML = "";
    gifs.forEach((gif, i) => {
        const item = document.createElement("gif-item");
        item.innerHTML = `
            <img src="${gif.url}" alt="${gif.name.escapeHTML()}" class="gif-preview"/>
            <div id="name">
                <a href="${gif.link}" target="_blank">${gif.name.escapeHTML()}${gif.tags.length > 0 ? ` <span style="color: #ccc; font-size: 10px">${gif.tags.map(t => `#${t}`).join(" ")}</span>` : ""}</a>
            </div>
            <div class="buttons noselect">
                <div id="copy-link" class="button"><i class="fa-solid fa-copy"></i> Link</div>
                <div id="copy-md" class="button"><i class="fa-solid fa-copy"></i> MD</div>
            </div>
            <div id="rank">#${i + 1}</div>
        `;
        const copyLinkButton = item.$id("copy-link");
        copyLinkButton.addEventListener("click", async () => {
            await navigator.clipboard.writeText(gif.url);
            const icon = copyLinkButton.$("i");
            icon.classList.remove("fa-copy");
            icon.classList.add("fa-check");
            haptics.trigger(defaultPatterns.selection);
            console.log(`Copied ${gif.url} to clipboard`);
            copyLinkButton.runAfter(() => {
                icon.classList.remove("fa-check");
                icon.classList.add("fa-copy");
            }, 1000);
        });
        const copyMdButton = item.$id("copy-md");
        copyMdButton.addEventListener("click", async () => {
            await navigator.clipboard.writeText(`![${gif.name}](${gif.url})`);
            const icon = copyMdButton.$("i");
            icon.classList.remove("fa-copy");
            icon.classList.add("fa-check");
            haptics.trigger(defaultPatterns.selection);
            console.log(`Copied ![${gif.name}](${gif.url}) to clipboard`);
            copyMdButton.runAfter(() => {
                icon.classList.remove("fa-check");
                icon.classList.add("fa-copy");
            }, 1000);
        });
        gifList.appendChild(item);
    });
}
//# sourceMappingURL=tranistan-gifs.js.map