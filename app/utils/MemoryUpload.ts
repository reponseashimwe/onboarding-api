import multer, { memoryStorage } from "multer";

export const memoryUpload = multer({ storage: memoryStorage() });
