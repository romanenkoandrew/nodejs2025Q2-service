import { IsString, IsNotEmpty, Length } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string

  @IsString()
  @IsNotEmpty()
  newPassword: string
}