import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    description: 'Artist ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Artist name',
    example: 'Deryck Whibley',
  })
  name: string;

  @ApiProperty({
    description: 'Whether the artist has won a Grammy',
    example: false,
  })
  grammy: boolean;
}

export type CreateArtistDto = Omit<Artist, 'id'>;
