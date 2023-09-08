import {
  InferAttributes,
  InferCreationAttributes,
  Op,
  UUIDV4,
} from 'sequelize';
import {
  BelongsToMany,
  Column,
  DataType,
  HasOne,
  IsUUID,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { BaseModel } from 'shared/base-model';
import { AuthUserDto } from 'shared/dto/auth-user.dto';
import { BcryptFunction } from 'shared/helpers/hash';

import { Profile } from 'modules/profiles/profiles.entity';
import { RoleUser } from 'modules/role-user/role-user.entity';
import { Role } from 'modules/roles/roles.entity';

@Table({
  name: {
    singular: 'user',
    plural: 'users',
  },
  paranoid: true,
})
export class User extends BaseModel<
  InferAttributes<User>,
  InferCreationAttributes<User, { omit: 'roles' }>
> {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.STRING(36),
    defaultValue: UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING(64),
    unique: true,
    allowNull: true,
    defaultValue: null,
  })
  username: string | null;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(20),
    unique: true,
    allowNull: true,
    defaultValue: null,
  })
  phoneNumber: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    set(val?: string) {
      if (val) {
        const hashedPassword = BcryptFunction.hashPasswordSync(val);
        this.setDataValue('password', hashedPassword);
      }
    },
  })
  password: string;

  @HasOne(() => Profile, 'userId')
  profile: Profile;

  @BelongsToMany(() => Role, {
    through: { model: () => RoleUser },
  })
  roles: [];

  getAuthObject(): AuthUserDto {
    return {
      userId: this.id,
      username: this.username,
      publicUser: false,
    };
  }

  async checkPassword(plainPassword: string) {
    return BcryptFunction.verifyPassword(plainPassword, this.password);
  }

  static findByCredential(credential: string) {
    return this.findOne({
      where: {
        [Op.or]: [
          {
            username: credential,
          },
          {
            email: credential,
          },
          {
            phoneNumber: credential,
          },
        ],
      },
    });
  }
}
