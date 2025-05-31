import { Injectable } from '@nestjs/common';
import {
  UpdatePasswordDto,
  User,
  UserWithoutPassword,
} from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'node:crypto';
import {
  UserNotFoundException,
  InvalidPasswordException,
} from './exceptions/user.exceptions';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      id: randomUUID(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(user);
    return user;
  }

  findAll(): UserWithoutPassword[] {
    return this.withoutPassword(this.users);
  }

  findOne(id: string): UserWithoutPassword {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return this.withoutPassword([user])[0];
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): void {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new UserNotFoundException();
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new InvalidPasswordException();
    }
    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
  }

  remove(id: string): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new UserNotFoundException();
    }
    this.users.splice(userIndex, 1);
  }

  private withoutPassword(users: User[]): UserWithoutPassword[] {
    return users.map(({ password, ...user }) => user);
  }
}
