import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import uploadsRouter from "./routes/upload";
import { appRouter } from "./routes/_app";
import http from "http";
import { Server } from "socket.io";
import { PORT } from "./constants";
import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
import { getFilename } from "./utils/fileUtils";
import { deleteOldUploads } from "./tasks/deleteOldUploads";
import { logger } from "./services/logger";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(morgan("tiny"));

app.use("/upload", uploadsRouter);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    onError: ({ error }) => {
      logger.error(error.message);
    },
  })
);

io.on("connection", (socket) => {
  logger.info(`Socket connection from: ${socket.handshake.address}`, {
    label: getFilename(__filename),
  });
});

const deleteOldUploadsIntervalMs = 1000 * 60 * 60;
logger.info(
  `Running ${deleteOldUploads.name} every ${deleteOldUploadsIntervalMs} ms`,
  { label: getFilename(__filename) }
);
setInterval(() => deleteOldUploads(), deleteOldUploadsIntervalMs);

server.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`, { label: getFilename(__filename) });
});
