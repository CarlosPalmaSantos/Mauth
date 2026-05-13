import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginApiDto } from '../dto/login-api.dto';
import { RegisterApiDto } from '../dto/register-api.dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @ApiBody({ type: RegisterApiDto })
  Register(@Body() body: RegisterApiDto) {
    return this.authService.RegisterUser(body);
  }

  @Post('login')
  @ApiBody({ type: LoginApiDto })
  Login(@Body() body: LoginApiDto) {
    return this.authService.LoginUser(body);
  }
}
