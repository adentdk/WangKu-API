import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsStrongPassword, MinLength } from 'class-validator';

import { CreateProfileDto } from 'modules/profiles/dto/create-profile.dto';

import { BaseUserDto } from './base-user.dto';

export class CreateUserDto extends PickType(BaseUserDto, [
  'username',
  'email',
  'phoneNumber',
]) {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @IsStrongPassword({
    minLength: 6,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @ApiProperty({ type: CreateProfileDto })
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile: CreateProfileDto;
}
