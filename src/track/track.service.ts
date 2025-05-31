import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Track } from './interface/track.inteface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];

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
    this.tracks.splice(this.tracks.indexOf(track), 1);
  }
}
