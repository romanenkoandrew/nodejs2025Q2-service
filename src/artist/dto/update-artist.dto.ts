import { IsString, Length, IsBoolean, IsOptional } from 'class-validator'

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  @Length(3, 50)
  name?: string;

  @IsBoolean()
  @IsOptional()
  grammy?: boolean;
}