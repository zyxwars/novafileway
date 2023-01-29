import express from "express";
import files from "./routes/files";
import cors from "cors";

const PORT = 8080;

const app = express();

app.use(cors());

app.use("/files", files);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
