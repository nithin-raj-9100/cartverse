import { Product } from "@/types";
import { API_URL, apiRequest } from "@/lib/api-config";

export interface PaginatedProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface GetProductsParams {
  limit?: number;
  offset?: number;
  sort?: string;
}

export async function getProducts(
  params?: GetProductsParams,
): Promise<PaginatedProductsResponse> {
  try {
    const queryParams = new URLSearchParams();

    if (params?.limit) {
      queryParams.append("limit", params.limit.toString());
    }

    if (params?.offset) {
      queryParams.append("offset", params.offset.toString());
    }

    if (params?.sort) {
      queryParams.append("sort", params.sort);
    }

    const queryString = queryParams.toString();
    const url = queryString ? `/products?${queryString}` : "/products";

    const response = await apiRequest(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      pagination: { total: 0, limit: 0, offset: 0, hasMore: false },
    };
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
