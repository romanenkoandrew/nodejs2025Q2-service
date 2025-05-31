import { IsString, IsNotEmpty, Length, IsBoolean, IsNumber, Max, Min, IsOptional } from 'class-validator'

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string

  @IsNumber()
  @Min(1900)
  @Max(2025)
  year: number

  @IsString()
  @IsOptional()
  artistId?: string
}