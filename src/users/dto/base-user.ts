import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength } from 'class-validator';

export class BaseUserDto {
  @ApiProperty()
  id: string;

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

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  deletedAt: string | null;
}
