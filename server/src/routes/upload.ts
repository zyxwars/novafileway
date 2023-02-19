import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { sendBadRequest, sendError } from "../logger";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { UPLOADS_DIR } from "..";

const prisma = new PrismaClient();

const router = Router();

router.post("/", (req, res) => {
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

  const form = formidable({
    // TODO: Create folder beforehand, use _dirname ?
    uploadDir: UPLOADS_DIR,
    maxFiles: 1,
    maxFields: 1,
    maxFileSize: 500 * 1000 ** 2,
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

    const savedFile = await prisma.file.create({
      data: {
        name: file.originalFilename || "Unnamed file",
        size: file.size,
        mimetype: file.mimetype || "",
      },
    });

    fs.renameSync(
      file.filepath,
      path.join(file.filepath, "../" + savedFile.id)
    );

    res.status(200).json(savedFile);
  });
});

router.get("/:id", async (req, res) => {
  const file = await prisma.file.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!file)
    return res.status(404).send(`File with id ${req.params.id} not found`);

  res.set("Content-Type", file.mimetype);

  if (req.query?.download)
    return res.download(path.join(UPLOADS_DIR, String(file.id)), file.name);

  // TODO: Set file name header or something
  res.sendFile(path.join(UPLOADS_DIR, String(file.id)));
});

export default router;
