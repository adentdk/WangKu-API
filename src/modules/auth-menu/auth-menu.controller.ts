import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from 'shared/decorators/auth-user';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from 'shared/decorators/swagger';
import { AuthUserDto } from 'shared/dto/auth-user.dto';
import { JwtAuthGuard } from 'shared/guards/jwt-auth.guard';

import { BaseMenu } from 'modules/menus/dto/base-menu.dto';
import { UserService } from 'modules/users/users.service';

@Controller('auth')
@ApiTags('auth-menu')
@ApiForbiddenResponse()
@ApiBadRequestResponse()
@ApiUnauthorizedResponse()
@ApiValidationResponse()
@ApiInternalServerErrorResponse()
export class AuthMenuController {
  constructor(private readonly userService: UserService) {}

  @Get('menus')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: BaseMenu, isArray: true })
  async getMenus(@AuthUser() authUser: AuthUserDto) {
    const user = await this.userService.findOne(authUser.userId, {
      attributes: ['id'],
      include: [
        {
          association: 'roles',
          attributes: ['id'],
          include: [
            {
              association: 'menus',
              attributes: [
                'identifier',
                'name',
                'href',
                'iconType',
                'icon',
                'order',
              ],
              through: {
                attributes: ['order'],
              },
              include: [
                {
                  association: 'children',
                  attributes: [
                    'identifier',
                    'name',
                    'href',
                    'iconType',
                    'icon',
                    'order',
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    return user.roles
      .flatMap((role) => role.menus)
      .sort((a, b) => {
        return (
          (b.roleMenu.order || b.order || 0) -
          (a.roleMenu.order || a.order || 0)
        );
      })
      .map((menu) => ({
        ...menu.toJSON(),
        children: menu.children
          .sort((a, b) => {
            return (b.order || 0) - (a.order || 0);
          })
          .map((child) => child.toJSON()),
      }));
  }
}
