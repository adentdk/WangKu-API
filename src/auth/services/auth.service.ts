import { Injectable } from '@nestjs/common';
import { AuthUserDto } from 'src/__common/dto/auth-user.dto';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(private appJwtService: JwtService) {}

  async getTokens({ userId, username }: AuthUserDto) {
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
