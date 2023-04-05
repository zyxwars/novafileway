import path from "path";

// TODO: 1000 * 60 * 60 * 24 * 7;
export const DELETE_AFTER = 1000 * 60 * 60 * 24 * 7;
export const PORT = 8080;
export const UPLOADS_DIR = path.join(__dirname, "../persist_data/uploads");
export const THUMBNAILS_DIR = path.join(UPLOADS_DIR, "thumbnails");
// How much of the actual free space will be offered to the app as a fraction eg. 1/2
// Currently just used for testing filled disk indicator and not hooked up to upload
export const ALLOWED_DISK_SPACE = 1;
