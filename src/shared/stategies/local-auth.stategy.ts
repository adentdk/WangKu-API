import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthUserDto } from 'shared/dto/auth-user.dto';
import { BadRequest } from 'shared/exceptions/bad-request';

import { UserService } from 'modules/users/users.service';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<AuthUserDto> {
    const user = await this.userService.checkUsernamePassword(
      username,
      password,
    );
    if (!user) throw new BadRequest();

    return {
      userId: user.id,
      username: user.username,
      publicUser: false,
    };
  }
}
