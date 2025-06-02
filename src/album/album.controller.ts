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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Albums')
@ApiBearerAuth()
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({ summary: 'Create new album' })
  @ApiResponse({
    status: 201,
    description: 'Album has been successfully created',
    type: CreateAlbumDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumService.create(createAlbumDto);
  }

  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({
    status: 200,
    description: 'Return all albums',
    type: [CreateAlbumDto],
  })
  @Get()
  async getAll(): Promise<Album[]> {
    return await this.albumService.getAll();
  }

  @ApiOperation({ summary: 'Get album by id' })
  @ApiResponse({
    status: 200,
    description: 'Return album by id',
    type: CreateAlbumDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    return await this.albumService.getById(id);
  }

  @ApiOperation({ summary: 'Update album' })
  @ApiResponse({
    status: 200,
    description: 'Album has been successfully updated',
    type: CreateAlbumDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @ApiOperation({ summary: 'Delete album' })
  @ApiResponse({
    status: 204,
    description: 'Album has been successfully deleted',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.albumService.delete(id);
  }
}
