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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessToken, SignInAuthDto } from './dto/sign-in-auth.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiBody({
    type: SignInAuthDto,
  })
  @ApiResponse({
    type: AccessToken,
    description: 'access Токен',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + 7);
    response.cookie('refresh', refreshToken, {
      httpOnly: true,
      secure: true,
      expires: expiresIn,
      path: 'auth',
    });
    return { accessToken, expiresIn: 60 };
  }
  @ApiResponse({
    type: AccessToken,
    description: 'access Токен',
  })
  @Post('refresh-token')
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
  @ApiResponse({
    type: Boolean,
    description: 'true',
  })
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refresh', { path: 'auth' });
    return true;
  }
}
