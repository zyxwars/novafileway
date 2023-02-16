import { router } from "../trpc";
import { fileRouter } from "./file";
import { noteRouter } from "./note";

export const appRouter = router({ file: fileRouter, note: noteRouter });

export type AppRouter = typeof appRouter;
