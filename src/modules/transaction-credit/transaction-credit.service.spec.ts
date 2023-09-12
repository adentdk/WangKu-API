import { Test, TestingModule } from '@nestjs/testing';
import { TransactionCreditService } from './transaction-credit.service';

describe('TransactionCreditService', () => {
  let service: TransactionCreditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionCreditService],
    }).compile();

    service = module.get<TransactionCreditService>(TransactionCreditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
