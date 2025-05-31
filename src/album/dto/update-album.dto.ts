import { IsString, IsNotEmpty, Length, IsBoolean, IsNumber, Max, Min, IsOptional } from 'class-validator'

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  @Length(3, 50)
  name?: string

  @IsNumber()
  @IsOptional()
  @Min(1900)
  @Max(2025)
  year?: number

  @IsString()
  @IsOptional()
  artistId?: string
}