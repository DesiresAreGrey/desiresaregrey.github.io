import { API } from "../utils/api.js";
import { Cache } from "../utils/cache.js";
import { JsonFetch } from "../utils/jsonfetch.js";
import { TimeSpan } from "../utils/timespan.js";
{
    const cached = Cache.get("apex-season-banner");
    const card = $("#apex-weapon-stats-card");
    if (cached) {
        console.log("Using cached Apex season banner");
        card?.style.setProperty(`--image`, `url('${cached}')`);
        card?.classList.add("loaded");
    }
    else {
        console.log("Fetching Apex season banner");
        setImage();
    }
    async function setImage() {
        const imageUrl = (await API.get("misc/apex/season-banner"))?.url;
        card?.style.setProperty(`--image`, `url('${imageUrl}')`);
        card?.classList.add("loaded");
        Cache.set("apex-season-banner", imageUrl, TimeSpan.fromHours(12).ms);
    }
}
{
    const cached = Cache.get("minecraft-update-banner");
    const card = $("#modded-minecraft-versions-card");
    if (cached) {
        console.log("Using cached Minecraft banner");
        card?.style.setProperty(`--image`, `url('${cached}')`);
        card?.classList.add("loaded");
    }
    else {
        console.log("Fetching Minecraft banner");
        setImage();
    }
    async function setImage() {
        const latest = (await JsonFetch.get("https://launchercontent.mojang.com/v2/games.json")).entries.find((entry) => entry.productId === "java");
        let imageUrl = latest.heroImage.url;
        if (imageUrl.startsWith("/"))
            imageUrl = `https://launchercontent.mojang.com${imageUrl}`;
        card?.style.setProperty(`--image`, `url('${imageUrl}')`);
        card?.classList.add("loaded");
        Cache.set("minecraft-update-banner", imageUrl, TimeSpan.fromHours(12).ms);
    }
}
//# sourceMappingURL=updatemisccards.js.map