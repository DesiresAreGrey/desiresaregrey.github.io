import { JsonFetch } from "../utils/jsonfetch.js";
import { LoadingBar } from "../utils/loadingbar.js";
import "../utils/utils.js";
import { Utils } from "../utils/utils.js";

interface Post {
    id: number;
    ap_id: string;
    name: string;
    body: string;
    community_id: number;
    creator_id: number;
    deleted: boolean;
    featured_community: boolean;
    featured_local: boolean;
    published: string;
    updated: string;
    nsfw: boolean;

    url: string;
    url_content_type: "image/gif" | string;
}

class Gif {
    name: string;
    url: string;

    tags: string[] = [];

    title: string;
    link: string;

    nsfw: boolean;

    constructor(post: Post) {
        this.name = post.name;
        this.url = post.url;

        const tagRegex = /#(\w+)/g;
        if (post.body)
            this.tags = Array.from(post.body.matchAll(tagRegex), ([, tag]) => tag);

        this.title = post.name + (this.tags.length > 0 ? ` [${this.tags.map(t => `#${t}`).join(", ")}]` : "");
        this.link = post.ap_id;
        this.nsfw = post.nsfw;

        console.log(this);
    }
}

const gifList = $("gif-list"); 
const sortSelect = $("#sort-select") as HTMLSelectElement;
const categorySelect = $("#category-select") as HTMLSelectElement;
const searchInput = $("#search-input") as HTMLInputElement;

let gifs = await getGifs(sortSelect.value);
sortSelect.addEventListener("change", async () => {
    gifs = await getGifs(sortSelect.value);
    updateAndFilter();
});
categorySelect.addEventListener("change", () => updateAndFilter());
searchInput.addEventListener("input", () => updateAndFilter());
updateAndFilter();

function updateAndFilter() {
    console.log("Filtering gifs...");
    let filteredGifs = gifs;
    if (searchInput.value)
        filteredGifs = filteredGifs.filter(g => g.name.toLowerCase().includes(searchInput.value.toLowerCase()) || g.tags.some(t => t.toLowerCase().includes(searchInput.value.toLowerCase())));
    if (categorySelect.value === "sfw")
        filteredGifs = filteredGifs.filter(g => !g.nsfw);

    updateList(filteredGifs);
}

async function getGifs(sort: string): Promise<Gif[]> {
    LoadingBar.start();

    const gifPosts: Post[] = [];
    let cursor: string | null = null;
    do {
        const response: any = await JsonFetch.get(`https://tranistan.com/api/v3/post/list?community_name=gifs&show_nsfw=true&limit=50&sort=${sort}${cursor ? `&page_cursor=${cursor}` : ""}`);
        gifPosts.push(...response.posts.map((item: any) => item.post));
        cursor = response.next_page;
    } while (cursor);
    
    console.log(gifPosts);
    LoadingBar.finish();
    return gifPosts.filter(p => p.url_content_type === "image/gif").map(p => new Gif(p));
}

function updateList(gifs: Gif[]) {
    if (!gifList)
        return;
    gifList.innerHTML = "";
    gifs.forEach(gif => {
        const item = document.createElement("gif-item");
        item.innerHTML = `
            <img src="${gif.url}" alt="${gif.name}" class="gif-preview"/>
            <div id="name">
                <a href="${gif.link}" target="_blank">${gif.title}</a>
            </div>
            <div class="buttons noselect">
                <div id="copy-link" class="button"><i class="fa-solid fa-copy"></i> Link</div>
                <div id="copy-md" class="button"><i class="fa-solid fa-copy"></i> MD</div>
            </div>
        `;
        const copyLinkButton = item.$id("copy-link")!;
        copyLinkButton.addEventListener("click", async () => {
            await navigator.clipboard.writeText(gif.url);
            const icon = copyLinkButton.$("i")!;
            icon.classList.remove("fa-copy");
            icon.classList.add("fa-check");
            Utils.runAfter(() => {
                icon.classList.remove("fa-check");
                icon.classList.add("fa-copy");
            }, 1000, copyLinkButton);
        });
        const copyMdButton = item.$id("copy-md")!;
        copyMdButton.addEventListener("click", async () => {
            await navigator.clipboard.writeText(`![${gif.name}](${gif.url})`);
            const icon = copyMdButton.$("i")!;
            icon.classList.remove("fa-copy");
            icon.classList.add("fa-check");
            Utils.runAfter(() => {
                icon.classList.remove("fa-check");
                icon.classList.add("fa-copy");
            }, 1000, copyMdButton);
        });
        gifList.appendChild(item);
    });
}