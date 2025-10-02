import { userDataSchema } from "@/pages/Login/api/schema";
import { z } from "zod";
export const registerSchema = userDataSchema.extend({
  id: z.number().nullish(),
  email: z.string().min(3, "Email must be at least 3 characters long").max(100, "Email must not exceed 100 characters"),
  username: z.string().min(3, "Username must be at least 3 characters long").max(100, "Username must not exceed 100 characters"),
  firstName: z.string().min(3, "First name must be at least 3 characters long").max(100, "First name must not exceed 100 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters long").max(100, "Last name must not exceed 100 characters"),
  userStatus: z.number().default(1),
  password: z.string().min(6, "Password must be at least 6 characters long").max(100, "Password must not exceed 100 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
  phone: z.string().min(8, "Phone must be at least 8 characters long").max(15, "Phone must not exceed 15 characters long").regex(/^[0-9]+$/, "Phone must contain only numbers"),
}).refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });
export type RegisterPayload = z.infer<typeof registerSchema>;
