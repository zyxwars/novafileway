import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create();
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

const discloseError = (e: any) => {
  return { cause: process.env.NODE_ENV === "development" ? e : undefined };
};

export const throwServerError = (e: any) => {
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    ...discloseError(e),
  });
};

export const throwPrismaDeleteError = (e: any) => {
  // Item to delete not found
  if (e.code === "P2025")
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Item already deleted",
      ...discloseError(e),
    });

  // Other error
  throwServerError(e);
};
