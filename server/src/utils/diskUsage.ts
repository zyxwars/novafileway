import { execSync } from "child_process";
import { ALLOWED_DISK_SPACE } from "../constants";

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
    totalSpace: availableSpace * ALLOWED_DISK_SPACE + usedSpace,
    usedSpace,
    availableSpace: availableSpace * ALLOWED_DISK_SPACE,
  };
};
