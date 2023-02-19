-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'file',
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimetype" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_File" ("createdAt", "id", "mimetype", "name", "size") SELECT "createdAt", "id", "mimetype", "name", "size" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
CREATE TABLE "new_Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'note',
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Note" ("createdAt", "id", "name", "text") SELECT "createdAt", "id", "name", "text" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
