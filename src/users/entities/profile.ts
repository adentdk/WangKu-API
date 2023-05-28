import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { Gender } from 'src/__common/types/profile';
import { User } from './user';
import { BaseProfileDto } from '../dto/base-profile';
import { CreateProfileDto } from '../dto/create-profile';
import { BaseModel } from 'src/__common/dto/base-model';

@Table({
  name: {
    singular: 'profile',
    plural: 'profiles',
  },
  paranoid: true,
})
export class Profile extends BaseModel<BaseProfileDto, CreateProfileDto> {
  @Column({
    type: DataType.STRING(120),
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.STRING(64),
    allowNull: true,
    defaultValue: null,
  })
  nickName: string | null;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
    defaultValue: null,
  })
  dateOfBirth: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  gender: Gender;

  @Column({
    type: DataType.STRING(120),
    allowNull: true,
    defaultValue: null,
  })
  profilePictureUrl: string | null;

  @ForeignKey(() => User)
  @Column(DataType.STRING(36))
  userId: string;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
  })
  user: User;
}
