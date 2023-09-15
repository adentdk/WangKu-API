import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthUserDto } from 'shared/dto/auth-user.dto';

import { TokenPayloadDto } from './dto/token-payload.dto';

@Injectable()
export class AuthService {
  constructor(private config: ConfigService, private jwtService: JwtService) {}

  async getTokens({ userId, username }: AuthUserDto) {
    const payload: TokenPayloadDto = {
      sub: userId,
      username: username,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(payload),
      this.signRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signAccessToken(payload: string | object | Buffer) {
    return await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('jwt.accessSecret'),
      expiresIn: this.config.get<string>('jwt.accessExpired'),
    });
  }

  async verifyAccessToken(token: string) {
    return await this.jwtService.verifyAsync<TokenPayloadDto>(token, {
      secret: this.config.get<string>('jwt.accessSecret'),
    });
  }

  async signRefreshToken(payload: string | object | Buffer) {
    return await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('jwt.refreshSecret'),
      expiresIn: this.config.get<string>('jwt.refreshExpired'),
    });
  }

  async verifyRefreshToken(token: string) {
    return await this.jwtService.verifyAsync<TokenPayloadDto>(token, {
      secret: this.config.get<string>('jwt.refreshSecret'),
    });
  }
}
