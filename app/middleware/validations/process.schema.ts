import { z } from "zod";

export const processSchema = z.object({
  body: z.object({
    pdfFile: z.any(),
  }),
});
