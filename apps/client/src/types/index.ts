export interface SignupBody {
  email: string;
  password: string;
  name: string;
}

export interface SignupResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sizes: string[];
  colors: string[];
  rating: number;
  comparePrice?: number;
  createdAt: string;
  updatedAt: string;
  category: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    sizes: string[];
    colors: string[];
  };
}

export interface Order {
  id: string;
  userId: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  paymentStatus?: "PAID" | "REFUNDED" | "FAILED" | null;
  paymentId?: string | null;
  totalAmount: number;
  checkoutSessionId?: string | null;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}
