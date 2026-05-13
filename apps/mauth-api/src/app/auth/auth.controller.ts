import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '@mauth/mauth-lib';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @ApiBody({ type: RegisterDto })
  Register(@Body() body: RegisterDto) {
    return this.authService.RegisterUser(body);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  Login(@Body() body: LoginDto) {
    return this.authService.LoginUser(body);
  }
}
