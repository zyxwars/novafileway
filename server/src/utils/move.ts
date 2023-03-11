import fs from "fs";

export const moveFile = (src: string, dest: string) => {
  fs.copyFileSync(src, dest);
  fs.unlinkSync(src);
};
