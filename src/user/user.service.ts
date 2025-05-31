import { Injectable } from '@nestjs/common';
import {
  User,
  UserWithoutPassword,
} from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'node:crypto';
import {
  UserNotFoundException,
  InvalidPasswordException,
} from './exceptions/user.exceptions';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = {
      id: randomUUID(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(user);
    return new Promise((resolve) => {
      resolve(user);
    });
  }

  async getAll(): Promise<UserWithoutPassword[]> {
    return new Promise((resolve) => {
      resolve(this.withoutPassword(this.users));
    });
  }

  async getById(id: string): Promise<UserWithoutPassword> {
    const user = await this.getUserById(id);
    return this.withoutPassword([user])[0];
  }

  async update(id: string, updatePasswordDto: UpdateUserDto): Promise<UserWithoutPassword> {
    const user = await this.getUserById(id);
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new InvalidPasswordException();
    }
    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return this.withoutPassword([user])[0];
  }

  async delete(id: string): Promise<void> {
    const user = await this.getUserById(id);
    this.users.splice(this.users.indexOf(user), 1);
  }

  private async getUserById(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((user) => user.id === id);
      if (!user) {
        reject(new UserNotFoundException());
      }
      resolve(user);
    });
  }

  private withoutPassword(users: User[]): UserWithoutPassword[] {
    return users.map(({ password, ...user }) => user);
  }
}
