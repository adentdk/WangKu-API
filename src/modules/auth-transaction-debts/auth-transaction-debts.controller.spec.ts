import { Test, TestingModule } from '@nestjs/testing';

import { AuthTransactionDebtsController } from './auth-transaction-debts.controller';

describe('AuthTransactionDebtsController', () => {
  let controller: AuthTransactionDebtsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthTransactionDebtsController],
    }).compile();

    controller = module.get<AuthTransactionDebtsController>(
      AuthTransactionDebtsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
