import { publicProcedure, router, throwServerError } from "../utils/trpc";
import { getDiskUsage } from "../utils/files/diskUsage";

export const infoRouter = router({
  diskUsage: publicProcedure.query((req) => {
    return getDiskUsage();
  }),
});
