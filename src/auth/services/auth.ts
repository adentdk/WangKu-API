import { Injectable } from '@nestjs/common';
import { JwtService } from './jwt';
import { CurrentUserDto } from '../dto/current-user';

@Injectable()
export class AuthService {
  constructor(private appJwtService: JwtService) {}

  async getTokens({ userId, username }: CurrentUserDto) {
    const payload = {
      sub: userId,
      username: username,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.appJwtService.signAccessToken(payload),
      this.appJwtService.signRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
