import { Router } from "express";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
import { sendBadRequest, sendError } from "../logger";

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

export default router;
