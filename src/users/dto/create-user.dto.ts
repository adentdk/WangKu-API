import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BaseUserDto } from './base-user';
import { IsNotEmpty, IsStrongPassword, MinLength } from 'class-validator';

export class CreateUserDto extends OmitType(BaseUserDto, [
  'id',
  'createdAt',
  'updatedAt',
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
}
