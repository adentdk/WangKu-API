import { PickType } from '@nestjs/swagger';
import { BaseProfileDto } from './base-profile.dto';

export class CreateProfileDto extends PickType(BaseProfileDto, [
  'fullName',
  'nickName',
  'dateOfBirth',
  'gender',
  'profilePictureUrl',
]) {}
