import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { BaseEntityDto } from 'shared/dto/base-entity.dto';
import { Gender } from 'shared/types/profile';

export class BaseProfileDto extends BaseEntityDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(120)
  fullName: string;

  @ApiProperty({ required: false })
  @MaxLength(64)
  nickName?: string;

  @ApiProperty({ required: false, type: 'date' })
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({ required: false, enum: Gender })
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({ required: false })
  @IsString()
  profilePictureUrl?: string;

  @IsString()
  userId: string;
}
