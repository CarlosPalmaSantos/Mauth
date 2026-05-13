import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from '@mauth/mauth-lib';

export class LoginApiDto extends LoginDto {
  @ApiProperty({
    example: 'magic'
  })
  username?: string;

  @ApiProperty({
    example: 'magic123'
  })
  password?: string;
}