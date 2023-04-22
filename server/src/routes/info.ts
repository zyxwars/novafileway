import { publicProcedure, router, throwServerError } from "../utils/trpc";
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

  const allowedTotalSpace = availableSpace * ALLOWED_DISK_SPACE + usedSpace;
  const allowedAvailableSpace = availableSpace * ALLOWED_DISK_SPACE;

  return {
    usedSpace,
    availableSpace: allowedAvailableSpace,
    totalSpace: allowedTotalSpace,
  };
};

export const infoRouter = router({
  diskUsage: publicProcedure.query((req) => {
    return getDiskUsage();
  }),
});
