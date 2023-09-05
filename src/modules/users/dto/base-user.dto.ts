import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength } from 'class-validator';
import { BaseEntityDto } from 'shared/dto/base-entity.dto';
import { BaseProfileDto } from './base-profile.dto';
import { Type } from 'class-transformer';

export class BaseUserDto extends BaseEntityDto {
  @ApiProperty()
  @MaxLength(64)
  username?: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  @IsEmail()
  email: string;

  @ApiProperty()
  @MaxLength(20)
  @IsPhoneNumber('ID')
  phoneNumber?: string;

  @ApiProperty({ type: BaseProfileDto })
  @Type(() => BaseProfileDto)
  profile: BaseEntityDto;
}
