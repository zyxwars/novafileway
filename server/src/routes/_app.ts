import { router } from "../services/trpc";
import { fileRouter } from "./file";
import { infoRouter } from "./info";
import { noteRouter } from "./note";

export const appRouter = router({
  file: fileRouter,
  note: noteRouter,
  info: infoRouter,
});

export type AppRouter = typeof appRouter;
