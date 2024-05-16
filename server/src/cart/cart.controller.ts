import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AddProductToCart, GetCartDto } from './dto';
import { ApiResponse } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @ApiResponse({ type: GetCartDto })
  async getCart(@SessionInfo() session: GetSessionInfoDto) {
    return await this.cartService.getCartByUserId(session.id);
  }

  @Post()
  @ApiResponse({ type: GetCartDto })
  async addProductToCart(
    @Body() addProductToCart: AddProductToCart,
    @SessionInfo() session: GetSessionInfoDto,
  ) {
    return await this.cartService.addProductToCart(
      addProductToCart,
      session.id,
    );
  }

  @Delete()
  @ApiResponse({ type: GetCartDto })
  async removeProductFromCart(
    @Body() addProductToCart: AddProductToCart,
    @SessionInfo() session: GetSessionInfoDto,
  ) {
    return await this.cartService.removeProductFromCart(
      addProductToCart,
      session.id,
    );
  }
}
