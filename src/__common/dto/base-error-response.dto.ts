import { ApiProperty } from '@nestjs/swagger';

export class BaseErrorResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  messages: string;

  @ApiProperty()
  error: string;
}
