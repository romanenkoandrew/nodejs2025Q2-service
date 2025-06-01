import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from 'src/track/interface/track.inteface';
import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { FavoritesResponse } from './interfaces/favorites.interface';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service'; 

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
    const artist = await this.artistService.getById(id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  private async getAlbum(id: string): Promise<Album> {
    const album = await this.albumService.getById(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  private async getTrack(id: string): Promise<Track> {
    const track = await this.trackService.getById(id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }
}
