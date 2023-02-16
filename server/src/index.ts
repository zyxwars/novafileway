import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { PrismaClient } from "@prisma/client";
import filesRouter from "./routes/upload";
import { appRouter } from "./routes/_app";

const PORT = 8080;

const app = express();

app.use(cors());

app.use("/upload", filesRouter);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
