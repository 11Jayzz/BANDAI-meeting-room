import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    /** Zod-parsed query (Express 5 query is read-only; use this after validateRequest target=query). */
    validatedQuery?: unknown;
    /** Zod-parsed params after validateRequest target=params. */
    validatedParams?: unknown;
    /** Set by middleware/requireAuth.ts after verifying the bearer JWT. */
    user?: {
      id: number;
      email: string;
      role: "admin" | "front_desk";
    };
  }
}

export {};
