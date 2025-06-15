import { Injectable } from '@nestjs/common';
import { User, UserWithoutPassword } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'node:crypto';
import {
  UserNotFoundException,
  InvalidPasswordException,
} from './exceptions/user.exceptions';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  constructor(private readonly configService: ConfigService) {}

  async create(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const { login, password } = createUserDto;
    const hashedPassword = await this.hashPassword(password);
    const user: User = {
      id: randomUUID(),
      login,
      password: hashedPassword,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(user);
    return new Promise((resolve) => {
      resolve(this.withoutPassword([user])[0]);
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

  async getByLogin(login: string): Promise<User> {
    return await this.getUserByLogin(login);
  }

  async update(
    id: string,
    updatePasswordDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    const user = await this.getUserById(id);
    if (
      !(await this.comparePassword(
        updatePasswordDto.oldPassword,
        user.password,
      ))
    ) {
      throw new InvalidPasswordException();
    }
    user.password = await this.hashPassword(updatePasswordDto.newPassword);
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

  private async getUserByLogin(login: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((user) => user.login === login);
      if (!user) {
        reject(new UserNotFoundException());
      }
      resolve(user);
    });
  }

  private withoutPassword(users: User[]): UserWithoutPassword[] {
    return users.map(
      (user) =>
        Object.fromEntries(
          Object.entries(user).filter(([key]) => key !== 'password'),
        ) as UserWithoutPassword,
    );
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(
      password,
      Number(this.configService.get<string>('CRYPT_SALT')),
    );
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
