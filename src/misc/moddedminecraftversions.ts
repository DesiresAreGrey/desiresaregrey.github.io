import { Apex } from "../charts/apex.js";
import { API } from "../utils/api.js";
import { LoadingBar } from "../ui/loadingbar.js";
import { Utils } from "../utils/utils.js";

const loaderColors = ['rgb(236, 186, 149)', 'rgb(170, 85, 255)', 'rgb(216, 130, 49)', 'rgb(79, 120, 202)'];
const startingVersions = [
    "1.7.10",
    "1.12.2",
    "1.16.5",
    "1.17.1",
    "1.18.2",
    "1.19.2",
    "1.20",
    "1.20.1",
    "1.20.2",
    "1.20.4",
    "1.21",
    "1.21.1",
    "1.21.10",
    "1.21.11",
    "26.1"
];

const parseVersions = (input: string) => input
    .split(/(?:,| |\n)/)
    .map(v => v.trim())
    .filter(v => v.length > 0 && !isNaN(Utils.compareVersions(v, v)))
    .sort(Utils.compareVersions);

const versionsChanged = (input: string, currentVersions: string[] | undefined) => parseVersions(input).join(", ") === currentVersions?.join(", ");

await loadOverallCharts(0, 0.333);
await loadModrinthCharts(0.333, 0.666);
await loadCurseforgeCharts(0.666, 1);

async function loadOverallCharts(loadStart = 0, loadEnd = 1) {
    const input = $id("overall-versions-input") as HTMLTextAreaElement;
    const updateButton = $id("overall-versions-update") as UpdateButton;

    updateButton.versions ??= startingVersions;

    //if (parseVersions(input.value).length === 0)
        input.value = updateButton.versions.join(", ");
    input.addEventListener("keydown", enterToUpdate);
    input.addEventListener("input", () => toggleUpdateButton(updateButton, input.value));
    toggleUpdateButton(updateButton, input.value);

    updateButton.addEventListener("click", async () => {
        if (versionsChanged(input.value, updateButton.versions))
            return;
        updateButton.versions = parseVersions(input.value);
        await loadOverallCharts();
        toggleUpdateButton(updateButton, input.value);
    });

    if (loadStart === 0)
        LoadingBar.start();

    LoadingBar.update(0.0.remap(loadStart, loadEnd));

    const totalCurseforge = await API.post("/misc/minecraft/curseforge/modded-versions", {
        loaders: ["All"],
        versions: updateButton.versions
    });
    totalCurseforge.series[0].name = "Curseforge";
    console.log(totalCurseforge);

    LoadingBar.update(0.5.remap(loadStart, loadEnd));

    const totalModrinth = await API.post("/misc/minecraft/modrinth/modded-versions", {
        loaders: ["All"],
        versions: updateButton.versions
    });
    totalModrinth.series[0].name = "Modrinth";
    console.log(totalModrinth);

    const total = totalCurseforge;
    total.series.push(...totalModrinth.series);

    showApiRequests("overall-versions", totalCurseforge.apiRequests + totalModrinth.apiRequests, "Modrinth/Curseforge");

    LoadingBar.update(0.9.remap(loadStart, loadEnd));
    $id("overall-total")!.innerHTML = "";
    Apex.createBarChart("overall-total", total, "All Mods", `Data Updated ${Utils.readableDate(total.lastUpdated)}`, [], ['#f16436', '#1bd96a'], 500, false, false, "mods");

    if (loadEnd === 1)
        LoadingBar.finish();
}

