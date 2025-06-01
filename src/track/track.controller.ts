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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interface/track.inteface';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Tracks')
@ApiBearerAuth()
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({ summary: 'Create new track' })
  @ApiResponse({ 
    status: 201, 
    description: 'Track has been successfully created',
    type: CreateTrackDto 
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.trackService.create(createTrackDto);
  }

  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all tracks',
    type: [CreateTrackDto]
  })
  @Get()
  async getAll(): Promise<Track[]> {
    return await this.trackService.getAll();
  }

  @ApiOperation({ summary: 'Get track by id' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return track by id',
    type: CreateTrackDto 
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    return await this.trackService.getById(id);
  }

  @ApiOperation({ summary: 'Update track' })
  @ApiResponse({ 
    status: 200, 
    description: 'Track has been successfully updated',
    type: CreateTrackDto 
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return await this.trackService.update(id, updateTrackDto);
  }

  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({ status: 204, description: 'Track has been successfully deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.trackService.delete(id);
  }
}
