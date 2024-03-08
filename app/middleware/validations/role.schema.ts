import { z } from "zod";

export const roleSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name required"),
    description: z.string().min(1, "Description required"),
  }),
});
