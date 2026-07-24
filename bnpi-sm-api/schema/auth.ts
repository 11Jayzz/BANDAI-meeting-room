import { z } from "zod";
import { nonEmptyString } from "./common";

/** POST /api/v1/auth/login body */
export const loginRequestSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: nonEmptyString(200),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
