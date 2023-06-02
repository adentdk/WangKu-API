import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { BaseEntityDto } from 'src/__common/dto/base-entity.dto';

export class BaseApiPermissionDto extends BaseEntityDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(64)
  entity: string;
}
