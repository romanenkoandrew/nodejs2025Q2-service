import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty({
    description: 'User token',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  token: string;
}
