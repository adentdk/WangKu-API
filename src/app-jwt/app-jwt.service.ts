import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppJwtService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signAccessToken(payload: string | object | Buffer) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.accessSecret'),
      expiresIn: this.configService.get<string>('jwt.accessExpired'),
    });
  }

  async verifyAccessToken(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('jwt.accessSecret'),
    });
  }

  async signRefreshToken(payload: string | object | Buffer) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
      expiresIn: this.configService.get<string>('jwt.refreshExpired'),
    });
  }

  async verifyRefreshToken(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
    });
  }
}
