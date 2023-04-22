import { z } from "zod";
import { router, publicProcedure, throwPrismaDeleteError } from "../utils/trpc";
import { v4 as uuidv4 } from "uuid";
import { io } from "..";
import { DELETE_AFTER } from "../constants";
import prisma from "../utils/prisma";

export const noteRouter = router({
  list: publicProcedure.query(async (req) => {
    const notes = await prisma.note.findMany();

    return notes;
  }),
  add: publicProcedure
    .input(
      z.object({
        text: z.string(),
        deleteAfter: z.number().positive().default(DELETE_AFTER),
      })
    )
    .mutation(async ({ input }) => {
      const newNote = await prisma.note.create({
        data: {
          id: uuidv4(),
          text: input.text,
          deleteAt: new Date(new Date().getTime() + input.deleteAfter),
        },
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
