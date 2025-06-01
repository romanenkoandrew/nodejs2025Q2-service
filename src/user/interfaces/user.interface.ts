import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;
  @ApiProperty({
    description: 'User login',
    example: 'john_doe',
    minLength: 3,
    maxLength: 255
  })
  login: string;
  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 3,
    maxLength: 30
  })
  password: string;
  @ApiProperty({
    description: 'User version',
    example: 1
  })
  version: number;
  @ApiProperty({
    description: 'User created at',
    example: 1717334400
  })
  createdAt: number;
  @ApiProperty({
    description: 'User updated at',
    example: 1717334400
  })
  updatedAt: number;
};

export type UserWithoutPassword = Omit<User, 'password'>;
