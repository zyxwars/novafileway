import path from "path";

export const getFileName = (fileName: string) => {
  return path.basename(fileName);
};
