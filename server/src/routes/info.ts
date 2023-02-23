import { PrismaClient } from "@prisma/client";
import { UPLOADS_DIR } from "..";
import { publicProcedure, router } from "../trpc";
import fs from "fs";

const prisma = new PrismaClient();

export const infoRouter = router({
  uploadDirSize: publicProcedure.query(async (req) => {
    const uploadSizes = await prisma.file.findMany({
      where: {},
      select: { size: true },
    });

    return uploadSizes.reduce((totalSize, { size }) => totalSize + size, 0);
  }),
});
