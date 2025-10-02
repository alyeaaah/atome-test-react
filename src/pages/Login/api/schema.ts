import { z } from "zod";

export const loginPayloadSchema = z.object({
  username: z.string({ required_error: "Username is required" }).min(3, "Username must be at least 3 characters long"),
  password: z.string({ required_error: "Password is required" }).min(3, "Password must be at least 3 characters long"),
});
export const userDataSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  userStatus: z.number(),
  password: z.string().nullish(),
  phone: z.string(),
});
export const mediaUploadPayloadSchema = z.object({
  image: z.instanceof(File),
});
export type loginPayload = z.infer<typeof loginPayloadSchema>;
export type userData = z.infer<typeof userDataSchema>;
