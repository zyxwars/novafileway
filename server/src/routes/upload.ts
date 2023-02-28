import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { sendBadRequest, sendError } from "../utils/nonTrpcErrorHandler";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { THUMBNAILS_DIR, UPLOADS_DIR, io } from "..";
import sharp from "sharp";
import os from "os";
import { v4 as uuidv4 } from "uuid";

const MAX_FILE_SIZE = 500 * 1000 ** 2;

const prisma = new PrismaClient();

const router = Router();

router.post("/", (req, res) => {
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);
  if (!fs.existsSync(THUMBNAILS_DIR)) fs.mkdirSync(THUMBNAILS_DIR);

  const form = formidable({
    uploadDir: os.tmpdir(),
    maxFiles: 1,
    maxFields: 1,
    maxFileSize: MAX_FILE_SIZE,
  });
  let filePath: string | null = null;

  form.on("fileBegin", (formName, file) => {
    filePath = file.filepath;
  });

  // Delete file on abort
  form.on("aborted", () => {
    if (filePath) {
      fs.unlinkSync(filePath);
    }
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      if (err) return sendError(res, err.message);
    }

    // The file shouldn't be an array as specified in formidable options
    const file = files?.file as formidable.File | null;

    if (!file) {
      return sendBadRequest(res, "No file provided");
    }

    // The database entry can be accessed by client query before the thumbnail exists
    // so create the thumbnail before creating the db record
    const newId = uuidv4();

    const newFilepath = path.join(UPLOADS_DIR, newId);

    // Move file from tmp to permanent storage
    fs.renameSync(file.filepath, newFilepath);

    // Create thumbnail
    if (file.mimetype?.startsWith("image/")) {
      await sharp(fs.readFileSync(newFilepath))
        .resize(300)
        .toFile(path.join(THUMBNAILS_DIR, newId));
    }

    const savedFile = await prisma.file.create({
      data: {
        id: newId,
        name: file.originalFilename || "Unnamed file",
        size: file.size,
        mimetype: file.mimetype || "",
      },
    });

    io.emit("filesMutated");
    return res.status(200).json(savedFile);
  });
});

router.get("/thumbnails/:id", async (req, res) => {
  if (!fs.existsSync(path.join(THUMBNAILS_DIR, req.params.id)))
    return res
      .status(404)
      .send(`Thumbnail for file with id ${req.params.id} not found`);

  res.sendFile(path.join(THUMBNAILS_DIR, req.params.id));
});

router.get("/:id", async (req, res) => {
  const file = await prisma.file.findUnique({
    where: { id: req.params.id },
  });
  if (!file)
    return res.status(404).send(`File with id ${req.params.id} not found`);

  res.set("Content-Type", file.mimetype);

  if (req.query?.openInBrowser === "true") {
    // EncodeURI to avoid crashing with weird characters
    res.set("Content-Disposition", "inline; filename=" + encodeURI(file.name));
    res.sendFile(path.join(UPLOADS_DIR, file.id));
    return;
  }

  res.download(path.join(UPLOADS_DIR, file.id), file.name);
});

export default router;
