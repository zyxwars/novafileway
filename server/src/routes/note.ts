import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const noteRouter = router({
  list: publicProcedure.query(async (req) => {
    const notes = await prisma.note.findMany();

    return notes;
  }),
  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
        text: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(input);

      const newNote = await prisma.note.create({ data: { ...input } });

      return newNote;
    }),
});