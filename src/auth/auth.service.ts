import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in';
import { UsersService } from 'src/users/users.service';
import { AppJwtService } from 'src/app-jwt/app-jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private appJwtService: AppJwtService,
  ) {}

  async signIn({ username, password }: SignInDto) {
    const user = await this.userService.checkUsernamePassword(
      username,
      password,
    );

    const [accessToken, refreshToken] = await Promise.all([
      this.appJwtService.signAccessToken({ sub: user.id }),
      this.appJwtService.signRefreshToken({ sub: user.id }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
