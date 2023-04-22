import path from "path";
import fs from "fs";
import prisma from "./prisma";
import { THUMBNAILS_DIR, UPLOADS_DIR } from "../constants";

export const deleteItems = async () => {
  console.log("Deleting items past deleteAt time");

  // Delete all items to be deleted before current date
  const files = await prisma.file.findMany({
    where: { deleteAt: { lte: new Date() } },
    select: { id: true },
  });

  for (const file of files) {
    if (fs.existsSync(path.join(UPLOADS_DIR, file.id)))
      fs.unlinkSync(path.join(UPLOADS_DIR, file.id));

    if (fs.existsSync(path.join(THUMBNAILS_DIR, file.id)))
      fs.unlinkSync(path.join(THUMBNAILS_DIR, file.id));

    await prisma.file.delete({ where: { id: file.id } });
  }

  const notes = await prisma.note.deleteMany({
    where: { deleteAt: { lte: new Date() } },
  });
};

// deleteItems();
