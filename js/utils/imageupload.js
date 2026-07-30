import { API } from "./api.js";
export default class ImageUpload {
    static async upload(file) {
        if (file.size > 20 * 1024 * 1024)
            throw new Error("File size exceeds 20MB limit");
        if (!file.type.startsWith("image/"))
            throw new Error("File is not an image");
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const base64String = reader.result?.toString().replace("data:", "").replace(/^.+,/, "");
                    if (base64String) {
                        const upload = await API.post("proxy/freeimage/upload", {
                            base64Image: base64String,
                        });
                        resolve(upload.image.url);
                    }
                    else {
                        reject(new Error("Failed to read image data"));
                    }
                }
                catch (e) {
                    reject(e);
                }
            };
            reader.onerror = () => reject(new Error("Failed to load image"));
            reader.readAsDataURL(file);
        });
    }
}
//# sourceMappingURL=imageupload.js.map