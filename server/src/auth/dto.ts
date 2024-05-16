import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  password: string;
}

export class SignInDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  password: string;
}

export class GetSessionInfoDto {
  id: string;
  email: string;
}
