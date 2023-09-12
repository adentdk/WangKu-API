import { Test, TestingModule } from '@nestjs/testing';
import { TransactionDebtService } from './transaction-debt.service';

describe('TransactionDebtService', () => {
  let service: TransactionDebtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionDebtService],
    }).compile();

    service = module.get<TransactionDebtService>(TransactionDebtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
