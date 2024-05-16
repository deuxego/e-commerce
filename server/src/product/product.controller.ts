import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import {
  CreateProductDto,
  GetProductDto,
  ProductQueryDto,
  UpdateProductDto,
} from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiResponse({ type: [GetProductDto] })
  async getProducts(@Query() { query }: ProductQueryDto) {
    return await this.productService.findByQuery(query);
  }

  @Get(':id')
  @ApiResponse({ type: GetProductDto })
  async getProduct(@Param('id') productId: string) {
    return await this.productService.findById(productId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  @ApiCreatedResponse()
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    await this.productService.createProduct(createProductDto, file?.filename);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  @ApiResponse({ type: GetProductDto })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.productService.updateProduct(
      id,
      updateProductDto,
      file.filename,
    );
  }

  @Delete(':id')
  @ApiResponse({ type: GetProductDto })
  async remove(@Param('id') id: string) {
    return await this.productService.removeProduct(id);
  }
}
