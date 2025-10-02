import { z } from "zod";
export const OrderSchema = z.object({
  id: z.number(),
  petId: z.number(),
  quantity: z.number(),
  shipDate: z.string(), // ISO date string
  complete: z.boolean(),
}); 

export type OrderData = z.infer<typeof OrderSchema>;


