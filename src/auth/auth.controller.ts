import { Body, Controller } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { SignInSuccessDto } from './dto/sign-in-success';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in';
import { SignInDecorators } from './auth.decorators';
@Controller('auth')
@ApiTags('auth')
@ApiExtraModels(SignInSuccessDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SignInDecorators()
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
