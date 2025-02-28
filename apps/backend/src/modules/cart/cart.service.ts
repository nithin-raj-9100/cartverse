import { AddToCartRequest } from "./cart.schema";
import { prisma } from "../utils/prisma";

export async function getCartByUserId(userId: string) {
  return prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function createCart(userId: string) {
  return prisma.cart.create({
    data: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function addToCart(userId: string, item: AddToCartRequest) {
  const product = await prisma.product.findUnique({
    where: { id: item.productId },
  });

  if (!product) {
    throw new Error(`Product with ID ${item.productId} not found`);
  }

  let cart = await getCartByUserId(userId);

  if (!cart) {
    cart = await createCart(userId);
  }

  const existingItem = cart.items.find(
    (cartItem) => cartItem.productId === item.productId
  );

  if (existingItem) {
    return prisma.cartItem
      .update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + item.quantity,
          updatedAt: new Date(),
        },
        include: {
          product: true,
        },
      })
      .then(() => {
        return getCartByUserId(userId);
      });
  } else {
    return prisma.cartItem
      .create({
        data: {
          cart: {
            connect: { id: cart.id },
          },
          product: {
            connect: { id: product.id },
          },
          quantity: item.quantity,
        },
        include: {
          product: true,
        },
      })
      .then(() => {
        return getCartByUserId(userId);
      });
  }
}

export async function getCartItems(userId: string) {
  const cart = await getCartByUserId(userId);

  if (!cart) return [];

  return cart.items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.product.price,
    name: item.product.name,
    image: item.product.imageUrl,
  }));
}

export async function updateCartItemQuantity(
  userId: string,
  productId: string,
  quantity: number
) {
  const cart = await getCartByUserId(userId);
  if (!cart) throw new Error("Cart not found");

  if (quantity <= 0) {
    return removeCartItem(userId, productId);
  }

  const cartItem = cart.items.find((item) => item.productId === productId);

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  await prisma.cartItem.update({
    where: { id: cartItem.id },
    data: {
      quantity: quantity,
      updatedAt: new Date(),
    },
  });

  return getCartByUserId(userId);
}

export async function removeCartItem(userId: string, productId: string) {
  const cart = await getCartByUserId(userId);
  if (!cart) throw new Error("Cart not found");

  const cartItem = cart.items.find((item) => item.productId === productId);

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  await prisma.cartItem.delete({
    where: { id: cartItem.id },
  });

  return getCartByUserId(userId);
}

export async function clearCart(userId: string) {
  const cart = await getCartByUserId(userId);
  if (!cart) throw new Error("Cart not found");

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return getCartByUserId(userId);
}
