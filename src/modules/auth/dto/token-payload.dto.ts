import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TokenPayloadDto {
  @ApiProperty()
  @IsNotEmpty()
  sub: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;
}
