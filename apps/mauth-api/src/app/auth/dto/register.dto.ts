import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: 'password123', required: false })
  password?: string;

  @ApiProperty({ example: 'john@example.com', required: false })
  email?: string;
}
