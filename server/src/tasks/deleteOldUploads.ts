import path from "path";
import fs from "fs";
import prisma from "../services/prisma";
import { THUMBNAILS_DIR, UPLOADS_DIR } from "../constants";
import { logger } from "../services/logger";
import { getFilename, safeUnlink } from "../utils/fileUtils";

export const deleteOldUploads = async () => {
  logger.info("Deleting items past deleteAt time", {
    label: getFilename(__filename),
  });

  // Delete all items to be deleted before current date
  const files = await prisma.file.findMany({
    where: { deleteAt: { lte: new Date() } },
    select: { id: true },
  });

  for (const file of files) {
    safeUnlink(UPLOADS_DIR, file.id);
    safeUnlink(THUMBNAILS_DIR, file.id);

    await prisma.file.delete({ where: { id: file.id } });
  }

  await prisma.note.deleteMany({
    where: { deleteAt: { lte: new Date() } },
  });

  logger.info("Finished deleting items", {
    label: getFilename(__filename),
  });
};

// deleteItems();
