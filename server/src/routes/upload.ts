import { Router } from "express";
import { handleError } from "../utils/nonTrpcErrorHandler";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { io } from "..";
import sharp from "sharp";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import {
  DELETE_AFTER,
  MAX_FILE_SIZE,
  THUMBNAILS_DIR,
  UPLOADS_DIR,
} from "../constants";
import prisma from "../utils/prisma";
import { moveFile } from "../utils/fs";
import { z } from "zod";
import { fileFormSchema } from "./uploadSchemas";
import { logger } from "../utils/logger";
import { getFileName } from "../utils/getFileName";

const router = Router();

router.post("/", (req, res) => {
  try {
    if (!fs.existsSync(UPLOADS_DIR))
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    if (!fs.existsSync(THUMBNAILS_DIR))
      fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });

    const form = formidable({
      uploadDir: UPLOADS_DIR,
      maxFiles: 1,
      maxFields: 1,
      maxFileSize: MAX_FILE_SIZE,
      multiples: false,
    });
    let filePath: string | null = null;

    form.on("fileBegin", (formName, file) => {
      filePath = file.filepath;
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        if (err.code === 1002) {
          logger.info("Aborting upload " + filePath, {
            label: getFileName(__filename),
          });
          if (filePath) fs.unlinkSync(filePath);
          return;
        }

        return handleError({
          res,
          error: err,
          statusCode: err.httpCode,
          label: getFileName(__filename),
        });
      }

      const data = fileFormSchema.safeParse({ fields, files });
      if (!data.success)
        return handleError({ res, statusCode: 400, error: data.error });
      const {
        fields: { deleteAfter },
        files: { file },
      } = data.data;

      const newId = uuidv4();
      const newFilepath = path.join(UPLOADS_DIR, newId);
      fs.renameSync(file.filepath, newFilepath);

      // The database entry can be accessed by a client query before the thumbnail exists
      // so create the thumbnail before creating the db record to avoid empty thumbnail on the client
      let hasThumbnail = false;
      if (file.mimetype?.startsWith("image/")) {
        const res = await sharp(fs.readFileSync(newFilepath))
          .resize(300)
          .toFile(path.join(THUMBNAILS_DIR, newId))
          .catch((e) => {
            // TODO: Catch by error code or something better
            if (e.message === "Input buffer contains unsupported image format")
              return;
            throw e;
          });

        if (res) {
          hasThumbnail = true;
        }
      }

      const savedFile = await prisma.file.create({
        data: {
          id: newId,
          name: file.originalFilename,
          size: file.size,
          mimetype: file.mimetype || "",
          uploaderIp:
            req.headers["x-forwarded-for"]?.toString() ||
            req.socket.remoteAddress ||
            "Unknown ip",
          hasThumbnail,
          deleteAt: new Date(new Date().getTime() + deleteAfter),
        },
      });

      io.emit("filesMutated");
      return res.status(200).json(savedFile);
    });
  } catch (e) {
    handleError({ res, error: e, label: getFileName(__filename) });
  }
});

router.get("/thumbnails/:id", async (req, res) => {
  try {
    const filePath = path.join(THUMBNAILS_DIR, req.params.id);
    if (!fs.existsSync(filePath))
      return handleError({
        res,
        statusCode: 404,
        message: `Thumbnail for file with id ${req.params.id} not found`,
        label: getFileName(__filename),
      });

    res.sendFile(filePath);
  } catch (e) {
    handleError({ res, error: e, label: getFileName(__filename) });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const file = await prisma.file.findUnique({
      where: { id: req.params.id },
    });
    if (!file)
      return handleError({
        res,
        statusCode: 404,
        label: getFileName(__filename),
        message: `File with id ${req.params.id} not found`,
      });

    res.set("Content-Type", file.mimetype);

    if (req.query?.openInBrowser === "true") {
      // EncodeURI to avoid crashing with weird characters
      res.set(
        "Content-Disposition",
        "inline; filename=" + encodeURI(file.name)
      );
      res.sendFile(path.join(UPLOADS_DIR, file.id));
      return;
    }

    res.download(path.join(UPLOADS_DIR, file.id), file.name);
  } catch (e) {
    handleError({ res, error: e, label: getFileName(__filename) });
  }
});

export default router;
