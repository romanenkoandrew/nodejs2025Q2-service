import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    description: 'Track name',
    example: 'Landmines',
    minLength: 3,
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    description: 'Track duration in seconds',
    example: 262,
    minimum: 1
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  duration: number;

  @ApiProperty({
    description: 'Artist ID (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsString()
  @IsOptional()
  artistId?: string;

  @ApiProperty({
    description: 'Album ID (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsString()
  @IsOptional()
  albumId?: string;
}
