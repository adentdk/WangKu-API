import { Test, TestingModule } from '@nestjs/testing';

import { TransactionAccountsService } from './transaction-accounts.service';

describe('TransactionAccountsService', () => {
  let service: TransactionAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionAccountsService],
    }).compile();

    service = module.get<TransactionAccountsService>(
      TransactionAccountsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
