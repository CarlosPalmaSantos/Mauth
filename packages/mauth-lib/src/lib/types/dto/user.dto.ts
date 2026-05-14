import { ApiProperty } from "@nestjs/swagger"

export class UserDto {
  @ApiProperty({
    example: 'mauth'
  })
  username?: string

  @ApiProperty({
    example: 'mauth@example.com'
  })
  email?: string
}
