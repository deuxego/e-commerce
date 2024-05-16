import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DbModule } from 'src/db/db.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [DbModule, CartModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
