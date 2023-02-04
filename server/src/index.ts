import express from "express";
import cors from "cors";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const PORT = 8080;

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
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
