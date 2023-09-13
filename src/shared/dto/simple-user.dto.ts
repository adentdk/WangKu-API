import { ApiProperty } from '@nestjs/swagger';

export class SimpleUser {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone_number: string | null;

  @ApiProperty()
  email: string | null;
}
