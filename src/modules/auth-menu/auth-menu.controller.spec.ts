import { Test, TestingModule } from '@nestjs/testing';
import { AuthMenuController } from './auth-menu.controller';

describe('AuthMenuController', () => {
  let controller: AuthMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthMenuController],
    }).compile();

    controller = module.get<AuthMenuController>(AuthMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
