import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    AuthModule,
    UsersModule,
    DbModule,
    CategoryModule,
    ProductModule,
    CartModule,
  ],
})
export class AppModule {}
