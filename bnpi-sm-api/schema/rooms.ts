import { z } from "zod";

/** GET /api/v1/rooms/:id */
export const roomIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type RoomIdParam = z.infer<typeof roomIdParamSchema>;
