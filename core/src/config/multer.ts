import multer, { Options } from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";

const createStorage = (dirname: string) => {
  return {
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, "..", "..", "uploads", dirname),
      filename(request, file, callback) {
        const hash = crypto.randomBytes(6).toString("hex");

        const fileName = `${hash}-${file.originalname}`;

        callback(null, fileName);
      },
    }),
  };
};

export default createStorage;
