import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  Max,
  Min,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'Album name',
    example: 'Heaven :x: Hell',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    description: 'Release year',
    example: 2024,
    minimum: 1900,
    maximum: 2025,
  })
  @IsNumber()
  @Min(1900)
  @Max(2025)
  year: number;

  @ApiProperty({
    description: 'Artist ID (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsString()
  @IsOptional()
  artistId?: string;
}
