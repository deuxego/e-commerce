import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { GetSessionInfoDto, SignInDto, SignUpDto } from './dto';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { SessionInfo } from './session-info.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}

  @Post('sign-up')
  @ApiCreatedResponse()
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signUp(signUpDto);
    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-in')
  @ApiOkResponse()
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signIn(signInDto);
    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res);
  }

  @Get('session')
  @ApiResponse({ type: GetSessionInfoDto })
  @UseGuards(AuthGuard)
  getSession(@SessionInfo() session: GetSessionInfoDto) {
    return session;
  }
}
