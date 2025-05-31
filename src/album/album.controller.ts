import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    ParseUUIDPipe,
    Put,
  } from '@nestjs/common';
  import { AlbumService } from './album.service';
  import { CreateAlbumDto } from './dto/create-album.dto';
  import { UpdateAlbumDto } from './dto/update-album.dto';
  import { Album } from './interfaces/album.interface';
  
  @Controller('album')
  export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}
  
    @Post()
    async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
      return await this.albumService.create(createAlbumDto);
    }
  
    @Get()
    async getAll(): Promise<Album[]> {
      return await this.albumService.getAll();
    }
  
    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
      return await this.albumService.getById(id);
    }
  
    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAlbumDto: UpdateAlbumDto): Promise<Album> {
      return await this.albumService.update(id, updateAlbumDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
      await this.albumService.delete(id);
    }
  } 