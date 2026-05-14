import { Body, Controller, Post, Res, Req, Get } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '@mauth/mauth-lib';
import { Request, Response } from 'express';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @ApiBody({ type: RegisterDto })
  async Register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) response: Response) {
    try {
      const res = await this.authService.RegisterUser(body, 1_000_000);

      response.cookie('portal_st', res, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/'
      })

      return 'ok'
    }
    catch (e: unknown) {
      if (e instanceof Error)
        throw e
    }
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  async Login(@Body() body: LoginDto, @Res({ passthrough: true }) response: Response) {
    try {
      const res = await this.authService.LoginUser(body, 1_000_000);

      response.cookie('portal_st', res, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/'
      })

      return 'ok'
    }
    catch (e: unknown) {

      response.clearCookie('portal_st', {
        httpOnly: true,
        sameSite: 'lax'
      })

      if (e instanceof Error)
        throw e

    }
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    try {
      response.clearCookie('portal_st', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/'
      })

    } catch (e) {
      if (e instanceof Error)
        throw e
    }

    return 'ok'
  }

  @Get('validate')
  async Validate(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    try {
      const token = req.cookies['portal_st']

      const res = await this.authService.ValidateToken(token)

      return res

    } catch (e) {

      response.clearCookie('portal_st', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/'
      })

      if (e instanceof Error)
        throw e
    }

  }
}
