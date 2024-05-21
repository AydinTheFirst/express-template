/**
 * Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files.
 */

import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({ storage });
