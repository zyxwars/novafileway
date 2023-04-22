import { z } from "zod";
import { DELETE_AFTER } from "../constants";
import formidable from "formidable";

export const fileFormSchema = z.object({
  fields: z.object({
    deleteAfter: z.number().positive().default(DELETE_AFTER),
  }),
  files: z.object({
    file: z.object({
      filepath: z.string(),
      originalFilename: z.string(),
      size: z.number(),
      mimetype: z.string(),
    }),
  }),
});
