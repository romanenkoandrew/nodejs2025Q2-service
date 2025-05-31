import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

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
    this.albums.splice(this.albums.indexOf(album), 1);
  }
}
