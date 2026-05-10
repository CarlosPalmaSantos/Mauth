import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post()
  @ApiBody({ type: RegisterDto })
  Registrate(@Body() body: RegisterDto) {
    return this.authService.RegisterUser(body);
  }
}
