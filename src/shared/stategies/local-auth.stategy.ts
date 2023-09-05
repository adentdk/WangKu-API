import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'modules/users/users.service';
import { UsernameOrPasswordInValid } from 'shared/exceptions/username-or-password-invalid';
import { AuthUserDto } from 'shared/dto/auth-user.dto';

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
    if (!user) throw new UsernameOrPasswordInValid();

    return {
      userId: user.id,
      username: user.username,
      publicUser: false,
    };
  }
}
