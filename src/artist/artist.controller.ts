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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Artists')
@ApiBearerAuth()
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOperation({ summary: 'Create new artist' })
  @ApiResponse({ 
    status: 201, 
    description: 'Artist has been successfully created',
    type: CreateArtistDto 
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistService.create(createArtistDto);
  }

  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all artists',
    type: [CreateArtistDto]
  })
  @Get()
  async getAll(): Promise<Artist[]> {
    return await this.artistService.getAll();
  }

  @ApiOperation({ summary: 'Get artist by id' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return artist by id',
    type: CreateArtistDto 
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    return await this.artistService.getById(id);
  }

  @ApiOperation({ summary: 'Update artist' })
  @ApiResponse({ 
    status: 200, 
    description: 'Artist has been successfully updated',
    type: CreateArtistDto 
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistService.update(id, updateArtistDto);
  }

  @ApiOperation({ summary: 'Delete artist' })
  @ApiResponse({ status: 204, description: 'Artist has been successfully deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.artistService.delete(id);
  }
}
