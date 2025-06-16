import { z } from "zod";

const cardSchema = z.object({
  imgURL: z.union([z.string().url(), z.string()]),
  imgName: z.string(),
  gameId: z.number(),
});

type CardProps = z.infer<typeof cardSchema>;

export { cardSchema, type CardProps };
