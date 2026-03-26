const version = "1.0.5.0";

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
    "/js/utils/timespan.js",
    "/js/utils/utils.js",
    "/js/utils/ffmpeg.js",
    "/assets/DesiresAreGrey192x.png",
    "/assets/DesiresAreGrey-Circle.png",
    "/assets/misc/ffmpeg/core/ffmpeg-core.js",
    "/assets/misc/ffmpeg/core/ffmpeg-core.wasm",
    "/assets/misc/ffmpeg/ffmpeg/classes.js",
    "/assets/misc/ffmpeg/ffmpeg/const.js",
    "/assets/misc/ffmpeg/ffmpeg/empty.mjs",
    "/assets/misc/ffmpeg/ffmpeg/errors.js",
    "/assets/misc/ffmpeg/ffmpeg/index.js",
    "/assets/misc/ffmpeg/ffmpeg/types.js",
    "/assets/misc/ffmpeg/ffmpeg/utils.js",
    "/assets/misc/ffmpeg/ffmpeg/worker.js",
    "/assets/misc/ffmpeg/util/const.js",
    "/assets/misc/ffmpeg/util/errors.js",
    "/assets/misc/ffmpeg/util/index.js",
    "/assets/misc/ffmpeg/util/types.js",
    "https://esm.sh/web-haptics",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
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