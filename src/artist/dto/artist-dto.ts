import { IsString, IsNotEmpty, Length, IsBoolean, IsOptional } from 'class-validator'

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean
}

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  @Length(3, 50)
  name?: string;

  @IsBoolean()
  @IsOptional()
  grammy?: boolean;
}