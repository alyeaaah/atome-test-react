import { z } from "zod";
export enum PetStatusEnum {
  available = "available",
  pending = "pending",
  sold = "sold"
}
const categoryTagSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const petStatus = z.enum([PetStatusEnum.available, PetStatusEnum.pending, PetStatusEnum.sold]);
export const petSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: categoryTagSchema.nullish(),
  photoUrls: z.array(z.string()),
  tags: z.array(categoryTagSchema).nullish(),
  status: petStatus,
});
export const petFormSchema = petSchema.extend({
  id: z.number().nullish(),
  name: z.string().min(1, "Name is required").max(100, "Name must be at most 100 characters long"),
  status: petStatus,
  tags: z.array(categoryTagSchema).nullish(),
  category: categoryTagSchema.nullish(),
});

export type PetData = z.infer<typeof petSchema>;
export type PetFormData = z.infer<typeof petFormSchema>;
export type CategoryTagData = z.infer<typeof categoryTagSchema>;


