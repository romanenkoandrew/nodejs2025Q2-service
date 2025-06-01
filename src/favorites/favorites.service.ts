import { Injectable, NotFoundException } from '@nestjs/common';
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
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
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
