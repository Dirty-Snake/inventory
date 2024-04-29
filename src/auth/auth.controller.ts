import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Cookies } from '../utils/Cookies';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: Record<string, any>,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    response.cookie('refresh', refreshToken, {
      httpOnly: true,
      secure: true,
      expires: expires,
      path: 'auth',
    });
    return { accessToken };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Get('refresh-token')
  async refreshToken(
    @Cookies('refresh') token: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken, accessToken } = await this.authService.refreshToken(
      token,
    );
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    response.cookie('refresh', refreshToken, {
      httpOnly: true,
      secure: true,
      expires: expires,
      path: 'auth',
    });
    return { accessToken };
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refresh', { path: 'auth' });
    return true;
  }
}
