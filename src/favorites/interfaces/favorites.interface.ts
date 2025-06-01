import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { Track } from 'src/track/interface/track.inteface';

export type FavoritesResponse = {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
};
