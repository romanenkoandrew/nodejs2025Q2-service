import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UserWithoutPassword,
} from './interfaces/user.interface';
import { InvalidUserIdException } from './exceptions/user.exceptions';
import { uuidCheck } from 'src/utils/uuid-validation';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserWithoutPassword> {
    const user = this.userService.create(createUserDto);
    return this.userService.findOne(user.id);
  }

  @Get()
  async getAll(): Promise<UserWithoutPassword[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserWithoutPassword> {
    if (!uuidCheck(id)) {
      throw new InvalidUserIdException();
    }
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserWithoutPassword> {
    if (!uuidCheck(id)) {
      throw new InvalidUserIdException();
    }
    this.userService.updatePassword(id, updatePasswordDto);
    return this.userService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    if (!uuidCheck(id)) {
      throw new InvalidUserIdException();
    }
    this.userService.remove(id);
  }
}
