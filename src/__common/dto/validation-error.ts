import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  messages: [
    {
      field: string;
      constraints: {
        isStrongPassword: string;
      };
    },
  ];

  @ApiProperty()
  error: string;
}
