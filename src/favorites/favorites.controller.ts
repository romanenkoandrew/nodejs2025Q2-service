import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './interfaces/favorites.interface';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Favorites')
@ApiBearerAuth()
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all favorites (artists, albums, tracks)',
    type: FavoritesResponse 
  })
  @Get()
  async getAll(): Promise<FavoritesResponse> {
    return await this.favoritesService.getAll();
  }

  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiResponse({ status: 201, description: 'Artist has been successfully added to favorites' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 422, description: 'Artist with id doesn\'t exist' })
  @Post('/artist/:id')
  async addArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favoritesService.addArtist(id);
  }

  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiResponse({ status: 204, description: 'Artist has been successfully deleted from favorites' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Artist was not found in favorites' })
  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favoritesService.deleteArtist(id);
  }

  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiResponse({ status: 201, description: 'Album has been successfully added to favorites' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 422, description: 'Album with id doesn\'t exist' })
  @Post('/album/:id')
  async addAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favoritesService.addAlbum(id);
  }

  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiResponse({ status: 204, description: 'Album has been successfully deleted from favorites' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Album was not found in favorites' })
  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favoritesService.deleteAlbum(id);
  }

  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiResponse({ status: 201, description: 'Track has been successfully added to favorites' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 422, description: 'Track with id doesn\'t exist' })
  @Post('/track/:id')
  async addTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favoritesService.addTrack(id);
  }

  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiResponse({ status: 204, description: 'Track has been successfully deleted from favorites' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Track was not found in favorites' })
  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favoritesService.deleteTrack(id);
  }
}
