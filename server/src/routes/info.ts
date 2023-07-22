import { publicProcedure, router, throwServerError } from "../services/trpc";
import { getDiskUsage } from "../utils/fileUtils";

export const infoRouter = router({
  diskUsage: publicProcedure.query((req) => {
    return getDiskUsage();
  }),
});
