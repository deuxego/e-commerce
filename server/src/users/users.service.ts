import { Injectable } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(
    private db: DbService,
    private cartService: CartService,
  ) {}

  async createUser(email: string, hash: string, salt: string) {
    const user = await this.db.user.create({ data: { email, hash, salt } });

    await this.cartService.createCart(user.id);

    return user;
  }

  async findByEmail(email: string) {
    return await this.db.user.findFirst({ where: { email } });
  }
}
