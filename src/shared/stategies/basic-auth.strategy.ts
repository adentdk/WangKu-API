import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';

import { UserService } from 'modules/users/users.service';
import { AuthUserDto } from 'shared/dto/auth-user.dto';
import { InvalidCredentials } from 'shared/exceptions/invalid-credentials';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  validate(username: string, password: string): AuthUserDto {
    // eslint-disable-next-line prettier/prettier
    if (username !== this.configService.get('auth.basicUsername') || password !== this.configService.get('auth.basicPassword')) throw new InvalidCredentials();
    return {
      userId: this.configService.get<string>('auth.basicUserId'),
      username: this.configService.get<string>('auth.basicUsername'),
      publicUser: true,
    };
  }
}
