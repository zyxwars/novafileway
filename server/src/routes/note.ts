import { z } from "zod";
import { router, publicProcedure, throwPrismaDeleteError } from "../utils/trpc";
import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { TRPC_ERROR_CODES_BY_NUMBER } from "@trpc/server/dist/rpc";
import { v4 as uuidv4 } from "uuid";
import { io } from "..";

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
      const newNote = await prisma.note.create({
        data: { id: uuidv4(), ...input },
      });

      io.emit("notesMutated");
      return newNote;
    }),
  deleteById: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const deletedNote = await prisma.note
      .delete({ where: { id: input } })
      .catch((e) => throwPrismaDeleteError(e));
    io.emit("notesMutated");
    return deletedNote;
  }),
  deleteAll: publicProcedure.mutation(async () => {
    const deletedCount = await prisma.note.deleteMany();
    io.emit("notesMutated");
    return;
  }),
});