async function loadModrinthCharts(loadStart = 0, loadEnd = 1) {
    const input = $id("modrinth-versions-input") as HTMLTextAreaElement;
    const updateButton = $id("modrinth-versions-update") as UpdateButton;

    updateButton.versions ??= startingVersions;

    //if (parseVersions(input.value).length === 0)
        input.value = updateButton.versions.join(", ");
    input.addEventListener("keydown", enterToUpdate);
    input.addEventListener("input", () => toggleUpdateButton(updateButton, input.value));
    toggleUpdateButton(updateButton, input.value);

    updateButton.addEventListener("click", async () => {
        if (versionsChanged(input.value, updateButton.versions))
            return;
        updateButton.versions = parseVersions(input.value);
        await loadModrinthCharts();
        toggleUpdateButton(updateButton, input.value);
    });

    if (loadStart === 0)
        LoadingBar.start();

    LoadingBar.update(0.0.remap(loadStart, loadEnd));

    const modrinth = await API.post("/misc/minecraft/modrinth/modded-versions", {
        loaders: ["Fabric", "Quilt", "NeoForge", "Forge"],
        versions: updateButton.versions
    });
    console.log(modrinth);

    showApiRequests("modrinth-versions", modrinth.apiRequests, "Modrinth");

    LoadingBar.update(0.9.remap(loadStart, loadEnd));
    $id("modrinth-loader")!.innerHTML = "";
    Apex.createBarChart("modrinth-loader", modrinth, "Modrinth - By Loader", `Data Updated ${Utils.readableDate(modrinth.lastUpdated)}`, [], loaderColors, 500, false, false, "mods");

    LoadingBar.update(0.95.remap(loadStart, loadEnd));
    $id("modrinth-loader-ratio")!.innerHTML = "";
    Apex.createRatioBarChart("modrinth-loader-ratio", modrinth, "Modrinth - By Loader (Ratio)", `Data Updated ${Utils.readableDate(modrinth.lastUpdated)}`, [], loaderColors, 500, false, "mods");

    if (loadEnd === 1)
        LoadingBar.finish();
}

async function loadCurseforgeCharts(loadStart = 0, loadEnd = 1) {
    const input = $id("curseforge-versions-input") as HTMLTextAreaElement;
    const updateButton = $id("curseforge-versions-update") as UpdateButton;

    updateButton.versions ??= startingVersions;

    //if (parseVersions(input.value).length === 0)
        input.value = updateButton.versions.join(", ");
    input.addEventListener("keydown", enterToUpdate);
    input.addEventListener("input", () => toggleUpdateButton(updateButton, input.value));
    toggleUpdateButton(updateButton, input.value);

    updateButton.addEventListener("click", async () => {
        if (versionsChanged(input.value, updateButton.versions))
            return;
        updateButton.versions = parseVersions(input.value);
        await loadCurseforgeCharts();
        toggleUpdateButton(updateButton, input.value);
    });

    if (loadStart === 0)
        LoadingBar.start();

    LoadingBar.update(0.0.remap(loadStart, loadEnd));

    const curseforge = await API.post("/misc/minecraft/curseforge/modded-versions", {
        loaders: ["Fabric", "Quilt", "NeoForge", "Forge"],
        versions: updateButton.versions
    });
    console.log(curseforge);

    showApiRequests("curseforge-versions", curseforge.apiRequests, "Curseforge");

    LoadingBar.update(0.9.remap(loadStart, loadEnd));
    $id("curseforge-loader")!.innerHTML = "";
    Apex.createBarChart("curseforge-loader", curseforge, "Curseforge - By Loader", `Data Updated ${Utils.readableDate(curseforge.lastUpdated)}`, [], loaderColors, 500, false, false, "mods");

    LoadingBar.update(0.95.remap(loadStart, loadEnd));
    $id("curseforge-loader-ratio")!.innerHTML = "";
    Apex.createRatioBarChart("curseforge-loader-ratio", curseforge, "Curseforge - By Loader (Ratio)", `Data Updated ${Utils.readableDate(curseforge.lastUpdated)}`, [], loaderColors, 500, false, "mods");

    if (loadEnd === 1)
        LoadingBar.finish();
}

function toggleUpdateButton(button: UpdateButton, input: string) {
    console.log(parseVersions(input));
    button.classList.toggle("disabled", versionsChanged(input, button.versions));
}

function showApiRequests(containerId: string, requests: number, apiName: string) {
    const inputWrapper = $id(containerId)?.$(".input-wrapper") as HTMLDivElement;
    if (inputWrapper) {
        inputWrapper.classList.add("show-requests");
        inputWrapper.setAttribute("data-requests", `${requests} ${apiName} API Request${requests !== 1 ? "s" : ""}`);
        Utils.runAfter(() => inputWrapper.classList.remove("show-requests"), 5000, inputWrapper);
    }
}

function enterToUpdate(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const input = e.target as HTMLTextAreaElement;
        input.blur();
        (input.parentNode?.parentNode?.querySelector(".button") as HTMLElement).click();
    }
}

interface UpdateButton extends HTMLDivElement {
    versions?: string[];
}