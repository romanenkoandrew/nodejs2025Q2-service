import { JwtModuleOptions } from '@nestjs/jwt';
import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', (): JwtModuleOptions => {
  const secret = process.env.JWT_SECRET_KEY;
  const expiresIn = process.env.TOKEN_EXPIRE_TIME;

  if (!secret) {
    throw new Error('JWT_SECRET_KEY is not defined in environment variables');
  }

  if (!expiresIn) {
    throw new Error('TOKEN_EXPIRE_TIME is not defined in environment variables');
  }

  return {
    global: true,
    secret,
    signOptions: { expiresIn },
  };
}); 