import {diskStorage} from "multer";
import {MulterOptions} from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import {join} from 'path';
import {existsSync, mkdirSync} from "fs";
import {UnprocessableEntityException} from "@nestjs/common";

export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, callback) => {
      const destination = join(__dirname, "../../..", "uploads");
      if (!existsSync(destination)) {
        mkdirSync(destination, {recursive: true});
      }
      callback(null, "uploads");
    },
    filename: (req, file, callback) => {
      const extension = file.originalname.split(".").at(-1);
      if (!extension)
        throw new UnprocessableEntityException("Invalid file extension");
      const fileName = `file_${Date.now()}.${extension}`
      callback(null, fileName);
    },
  })
}