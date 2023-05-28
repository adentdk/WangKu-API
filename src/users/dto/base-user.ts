import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength } from 'class-validator';
import { BaseEntityDto } from 'src/__common/dto/base-entity';
import { BaseProfileDto } from './base-profile';
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
