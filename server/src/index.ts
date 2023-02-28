import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { PrismaClient } from "@prisma/client";
import filesRouter from "./routes/upload";
import { appRouter } from "./routes/_app";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const PORT = 8080;
export const UPLOADS_DIR = path.join(__dirname, "../uploads");
export const THUMBNAILS_DIR = path.join(UPLOADS_DIR, "thumbnails");

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.use("/upload", filesRouter);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

io.on("connection", (socket) => {
  console.log("connected");
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
