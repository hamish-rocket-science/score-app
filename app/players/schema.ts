import { z } from "zod";

export const newPlayerSchema = z.object({
  name: z.string().min(1, "Enter a name"),
});

export type NewPlayerSchema = z.infer<typeof newPlayerSchema>;
