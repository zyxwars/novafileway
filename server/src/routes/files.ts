import { Router } from "express";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
import { sendBadRequest, sendError } from "../logger";
import formidable from "formidable";
import fs from "fs";

const upload = multer({ dest: "./uploads/" }).single("file");
const prisma = new PrismaClient();

const router = Router();

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    if (err) return sendError(res, err.message);

    // TODO: Error handle
    if (!req.file) {
      return sendBadRequest(res, "No file provided");
    }

    const savedFile = await prisma.file.create({
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
    });

    res.status(200).json(savedFile);
  });
});

// TODO: Retire multer
router.post("/formidable", (req, res) => {
  const form = formidable({
    // TODO: Create folder beforehand, use _dirname ?
    uploadDir: "./uploads",
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
        filename: file.newFilename,
        originalname: file.originalFilename || "Unnamed file",
        size: file.size,
        mimetype: file.mimetype || "",
      },
    });

    res.status(200).json(savedFile);
  });
});

export default router;
