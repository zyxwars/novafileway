import { z } from "zod";
import { router, publicProcedure, throwPrismaDeleteError } from "../utils/trpc";
import fs from "fs";
import { io } from "..";
import path from "path";
import prisma from "../utils/prisma";
import { UPLOADS_DIR, THUMBNAILS_DIR } from "../constants";

// Add for files is implemented in upload.ts as form posting doesn't work with trpc
export const fileRouter = router({
  list: publicProcedure.query(async (req) => {
    const files = await prisma.file.findMany();

    return files.reverse();
  }),
  deleteById: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    if (fs.existsSync(path.join(UPLOADS_DIR, input)))
      fs.unlinkSync(path.join(UPLOADS_DIR, input));

    if (fs.existsSync(path.join(THUMBNAILS_DIR, input)))
      fs.unlinkSync(path.join(THUMBNAILS_DIR, input));

    const deletedFile = await prisma.file
      .delete({ where: { id: input } })
      .catch((e) => throwPrismaDeleteError(e));

    io.emit("filesMutated");
    return deletedFile;
  }),
  deleteAll: publicProcedure.mutation(async (req) => {
    const allFiles = await prisma.file.findMany();

    for (const file of allFiles) {
      if (fs.existsSync(path.join(UPLOADS_DIR, file.id)))
        fs.unlinkSync(path.join(UPLOADS_DIR, file.id));

      if (fs.existsSync(path.join(THUMBNAILS_DIR, file.id)))
        fs.unlinkSync(path.join(THUMBNAILS_DIR, file.id));

      await prisma.file.delete({ where: { id: file.id } });
    }

    io.emit("filesMutated");
    return;
  }),
});
