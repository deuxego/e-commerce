import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  assetsPath = '/products/';

  constructor(private db: DbService) {}

  async findAll() {
    return await this.db.product.findMany();
  }

  async getByField(field: Prisma.ProductWhereInput) {
    return await this.db.product.findFirst({ where: field });
  }

  async findById(productId: string) {
    return await this.db.product.findFirstOrThrow({ where: { id: productId } });
  }

  async findByQuery(query: string) {
    return await this.db.product.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
          { category: { name: { contains: query } } },
        ],
      },
    });
  }

  async createProduct(createProductDto: CreateProductDto, fileName: string) {
    const product = await this.getByField({ name: createProductDto.name });

    if (product) {
      throw new BadRequestException({ type: 'product-exists' });
    }

    await this.db.product.create({
      data: { ...createProductDto, imageUrl: this.assetsPath + fileName },
    });
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
    fileName?: string,
  ) {
    return await this.db.product.update({
      where: { id },
      data: { ...updateProductDto, imageUrl: this.assetsPath + fileName },
    });
  }

  async removeProduct(id: string) {
    return await this.db.product.delete({ where: { id } });
  }
}
