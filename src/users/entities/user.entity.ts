import { Op } from 'sequelize';
import { Column, DataType, HasOne, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/__common/base-model';
import { BcryptFunction } from 'src/__common/helpers/hash';
import { Profile } from './profile.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { BaseUserDto } from '../dto/base-user.dto';

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
