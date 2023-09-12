import { Test, TestingModule } from '@nestjs/testing';

import { TransactionDebtsController } from './transaction-debts.controller';

describe('TransactionDebtsController', () => {
  let controller: TransactionDebtsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionDebtsController],
    }).compile();

    controller = module.get<TransactionDebtsController>(
      TransactionDebtsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
