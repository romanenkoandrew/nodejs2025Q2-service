import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    description: 'Album ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Album name',
    example: 'Heaven :x: Hell',
  })
  name: string;

  @ApiProperty({
    description: 'Release year',
    example: 2024,
  })
  year: number;

  @ApiProperty({
    description: 'Artist ID (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
    nullable: true,
  })
  artistId?: string | null;
}
