import { Test, TestingModule } from '@nestjs/testing';

import { AuthTransactionCreditsController } from './auth-transaction-credits.controller';

describe('AuthTransactionCreditsController', () => {
  let controller: AuthTransactionCreditsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthTransactionCreditsController],
    }).compile();

    controller = module.get<AuthTransactionCreditsController>(
      AuthTransactionCreditsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
