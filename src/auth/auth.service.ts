import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';
import { InvalidPasswordException } from 'src/user/exceptions/user.exceptions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  signup(createAuthDto: CreateAuthDto) {
    return this.userService.create(createAuthDto);
  }

  async login(createAuthDto: CreateAuthDto) {
    try {
      const user = await this.userService.getByLogin(createAuthDto.login);
      if (user.password !== createAuthDto.password) {
        throw new Error('Invalid credentials');
      }
      const payload = { sub: user.id, username: user.login };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
    }
  }

  refresh(id: number) {
    return `This action returns a #${id} auth`;
  }
}
