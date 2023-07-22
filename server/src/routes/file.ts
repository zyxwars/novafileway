import { z } from "zod";
import {
  router,
  publicProcedure,
  throwPrismaDeleteError,
} from "../services/trpc";
import fs from "fs";
import { io } from "..";
import path from "path";
import prisma from "../services/prisma";
import { UPLOADS_DIR, THUMBNAILS_DIR } from "../constants";
import { safeUnlink } from "../utils/fileUtils";

// Add for files is implemented in upload.ts as form posting doesn't work with trpc
export const fileRouter = router({
  list: publicProcedure.query(async (req) => {
    const files = await prisma.file.findMany();

    return files;
  }),
  deleteById: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    safeUnlink(UPLOADS_DIR, input);
    safeUnlink(THUMBNAILS_DIR, input);

    const deletedFile = await prisma.file
      .delete({ where: { id: input } })
      .catch((e) => throwPrismaDeleteError(e));

    io.emit("filesMutated");
    return deletedFile;
  }),
  deleteAll: publicProcedure.mutation(async (req) => {
    const allFiles = await prisma.file.findMany();

    for (const file of allFiles) {
      safeUnlink(UPLOADS_DIR, file.id);
      safeUnlink(THUMBNAILS_DIR, file.id);

      await prisma.file.delete({ where: { id: file.id } });
    }

    io.emit("filesMutated");
    return;
  }),
});
