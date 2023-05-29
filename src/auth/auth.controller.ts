import { Body, Controller } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { SignInSuccessDto } from './dto/sign-in-success';
import { AuthService } from './services/auth';
import { SignInDto } from './dto/sign-in';
import { AuthProfileDecorators, SignInDecorators } from './decorators/response';
import { CurrentUser } from './decorators/current-user';
import { CurrentUserDto } from './dto/current-user';
import { UsersService } from 'src/users/users.service';
@Controller('auth')
@ApiTags('auth')
@ApiExtraModels(SignInSuccessDto)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @SignInDecorators()
  async signIn(@CurrentUser() currentUser: CurrentUserDto) {
    return this.authService.getTokens(currentUser);
  }

  @AuthProfileDecorators()
  async profile(@CurrentUser() currentUser: CurrentUserDto) {
    return this.userService.findProfile(currentUser.userId);
  }
}
