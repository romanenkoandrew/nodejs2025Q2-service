import { IsString, IsNotEmpty, Length } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  login: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 50)
  password: string
} 