import { Injectable, NotFoundException, forwardRef, Inject } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Track } from './interface/track.inteface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track: Track = {
      id: randomUUID(),
      ...createTrackDto,
    };

    this.tracks.push(track);
    return new Promise((resolve) => {
      resolve(track);
    });
  }

  async getAll(): Promise<Track[]> {
    return new Promise((resolve) => {
      resolve(this.tracks);
    });
  }

  async getById(id: string): Promise<Track> {
    return new Promise((resolve, reject) => {
      const track = this.tracks.find((track) => track.id === id);
      if (!track) {
        reject(new NotFoundException(`Track with ID ${id} not found`));
      }
      resolve(track);
    });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.getById(id);
    Object.assign(track, updateTrackDto);
    return new Promise((resolve) => {
      resolve(track);
    });
  }

  async delete(id: string): Promise<void> {
    const track = await this.getById(id);
    await this.favoritesService.syncOnTrackDelete(id);
    this.tracks.splice(this.tracks.indexOf(track), 1);
  }

  async updateTracksByAlbumId(albumId: string): Promise<void> {
    return new Promise((resolve) => {
      const tracks = this.tracks.filter((track) => track.albumId === albumId);
      tracks.forEach((track) => {
        track.albumId = null;
      });
      resolve();
    });
  }

  async updateTracksByArtistId(artistId: string): Promise<void> {
    return new Promise((resolve) => {
      const tracks = this.tracks.filter((track) => track.artistId === artistId);
      tracks.forEach((track) => {
        track.artistId = null;
      });
      resolve();
    });
  }
}
