import { Test, TestingModule } from '@nestjs/testing';
import { AuthSyncController } from './auth-sync.controller';

describe('AuthSyncController', () => {
  let controller: AuthSyncController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthSyncController],
    }).compile();

    controller = module.get<AuthSyncController>(AuthSyncController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
