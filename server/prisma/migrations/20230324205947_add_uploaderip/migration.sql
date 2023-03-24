/*
  Warnings:

  - Added the required column `uploaderIp` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimetype" TEXT NOT NULL,
    "hasThumbnail" BOOLEAN NOT NULL,
    "uploaderIp" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" DATETIME NOT NULL
);
INSERT INTO "new_File" ("createdAt", "deleteAt", "hasThumbnail", "id", "mimetype", "name", "size") SELECT "createdAt", "deleteAt", "hasThumbnail", "id", "mimetype", "name", "size" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
