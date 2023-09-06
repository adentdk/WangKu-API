import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('languages')
@Controller('languages')
export class LanguagesController {}
