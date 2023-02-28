import { publicProcedure, router } from "../utils/trpc";
import { getDiskUsage } from "../utils/diskUsage";

export const infoRouter = router({
  diskUsage: publicProcedure.query((req) => {
    return getDiskUsage();
  }),
});
