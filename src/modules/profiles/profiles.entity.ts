import {
  Attributes,
  FindOptions,
  InferAttributes,
  InferCreationAttributes,
  UUIDV4,
} from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { BaseModel } from 'shared/base-model';
import { Gender } from 'shared/types/profile';

import { User } from 'modules/users/user.entity';

interface FindByUserIdParams {
  userId: string;
  options?: FindOptions<Attributes<Profile>>;
}

@Table({
  name: {
    singular: 'profile',
    plural: 'profiles',
  },
  paranoid: true,
})
export class Profile extends BaseModel<
  InferAttributes<Profile>,
  InferCreationAttributes<Profile, { omit: 'user' | 'userId' }>
> {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.STRING(36),
    defaultValue: UUIDV4,
  })
  id: string;

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
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
  })
  user: User;

  static findByUserId({
    userId,
    options: { where, ...options } = {},
  }: FindByUserIdParams) {
    return this.findOne({ where: { userId, ...where }, ...options });
  }
}
