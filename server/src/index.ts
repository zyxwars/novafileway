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
import { logger } from "./utils/logger";
import { getFileName } from "./utils/getFileName";

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
    label: getFileName(__filename),
  });
});

server.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`, { label: getFileName(__filename) });
});
