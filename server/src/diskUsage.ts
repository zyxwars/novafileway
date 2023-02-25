import { execSync } from "child_process";

// How of the actual free space will be offered to the app as a fraction eg. 1/2
// Currently used for testing filled disk
export const allowedDiskSpace = 1 / 10;

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
    totalSpace: availableSpace * allowedDiskSpace + usedSpace,
    usedSpace,
    availableSpace: availableSpace * allowedDiskSpace,
  };
};
