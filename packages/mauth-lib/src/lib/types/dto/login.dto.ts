import { ApiProperty } from '@nestjs/swagger'
export class LoginDto {

  @ApiProperty({
    example: 'mauth'
  })
  username?: string

  @ApiProperty({
    example: 'm4_th'
  })
  password?: string
}
