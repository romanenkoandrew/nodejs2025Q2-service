import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Track } from 'src/track/interface/track.inteface';
import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { FavoritesResponse } from './interfaces/favorites.interface';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { FavoritesUnprocessableEntityException } from './exceptions/favorites.exceptions';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  private readonly artists: Artist[] = [];
  private readonly albums: Album[] = [];
  private readonly tracks: Track[] = [];

  async getAll(): Promise<FavoritesResponse> {
    return new Promise((resolve) => {
      resolve({
        artists: this.artists,
        albums: this.albums,
        tracks: this.tracks,
      });
    });
  }

  async addArtist(id: string): Promise<void> {
    const artist = await this.getArtist(id);
    this.artists.push(artist);
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = await this.getArtist(id);
    this.artists.splice(this.artists.indexOf(artist), 1);
  }

  async addAlbum(id: string): Promise<void> {
    const album = await this.getAlbum(id);
    this.albums.push(album);
  }

  async deleteAlbum(id: string): Promise<void> {
    const album = await this.getAlbum(id);
    this.albums.splice(this.albums.indexOf(album), 1);
  }

  async addTrack(id: string): Promise<void> {
    const track = await this.getTrack(id);
    this.tracks.push(track);
  }

  async deleteTrack(id: string): Promise<void> {
    const track = await this.getTrack(id);
    this.tracks.splice(this.tracks.indexOf(track), 1);
  }

  async syncOnArtistDelete(artistId: string): Promise<void> {
    const artistIndex = this.artists.findIndex(
      (artist) => artist.id === artistId,
    );
    if (artistIndex !== -1) {
      this.artists.splice(artistIndex, 1);
    }
  }

  async syncOnAlbumDelete(albumId: string): Promise<void> {
    const albumIndex = this.albums.findIndex((album) => album.id === albumId);
    if (albumIndex !== -1) {
      this.albums.splice(albumIndex, 1);
    }
  }

  async syncOnTrackDelete(trackId: string): Promise<void> {
    const trackIndex = this.tracks.findIndex((track) => track.id === trackId);
    if (trackIndex !== -1) {
      this.tracks.splice(trackIndex, 1);
    }
  }

  private async getArtist(id: string): Promise<Artist> {
    try {
      return await this.artistService.getById(id);
    } catch (error) {
      throw new FavoritesUnprocessableEntityException('Artist', id);
    }
  }

  private async getAlbum(id: string): Promise<Album> {
    try {
      return await this.albumService.getById(id);
    } catch (error) {
      throw new FavoritesUnprocessableEntityException('Album', id);
    }
  }

  private async getTrack(id: string): Promise<Track> {
    try {
      return await this.trackService.getById(id);
    } catch (error) {
      throw new FavoritesUnprocessableEntityException('Track', id);
    }
  }
}
