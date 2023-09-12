import { Test, TestingModule } from '@nestjs/testing';
import { TransactionCreditController } from './transaction-credit.controller';

describe('TransactionCreditController', () => {
  let controller: TransactionCreditController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionCreditController],
    }).compile();

    controller = module.get<TransactionCreditController>(TransactionCreditController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
