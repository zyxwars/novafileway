import fs from "fs";
import path from "path";

export const safeUnlink = (...paths: string[]) => {
  const jointPath = path.join(...paths);
  if (fs.existsSync(jointPath)) {
    fs.unlinkSync(jointPath);
  }
};
