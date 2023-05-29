import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UsernameOrPasswordInValid } from 'src/__common/exceptions/username-or-password-invalid';
import { CurrentUserDto } from '../dto/current-user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<CurrentUserDto> {
    const user = await this.userService.checkUsernamePassword(
      username,
      password,
    );
    if (!user) throw new UsernameOrPasswordInValid();

    return {
      userId: user.id,
      username: user.username,
    };
  }
}
