import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  constructor(
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album: Album = {
      id: randomUUID(),
      ...createAlbumDto,
    };

    this.albums.push(album);
    return new Promise((resolve) => {
      resolve(album);
    });
  }

  async getAll(): Promise<Album[]> {
    return new Promise((resolve) => {
      resolve(this.albums);
    });
  }

  async getById(id: string): Promise<Album> {
    return new Promise((resolve, reject) => {
      const album = this.albums.find((album) => album.id === id);
      if (!album) {
        reject(new NotFoundException(`Album with ID ${id} not found`));
      }
      resolve(album);
    });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.getById(id);
    Object.assign(album, updateAlbumDto);
    return new Promise((resolve) => {
      resolve(album);
    });
  }

  async delete(id: string): Promise<void> {
    const album = await this.getById(id);
    await this.trackService.updateTracksByAlbumId(id);
    await this.favoritesService.syncOnAlbumDelete(id);
    this.albums.splice(this.albums.indexOf(album), 1);
  }

  async updateAlbumsByArtistId(artistId: string): Promise<void> {
    return new Promise((resolve) => {
      const albums = this.albums.filter((album) => album.artistId === artistId);
      albums.forEach((album) => {
        album.artistId = null;
      });
      resolve();
    });
  }
}
