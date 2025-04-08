import { Product } from "@/types";
import { API_URL, apiRequest } from "@/lib/api-config";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await apiRequest("/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product> {
  const response = await apiRequest(`/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = await response.json();
  return data;
}
