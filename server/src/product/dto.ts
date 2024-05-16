import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'MacBook Pro' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Wow some product description' })
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: 99.99 })
  @IsNotEmpty()
  price: string;

  @ApiProperty({ example: 1000, required: false })
  @IsOptional()
  stock_quantity?: number;

  @ApiProperty({ example: '570ac908-fc26-4cb4-9253-aa898896db86' })
  @IsNotEmpty()
  categoryId: string;
}

export class UpdateProductDto {
  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty()
  @IsOptional()
  price?: string;

  @ApiProperty()
  @IsOptional()
  stock_quantity?: number;

  @ApiProperty()
  @IsOptional()
  categoryId?: string;
}

export class ProductQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  query?: string;
}

export class GetProductDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  imageUrl?: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock_quantity?: number;

  @ApiProperty()
  categoryId: string;
}
