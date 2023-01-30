import { Router } from "express";
import multer from "multer";
import { PrismaClient } from "@prisma/client";

const upload = multer({ dest: "./uploads/" }).single("file");
const prisma = new PrismaClient();

const router = Router();

router.get("/hello", (req, res) => {
  res.send("Hello from the server");
});

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // TODO: Error handle
      console.log(err);
      return;
    } else if (err) {
      // TODO: Error handle
      console.log(err);
      return;
    }

    // TODO: Error handle
    if (!req.file) return;

    // Process
    const savedFile = await prisma.file.create({
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
    });

    console.log(savedFile);
  });
});

export default router;
