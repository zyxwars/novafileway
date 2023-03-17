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
  })
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);

  res.status(500).json({
    error: {
      message: err.message,
      stack: process.env.SEND_STACK_TRACE ? err.stack : undefined,
    },
  });
  next(err);
});

// TODO: trpc onerror handler, logger

io.on("connection", (socket) => {
  console.log("connected");
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
