import { ApiProperty } from '@nestjs/swagger';

export class BaseEntityDto {
  @ApiProperty()
  id: string;

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
