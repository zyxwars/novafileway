import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create();
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

// TODO: stack is not sent in prod
export const throwServerError = (e: any) => {
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    cause: e,
  });
};

// TODO: Check if this gets logged as error, because it shouldn't
export const throwPrismaDeleteError = (e: any) => {
  // Item to delete not found
  if (e.code === "P2025")
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Item already deleted or didn't exist",
      cause: e,
    });

  // Other error
  throwServerError(e);
};
