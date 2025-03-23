import { FastifyRequest, FastifyReply } from "fastify";
import {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
} from "./cart.service";
import { AddToCartSchema } from "./cart.schema";

export async function addToCartHandler(
  request: FastifyRequest<{ Body: { productId: string; quantity?: number } }>,
  reply: FastifyReply
) {
  try {
    const userId = request.user?.id;

    if (!userId) {
      return reply.status(401).send({ message: "User not authenticated" });
    }

    const result = AddToCartSchema.safeParse(request.body);
    if (!result.success) {
      return reply
        .status(400)
        .send({ message: "Invalid request", errors: result.error.format() });
    }

    const cart = await addToCart(userId, result.data);

    return reply.status(200).send({
      message: "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      message: "Failed to add item to cart",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function getCartHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = request.user?.id;

    if (!userId) {
      return reply.status(401).send({ message: "User not authenticated" });
    }

    const items = await getCartItems(userId);

    return reply.status(200).send({
      cartItems: items,
      itemCount: items.length,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      message: "Failed to retrieve cart items",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function updateCartItemHandler(
  request: FastifyRequest<{
    Params: { productId: string };
    Body: { quantity: number };
  }>,
  reply: FastifyReply
) {
  try {
    const userId = request.user?.id;

    if (!userId) {
      return reply.status(401).send({ message: "User not authenticated" });
    }

    const { productId } = request.params;
    const { quantity } = request.body;

    if (typeof quantity !== "number" || quantity < 0) {
      return reply.status(400).send({ message: "Invalid quantity" });
    }

    const cart = await updateCartItemQuantity(userId, productId, quantity);

    return reply.status(200).send({
      message: "Cart item updated successfully",
      cart,
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      message: "Failed to update cart item",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function removeCartItemHandler(
  request: FastifyRequest<{ Params: { productId: string } }>,
  reply: FastifyReply
) {
  try {
    const userId = request.user?.id;

    if (!userId) {
      return reply.status(401).send({ message: "User not authenticated" });
    }

    const { productId } = request.params;
    const cart = await removeCartItem(userId, productId);

    return reply.status(200).send({
      message: "Cart item removed successfully",
      cart,
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      message: "Failed to remove cart item",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function clearCartHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = request.user?.id;

    if (!userId) {
      return reply.status(401).send({ message: "User not authenticated" });
    }

    const cart = await clearCart(userId);

    return reply.status(200).send({
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      message: "Failed to clear cart",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
