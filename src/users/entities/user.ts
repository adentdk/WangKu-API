import {
  Column,
  DataType,
  HasOne,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Profile } from './profile';
import { BcryptFunction } from 'src/__common/helpers/hash';
import { UUIDV4 } from 'sequelize';
import { BaseUserDto } from '../dto/base-user';
import { CreateUserDto } from '../dto/create-user.dto';

@Table({
  name: {
    singular: 'user',
    plural: 'users',
  },
  paranoid: true,
})
export class User extends Model<BaseUserDto, CreateUserDto> {
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

  @HasOne(() => Profile)
  profile: Profile;
}
