import { Test, TestingModule } from '@nestjs/testing';

import { TransactionDebtsService } from './transaction-debts.service';

describe('TransactionDebtsService', () => {
  let service: TransactionDebtsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionDebtsService],
    }).compile();

    service = module.get<TransactionDebtsService>(TransactionDebtsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
