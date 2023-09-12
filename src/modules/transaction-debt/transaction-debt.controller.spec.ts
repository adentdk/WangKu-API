import { Test, TestingModule } from '@nestjs/testing';
import { TransactionDebtController } from './transaction-debt.controller';

describe('TransactionDebtController', () => {
  let controller: TransactionDebtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionDebtController],
    }).compile();

    controller = module.get<TransactionDebtController>(TransactionDebtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
