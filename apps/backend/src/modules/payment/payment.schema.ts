import { z } from "zod";

export const CheckoutItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
});

export const CheckoutSessionSchema = z.object({
  items: z.array(CheckoutItemSchema),
});

export type CheckoutSessionInput = z.infer<typeof CheckoutSessionSchema>;
export type CheckoutItem = z.infer<typeof CheckoutItemSchema>;
