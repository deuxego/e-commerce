import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, GetCategoryDto, UpdateCategoryDto } from './dto';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/categories',
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
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    await this.categoryService.createCategory(
      createCategoryDto,
      file?.filename,
    );
  }

  @Get()
  @ApiResponse({ type: [GetCategoryDto] })
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: GetCategoryDto })
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findByField({ id });
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/categories',
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
  @ApiResponse({ type: GetCategoryDto })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.categoryService.updateCategory(
      id,
      updateCategoryDto,
      file?.filename,
    );
  }

  @Delete(':id')
  @ApiResponse({ type: GetCategoryDto })
  async remove(@Param('id') id: string) {
    return await this.categoryService.removeCategory(id);
  }
}
