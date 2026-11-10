const version = "1.1.1.0";

const cacheUrls = [
    "/misc/mp4-converter/",
    "/misc/mp4-converter/index.html",
    "/misc/mp4-converter/manifest.json",
    "/stylesheets/extra.min.css",
    "/stylesheets/misc/mp4-converter.css",
    "/stylesheets/ui/errorpopup.css",
    "/stylesheets/ui/popup.css",
    "/stylesheets/ui/outlog.css",
    "/stylesheets/components/settings.css",
    "/js/components/settings.js",
    "/js/misc/mp4-converter.js",
    "/js/utils/api.js",
    "/js/utils/css.js",
    "/js/utils/jsonfetch.js",
    "/js/ui/loadingbar.js",
    "/js/ui/errorpopup.js",
    "/js/ui/popup.js",
    "/js/ui/outlog.js",
    "/js/utils/swhelper.js",
    "/js/utils/timespan.js",
    "/js/utils/utils.js",
    "/js/utils/mediabunny-helper.js",
    "/js/utils/site-settings.js",
    "/js/utils/cache.js",
    "/js/utils/catbox.js",
    "/assets/DesiresAreGrey192x.png",
    "/assets/DesiresAreGrey-Circle.png",
    "https://esm.sh/web-haptics",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
    "https://esm.sh/mediabunny@1.65.2",
    "https://esm.sh/mediabunny@1.65.2/es2022/mediabunny.mjs"
];

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open("v1");
        await cache.addAll(cacheUrls);
    })());
});

self.addEventListener("fetch", (event) => {
    event.respondWith((async () => {
        const response = await caches.match(event.request);
        if (!response) {
            console.log("Cache miss for", event.request.url);
            try {
                return await fetch(event.request);
            }
            catch (error) {
                console.error("Fetch failed for", event.request.url, "with error", error);
                    return new Response('File not found in cache and network failed.', {
                    status: 404,
                    headers: { 'Content-Type': 'text/plain' }
                });
            }
        }
        return response;
    })());
});