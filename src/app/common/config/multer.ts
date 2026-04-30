import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { ALLOWED_FILE_TYPES } from "../utils/constants";
import ApiError from "../utils/api-error";

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  let allowedFiles = ALLOWED_FILE_TYPES;
  if (allowedFiles.includes(file.mimetype)) cb(null, true);
  else
    cb(
      ApiError.badRequest(
        "File type not supported. Available types are jpeg and png",
      ) as any,
      false,
    );
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

export { upload };
