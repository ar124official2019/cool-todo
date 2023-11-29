import {
  Controller,
  UseGuards,
  Req,
  Post,
  Body,
  BadRequestException,
  HttpCode,
  Get,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../shared/auth.service';
import { User } from 'src/shared/user.model';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { SessionGuard } from './session.guard';
import { AppResponse } from 'src/shared/types/app';

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

  @UseGuards(AuthGuard('google'))
  @Get('login/google')
  @HttpCode(200)
  loginGoogle() {}

  @UseGuards(AuthGuard('google'))
  @Get('login/google/success')
  async loginGoogleSuccess(@Req() req, @Res() res: Response) {
    if (req.user) {
      await login(req);
      return res.redirect('http://localhost:4200/login-google');
    }

    return res.redirect('http://localhost:4200/login');
  }

  @UseGuards(SessionGuard)
  @Post('login/google/persist')
  @HttpCode(200)
  async loginGooglePersist(@Req() req) {
    const info = req.user.get();
    delete info.password;
    const token = await this.jwtService.sign(info);
    await logout(req).catch((err) => console.error(`Error:`, err));
    return AppResponse.create({ info, token });
  }
}

async function login(req) {
  return new Promise<void>((res, rej) => {
    req.login(req.user, function (err) {
      if (err) rej(err);
      return res();
    });
  });
}

async function logout(req) {
  return new Promise<void>((res, rej) => {
    req.logout(function (err) {
      if (err) rej(err);
      return res();
    });
  });
}
