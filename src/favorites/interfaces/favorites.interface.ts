import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { Track } from 'src/track/interface/track.inteface';
import { ApiProperty } from '@nestjs/swagger';

export class FavoritesResponse {
  @ApiProperty({ type: [Artist], description: 'List of favorite artists' })
  artists: Artist[];

  @ApiProperty({ type: [Album], description: 'List of favorite albums' })
  albums: Album[];

  @ApiProperty({ type: [Track], description: 'List of favorite tracks' })
  tracks: Track[];
}
