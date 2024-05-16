import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async signUp({ email, password }: SignUpDto) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new BadRequestException({ type: 'email-exist' });
    }

    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(password, salt);

    const newUser = await this.userService.createUser(email, hash, salt);

    const accessToken = await this.jwtService.signAsync({
      id: newUser.id,
      email,
    });

    return { accessToken };
  }

  async signIn({ email, password }: SignInDto) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    const hash = this.passwordService.getHash(password, user.salt);

    if (hash !== user.hash) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email,
    });

    return { accessToken };
  }
}
