import { PrismaClient } from "@prisma/client";
import { UPLOADS_DIR } from "..";
import { publicProcedure, router } from "../trpc";
import fs from "fs";
import { getDiskUsage } from "../diskUsage";

const prisma = new PrismaClient();

export const infoRouter = router({
  diskUsage: publicProcedure.query(async (req) => {
    return getDiskUsage();
  }),
});
