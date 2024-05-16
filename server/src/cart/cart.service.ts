import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AddProductToCart } from './dto';

@Injectable()
export class CartService {
  constructor(private db: DbService) {}

  async getCartByUserId(userId: string) {
    const cart = await this.db.cart.findUnique({
      where: { userId },
      include: {
        cartItems: {
          include: {
            product: { select: { name: true, price: true, imageUrl: true } },
          },
        },
      },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async addProductToCart(
    { productId, quantity }: AddProductToCart,
    userId: string,
  ) {
    const cart = await this.db.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException({ type: 'Cart not found' });
    }

    const product = await this.db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existingCartItem = await this.db.cartItem.findFirst({
      where: { cartId: cart.id, productId: productId },
    });

    if (existingCartItem) {
      await this.db.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      await this.db.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
        },
      });

      return this.db.cart.findUnique({
        where: { userId },
        include: { cartItems: true },
      });
    }
  }

  async removeProductFromCart(
    { productId, quantity }: AddProductToCart,
    userId: string,
  ) {
    const cart = await this.db.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException({ type: 'Cart not found' });
    }

    const product = await this.db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existingCartItem = await this.db.cartItem.findFirst({
      where: { cartId: cart.id, productId: productId },
    });

    if (existingCartItem) {
      const updatedQuantity = existingCartItem.quantity - quantity;

      if (updatedQuantity <= 0) {
        await this.db.cartItem.delete({
          where: { id: existingCartItem.id },
        });
      } else {
        await this.db.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: updatedQuantity },
        });
      }

      return this.getCartByUserId(userId);
    }
  }

  async createCart(userId: string) {
    await this.db.cart.create({ data: { userId } });
  }
}
