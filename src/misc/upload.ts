import { WebHaptics, defaultPatterns } from "web-haptics";
import Catbox from "../utils/catbox.js";
import ImageUpload from "../utils/imageupload.js";
import { Popup } from "../ui/popup.js";
import { ErrorPopup } from "../ui/errorpopup.js";
import { LoadingBar } from "../ui/loadingbar.js";
import { JsonFetch } from "../utils/jsonfetch.js";
import { API } from "../utils/api.js";
import '../utils/utils.js';

const haptics = new WebHaptics();

const fileInput = $id('file-input') as HTMLInputElement;
fileInput.addEventListener('change', selectedFile);

const dropOverlay = $('.drop-overlay') as HTMLDivElement;

const videoPreview = $id('video-preview') as HTMLVideoElement;
const imagePreview = $id('image-preview') as HTMLImageElement;

const fileInfo = $id('file-info') as HTMLDivElement;

const uploadButton = $id('upload-button') as HTMLButtonElement;
uploadButton.addEventListener('click', upload);

document.addEventListener('dragover', (e) => {
    if (!e.dataTransfer?.types.includes('Files'))
        return;
    e.preventDefault();
    
    dropOverlay.style.display = 'flex';
    void dropOverlay.offsetHeight;
    dropOverlay.classList.add('active')
});
document.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropOverlay.classList.remove('active');
    dropOverlay.runAfter(() => dropOverlay.style.display = 'none', 200);
});
document.addEventListener('drop', (e) => {
    e.preventDefault();
    dropOverlay.classList.remove('active');
    if (e.dataTransfer?.files?.item(0)) {
        fileInput.files = e.dataTransfer.files;
        selectedFile();
    }
});

async function selectedFile() {
    videoPreview.src = "";
    imagePreview.src = "";

    if (!fileInput.files || fileInput.files.length === 0) {
        uploadButton.disabled = true;
        return;
    }

    if (!await JsonFetch.isReachable(await API.url)) {
        ErrorPopup.show(new Error("Failed to reach upload server"), "Upload Failed");
        return;
    }

    const file = fileInput.files[0];
    if (file.type.startsWith('video/'))
        videoPreview.src = URL.createObjectURL(file);
    else if (file.type.startsWith('image/'))
        imagePreview.src = URL.createObjectURL(file);

    haptics.trigger(defaultPatterns.selection);

    if (file.type.startsWith("image/") && file.size < 20 * 1024 * 1024) {
        uploadButton.disabled = false;
    }
    else if (file.size < 200 * 1024 * 1024) {
        uploadButton.disabled = false;
    }
    fileInfo.textContent = `${file.name} • ${(file.size / (1024 * 1024)).roundTo(2)} MB`;
}

async function upload() {
    console.log("Uploading file...");
    if (!fileInput.files || fileInput.files.length === 0) {
        uploadButton.disabled = true;
        return;
    }
    const file = fileInput.files[0];
    
    const startTime = performance.now();
    LoadingBar.startFullTrickle((file.size / 1250000 + 1).roundTo(0));
    uploadButton.disabled = true;

    if (file.type.startsWith("image/") && file.size < 20 * 1024 * 1024) {
        try {
            const url = await ImageUpload.upload(file);
            console.log("Image uploaded to:", url);
            console.log("Upload completed in", ((performance.now() - startTime) / 1000).roundTo(2), "seconds");
            void showUploadedPopup(url, file.type);
        }
        catch (e) {
            ErrorPopup.show(e, "Upload Failed");
        }
    }
    else if (file.size < 200 * 1024 * 1024) {
        try {
            const url = await Catbox.upload(file);
            console.log("File uploaded to:", url);
            console.log("Upload completed in", ((performance.now() - startTime) / 1000).roundTo(2), "seconds");
            void showUploadedPopup(url, file.type);
        }
        catch (e) {
            ErrorPopup.show(e, "Upload Failed");
        }
    }

    LoadingBar.finish();
    uploadButton.disabled = false;
    videoPreview.pause();
}

async function showUploadedPopup(url: string, fileType: string) {
    const popup = await Popup.show( /* html */ `
        <div class="title" style="text-align: center;">File Uploaded</div>
        <div class="preview-wrapper noselect">
            ${fileType.startsWith('video/') ? /* html */ `<video id="video-preview" class="preview" src="${url}" autoplay controls playsinline disablePictureInPicture></video>` : ''}
            ${fileType.startsWith('image/') ? /* html */ `<img id="image-preview" class="preview" src="${url}"/>` : ''}
        </div>
        <p id="uploaded-link" style="font-size: 13px; color: #999; margin-top: 0.1rem; margin-bottom: 0; text-align: center;">${url}</p>
        <div class="button-row" style="margin-top: 0.5rem;">
            <button id="copy-link-button"><i class="fa-solid fa-copy"></i> Link</button>
            <button id="copy-markdown-button"><i class="fa-solid fa-copy"></i> MD</button>
        </div>
    `);

    const copyLinkButton = popup.$id('copy-link-button') as HTMLButtonElement;
    const copyMarkdownButton = popup.$id('copy-markdown-button') as HTMLButtonElement;
    copyLinkButton.addEventListener('click', () => {
        if (!url)
            return;
        navigator.clipboard.writeText(url);
        const icon = copyLinkButton.$("i")!;
        icon.classList.remove("fa-copy");
        icon.classList.add("fa-check");

        haptics.trigger(defaultPatterns.selection);

        copyLinkButton.runAfter(() => {
            icon.classList.remove("fa-check");
            icon.classList.add("fa-copy");
        }, 2500);
    });
    copyMarkdownButton.addEventListener('click', () => {
        if (!url)
            return;
        navigator.clipboard.writeText(`![](${url})`);
        const icon = copyMarkdownButton.$("i")!;
        icon.classList.remove("fa-copy");
        icon.classList.add("fa-check");

        haptics.trigger(defaultPatterns.selection);

        copyMarkdownButton.runAfter(() => {
            icon.classList.remove("fa-check");
            icon.classList.add("fa-copy");
        }, 2500);
    });
}