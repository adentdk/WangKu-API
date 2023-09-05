import { Op } from 'sequelize';
import {
  BelongsToMany,
  Column,
  DataType,
  HasOne,
  Table,
} from 'sequelize-typescript';
import { BaseModel } from 'shared/base-model';
import { BcryptFunction } from 'shared/helpers/hash';
import { Profile } from 'modules/profiles/profiles.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseUserDto } from './dto/base-user.dto';
import { Role } from 'modules/roles/roles.entity';
import { RoleUser } from 'modules/role-user/role-user.entity';

@Table({
  name: {
    singular: 'user',
    plural: 'users',
  },
  paranoid: true,
})
export class User extends BaseModel<BaseUserDto, CreateUserDto> {
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
