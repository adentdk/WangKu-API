import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(
    private config: ConfigService,
    private nestJwtService: NestJwtService,
  ) {}

  async signAccessToken(payload: string | object | Buffer) {
    return await this.nestJwtService.signAsync(payload, {
      secret: this.config.get<string>('jwt.accessSecret'),
      expiresIn: this.config.get<string>('jwt.accessExpired'),
    });
  }

  async verifyAccessToken(token: string) {
    return await this.nestJwtService.verifyAsync(token, {
      secret: this.config.get<string>('jwt.accessSecret'),
    });
  }

  async signRefreshToken(payload: string | object | Buffer) {
    return await this.nestJwtService.signAsync(payload, {
      secret: this.config.get<string>('jwt.refreshSecret'),
      expiresIn: this.config.get<string>('jwt.refreshExpired'),
    });
  }

  async verifyRefreshToken(token: string) {
    return await this.nestJwtService.verifyAsync(token, {
      secret: this.config.get<string>('jwt.refreshSecret'),
    });
  }
}
