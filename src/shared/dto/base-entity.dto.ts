import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string | null;

  @ApiProperty()
  deletedAt: string | null;

  @ApiProperty()
  createdById: string | null;

  @ApiProperty()
  updatedById: string | null;

  @ApiProperty()
  deletedById: string | null;
}

export class BaseEntityDto extends BaseDto {
  @ApiProperty()
  id: string;
}

export class BaseEntityNumberDto extends BaseDto {
  @ApiProperty()
  id: number;
}
