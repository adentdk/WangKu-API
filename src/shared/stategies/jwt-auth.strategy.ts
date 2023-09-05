import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthUserDto } from 'shared/dto/auth-user.dto';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('jwt.accessSecret'),
    });
  }

  async validate(payload: any): Promise<AuthUserDto> {
    return {
      userId: payload.sub,
      username: payload.username,
      publicUser: false,
    };
  }
}
