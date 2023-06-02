import { Controller } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/__common/decorators/auth-user';
import { AuthUserDto } from 'src/__common/dto/auth-user.dto';

import { UsersService } from 'src/users/users.service';

import { TokensDto } from './dto/tokens.dto';
import { AuthService } from './services/auth.service';
import {
  AuthProfileDecorators,
  SignInDecorators,
} from './auth.controllers.decorators';

@Controller('auth')
@ApiTags('auth')
@ApiExtraModels(TokensDto)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @SignInDecorators()
  async signIn(@AuthUser() authUser: AuthUserDto) {
    return this.authService.getTokens(authUser);
  }

  @AuthProfileDecorators()
  async profile(@AuthUser() authUser: AuthUserDto) {
    return this.userService.findProfile(authUser.userId);
  }
}
