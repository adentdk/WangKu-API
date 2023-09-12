import { Test, TestingModule } from '@nestjs/testing';

import { TransactionAccountsController } from './transaction-accounts.controller';

describe('TransactionAccountsController', () => {
  let controller: TransactionAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionAccountsController],
    }).compile();

    controller = module.get<TransactionAccountsController>(
      TransactionAccountsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
