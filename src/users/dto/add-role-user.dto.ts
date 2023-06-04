import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddRoleUserDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  roleId: number;
}
