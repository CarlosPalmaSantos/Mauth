import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({
    example: 'mauth'
  })
  username?: string;

  @ApiProperty({
    example: 'm4_th'
  })
  password?: string;

  @ApiProperty({
    example: 'mauth@example.com'
  })
  email?: string;
}
