import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddProductToCart {
  @ApiProperty()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;
}

export class CartItemCartProductField {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  imageUrl: string;
}

export class GetCartItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  product: CartItemCartProductField;
}

export class GetCartDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ type: [GetCartItemDto] })
  cartItems: GetCartItemDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
