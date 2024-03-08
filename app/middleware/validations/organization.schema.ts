import { z } from "zod";

export const organizationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    domain: z.string().min(1, "Domain required"),
    hrId: z.coerce.number().optional(),
  }),
});
