import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Add for files is implemented in upload.ts as form posting doesn't work with trpc
export const fileRouter = router({
  list: publicProcedure.query(async (req) => {
    const files = await prisma.file.findMany();

    return files;
  }),
  deleteAll: publicProcedure.mutation(async (req) => {
    await prisma.file.deleteMany({});
  }),
});
