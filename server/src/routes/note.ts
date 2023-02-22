import { z } from "zod";
import { router, publicProcedure, throwPrismaDeleteError } from "../trpc";
import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { TRPC_ERROR_CODES_BY_NUMBER } from "@trpc/server/dist/rpc";

export const prisma = new PrismaClient();

export const noteRouter = router({
  list: publicProcedure.query(async (req) => {
    const notes = await prisma.note.findMany();

    return notes;
  }),
  add: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const newNote = await prisma.note.create({ data: { ...input } });

      return newNote;
    }),
  deleteById: publicProcedure.input(z.number()).mutation(async ({ input }) => {
    const deletedNote = await prisma.note
      .delete({ where: { id: input } })
      .catch((e) => throwPrismaDeleteError(e));
    return deletedNote;
  }),
  deleteAll: publicProcedure.mutation(async () => {
    const deletedCount = await prisma.note.deleteMany();
    return;
  }),
});
