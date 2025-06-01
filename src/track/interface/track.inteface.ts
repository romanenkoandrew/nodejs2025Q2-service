import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({
    description: 'Track ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Track name',
    example: 'Landmines'
  })
  name: string;

  @ApiProperty({
    description: 'Artist ID (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  artistId?: string;

  @ApiProperty({
    description: 'Album ID (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  albumId?: string;

  @ApiProperty({
    description: 'Track duration in seconds',
    example: 262
  })
  duration: number;
}
