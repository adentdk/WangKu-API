import { ApiProperty } from '@nestjs/swagger';

export class SignInSuccessDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
