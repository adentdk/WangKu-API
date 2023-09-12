import { Test, TestingModule } from '@nestjs/testing';

import { TransactionCreditsService } from './transaction-credits.service';

describe('TransactionCreditsService', () => {
  let service: TransactionCreditsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionCreditsService],
    }).compile();

    service = module.get<TransactionCreditsService>(TransactionCreditsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
