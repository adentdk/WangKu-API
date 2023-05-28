import { ApiProperty } from '@nestjs/swagger';

export class BaseErrorDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  messages: string;

  @ApiProperty()
  error: string;
}
