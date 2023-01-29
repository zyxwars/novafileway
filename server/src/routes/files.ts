import { Router } from "express";
import multer from "multer";

const upload = multer({ dest: "./uploads/" });

const router = Router();

router.get("/hello", (req, res) => {
  res.send("Hello from the server");
});

router.post("/", upload.single("uploaded_file"), async (req, res) => {
  console.log(req.file, req.body);
});

export default router;
