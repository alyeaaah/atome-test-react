import { z } from "zod";

const schema = z.object({
  AUTH_COOKIE_NAME: z.string(),
  SECRET_KEY: z.string(),
  API_BASE_URL: z.string().transform((url) => url.replace(/\/$/, "")),
  // GOOGLE_MAP_API_KEY: z.string(),
  BASENAME: z.string(),
});

export const clientEnv = schema.parse({
  SECRET_KEY: import.meta.env.VITE_SECRET_KEY,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  AUTH_COOKIE_NAME: import.meta.env.VITE_AUTH_COOKIE_NAME,
  BASENAME: import.meta.env.VITE_BASENAME,
});
