import {
  Controller,
  UseGuards,
  Req,
  Post,
  Body,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../shared/auth.service';
import { User } from 'src/shared/user.model';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AppResponse } from 'config/app';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() info: any) {
    try {
      const result = await this.authService.createUser(info);
      const user = result.get();
      delete user.password;
      return AppResponse.create(user);
    } catch (err) {
      if (err?.exists) return new BadRequestException(err);
      throw err;
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  async login(@Req() req: Request & { user: User }) {
    const info = req.user.get();
    delete info.password;
    const token = await this.jwtService.sign(info);
    return AppResponse.create({ info, token });
  }
}
