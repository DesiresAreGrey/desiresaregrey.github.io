import { API } from "./api.js";

export default class Catbox {
    static async upload(file: File | Blob): Promise<string> {
        if (file.type === "image/gif" && file.size >= 20 * 1024 * 1024)
            throw new Error("Gif file size exceeds 20MB limit");
        else if (file.size >= 200 * 1024 * 1024)
            throw new Error("File size exceeds 200MB limit");

        const formData = new FormData();
        formData.append('fileToUpload', file, file instanceof File ? file.name : undefined);
        try {
            const response = await API.post("proxy/catbox/upload", formData);
            return response.url;
        }
        catch (error) {
            console.error("Error uploading file:", error);
            return "";
        }
    }
}