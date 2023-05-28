import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user';
import { ListUserParamsDto } from './dto/list-user';
import { PaginatedDto } from 'src/__common/dto/paginated';
import { BaseUserDto } from './dto/base-user';
import { Profile } from './entities/profile';
import { BooleanType } from 'src/__common/types/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Profile) private profileModel: typeof Profile,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto, {
      include: [this.profileModel],
    });
  }

  async findAll({
    page = 1,
    pageSize = 10,
    withProfile,
  }: ListUserParamsDto): Promise<PaginatedDto<BaseUserDto>> {
    const include = [];
    console.log(withProfile, typeof withProfile);
    if (withProfile === BooleanType.True) {
      include.push(this.profileModel);
    }

    return this.userModel.findAllPaginated({
      page,
      pageSize,
      options: {
        include,
      },
    });
  }

  async findOne(id: string): Promise<BaseUserDto> {
    const user = await this.userModel.findByPk(id, {
      include: [this.profileModel],
    });

    if (user === null) throw new BadRequestException('user not found');

    return user.toJSON();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
