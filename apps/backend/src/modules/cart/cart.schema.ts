import { z } from "zod";

export const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  name: z.string(),
  image: z.string().optional(),
});

export const CartSchema = z.object({
  userId: z.string(),
  items: z.array(CartItemSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;

export const AddToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive().default(1),
});

export type AddToCartRequest = z.infer<typeof AddToCartSchema>;
