import { Test, TestingModule } from '@nestjs/testing';

import { AuthTransactionAccountsController } from './auth-transaction-accounts.controller';

describe('AuthTransactionAccountsController', () => {
  let controller: AuthTransactionAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthTransactionAccountsController],
    }).compile();

    controller = module.get<AuthTransactionAccountsController>(
      AuthTransactionAccountsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
