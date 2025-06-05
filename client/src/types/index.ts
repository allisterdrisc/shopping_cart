import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number().optional(),
});

export const itemSchema = productSchema.extend({
  productId: z.string(),
});

export const newProductSchema = productSchema.omit({
  _id: true,
});

// got this one from Srdjans solution, don't fully understand it
export const newItemSchema = z.object({
  product: productSchema,
  item: itemSchema,
});

export const productsSchema = z.array(productSchema);
export const itemsSchema = z.array(itemSchema);

export type Product = z.infer<typeof productSchema>;
export type Item = z.infer<typeof itemSchema>;
export type NewProduct = z.infer<typeof newProductSchema>;