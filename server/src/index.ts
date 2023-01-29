import express from "express";
import files from "./routes/files";

const app = express();

const PORT = 8080;

app.use("/files", files);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
