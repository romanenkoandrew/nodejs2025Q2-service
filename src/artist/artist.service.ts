import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Artist } from './interfaces/artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistNotFoundException } from './exceptions/artist.exceptions';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];

  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist: Artist = {
      id: randomUUID(),
      ...createArtistDto,
    };

    this.artists.push(artist);
    return new Promise((resolve) => {
      resolve(artist);
    });
  }

  async getAll(): Promise<Artist[]> {
    return new Promise((resolve) => {
      resolve(this.artists);
    });
  }

  async getById(id: string): Promise<Artist> {
    return new Promise((resolve, reject) => {
      const artist = this.artists.find((artist) => artist.id === id);
      if (!artist) {
        reject(new ArtistNotFoundException());
      }
      resolve(artist);
    });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.getById(id);
    Object.assign(artist, updateArtistDto);
    return new Promise((resolve) => {
      resolve(artist);
    });
  }

  async delete(id: string): Promise<void> {
    const artist = await this.getById(id);
    await this.albumService.updateAlbumsByArtistId(id);
    await this.trackService.updateTracksByArtistId(id);
    await this.favoritesService.syncOnArtistDelete(id);
    this.artists.splice(this.artists.indexOf(artist), 1);
  }
}
