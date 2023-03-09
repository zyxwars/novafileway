import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import filesRouter from "./routes/upload";
import { appRouter } from "./routes/_app";
import http from "http";
import { Server } from "socket.io";
import { PORT } from "./constants";

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
