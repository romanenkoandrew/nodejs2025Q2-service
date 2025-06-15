import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Tokens, JwtPayload } from './interfaces/auth.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  signup(createAuthDto: CreateAuthDto) {
    return this.userService.create(createAuthDto);
  }

  async login(createAuthDto: CreateAuthDto): Promise<Tokens> {
    try {
      const user = await this.userService.getByLogin(createAuthDto.login);
      if (
        !(await this.userService.comparePassword(
          createAuthDto.password,
          user.password,
        ))
      ) {
        throw new Error('Invalid credentials');
      }
      return await this.generateTokens(user.id, user.login);
    } catch (error) {
      throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
    }
  }

  private async generateTokens(userId: string, login: string): Promise<Tokens> {
    const payload: JwtPayload = {
      userId,
      login,
      type: 'access',
    };

    const refreshPayload: JwtPayload = {
      userId,
      login,
      type: 'refresh',
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get<string>('TOKEN_EXPIRE_TIME'),
      }),
      this.jwtService.signAsync(refreshPayload, {
        expiresIn: this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<Tokens> {
    try {
      const { userId, login, type } =
        await this.jwtService.verifyAsync<JwtPayload>(
          refreshTokenDto.refreshToken,
        );

      if (type !== 'refresh') {
        throw new Error('Invalid token type');
      }

      return await this.generateTokens(userId, login);
    } catch (error) {
      throw new HttpException('Invalid refresh token', HttpStatus.FORBIDDEN);
    }
  }
}
