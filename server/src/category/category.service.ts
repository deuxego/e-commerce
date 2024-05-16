import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  assetsPath = '/categories/';

  constructor(private db: DbService) {}

  async createCategory(
    { name, description }: CreateCategoryDto,
    fileName?: string,
  ) {
    const category = await this.findByField({ name });

    if (category) {
      throw new BadRequestException({ type: 'category-exists' });
    }

    await this.db.category.create({
      data: { name, description, imageUrl: this.assetsPath + fileName },
    });
  }

  async findByField(field: Prisma.CategoryWhereInput) {
    return await this.db.category.findFirst({ where: field });
  }

  async findAll() {
    return await this.db.category.findMany();
  }

  async updateCategory(
    id: string,
    { name, description }: UpdateCategoryDto,
    fileName?: string,
  ) {
    return await this.db.category.update({
      where: { id },
      data: { name, description, imageUrl: this.assetsPath + fileName },
    });
  }

  async removeCategory(id: string) {
    return await this.db.category.delete({ where: { id } });
  }
}
