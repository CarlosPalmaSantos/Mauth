import { ApiProperty } from '@nestjs/swagger';
import { RegisterDto } from '@mauth/mauth-lib';

export class RegisterApiDto extends RegisterDto {
  @ApiProperty({
    example: 'magic'
  })
  username?: string;

  @ApiProperty({
    example: 'magic123'
  })
  password?: string;

  @ApiProperty({
    example: 'magic@example.com'
  })
  email?: string;
}