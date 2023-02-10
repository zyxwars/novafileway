import express from "express";
import cors from "cors";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import filesRouter from "./routes/files";

const PORT = 8080;

// TODO: Move trpc to its own file
const prisma = new PrismaClient();

const t = initTRPC.create();
const appRouter = t.router({
  getFiles: t.procedure.query(async (req) => {
    const files = await prisma.file.findMany();

    return files;
  }),
});

export type AppRouter = typeof appRouter;

const app = express();

app.use(cors());

app.use("/files", filesRouter);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
