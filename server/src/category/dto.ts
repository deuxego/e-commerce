import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Category' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Category description', required: false })
  @IsOptional()
  description?: string;
}

export class UpdateCategoryDto {
  @ApiProperty({ example: 'New Category Name', required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'New Category description', required: false })
  @IsOptional()
  description?: string;
}

export class GetCategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  imageUrl?: string;

  @ApiProperty()
  description?: string;
}
