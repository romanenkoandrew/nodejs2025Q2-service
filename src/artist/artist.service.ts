import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Artist } from './interfaces/artist.interface';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist-dto';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto): Artist {
    const artist: Artist = {
      id: randomUUID(),
      ...createArtistDto,
    };

    this.artists.push(artist);
    return artist;
  }

  getAll(): Artist[] {
    return this.artists;
  }

  getById(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.getById(id);
    Object.assign(artist, updateArtistDto);
    return artist;
  }

  delete(id: string): void {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    this.artists.splice(artistIndex, 1);
  }
}
