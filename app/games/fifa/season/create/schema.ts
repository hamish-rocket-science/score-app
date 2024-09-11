import { z } from "zod";

export const divisionPlayerSchema = z.object({
  id: z.string(),
  selected: z.boolean(),
  avatar: z.string().nullable(),
  name: z.string(),
});

export const divisionSchema = z.object({
  number: z.number().min(1),
  players: z.array(divisionPlayerSchema),
});

export const newSeasonFormSchema = z.object({
  number: z.number().min(1),
  gameId: z.string().min(1),
  divisions: z.array(divisionSchema),
});

export type NewSeasonFormSchema = z.infer<typeof newSeasonFormSchema>;
