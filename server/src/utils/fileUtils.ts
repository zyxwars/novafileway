import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export const safeUnlink = (...pathToJoin: string[]) => {
  const jointPath = path.join(...pathToJoin);
  if (fs.existsSync(jointPath)) {
    fs.unlinkSync(jointPath);
  }
};

export const moveFile = (src: string, dest: string) => {
  fs.copyFileSync(src, dest);
  fs.unlinkSync(src);
};

export const getFilename = (fileName: string) => {
  return path.basename(fileName);
};

export const getDiskUsage = () => {
  // const totalSpace = Number(
  //   execSync("df / | awk 'FNR ==2 {print$2}'").toString()
  // );
  const usedSpace = Number(
    execSync("df / | awk 'FNR ==2 {print$3}'").toString()
  );
  const availableSpace = Number(
    execSync("df / | awk 'FNR ==2 {print$4}'").toString()
  );

  return {
    usedSpace,
    availableSpace,
    totalSpace: usedSpace + availableSpace,
  };
};
