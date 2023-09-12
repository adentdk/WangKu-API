import { Test, TestingModule } from '@nestjs/testing';
import { TransactionCategoryGroupsService } from './transaction-category-groups.service';

describe('TransactionCategoryGroupsService', () => {
  let service: TransactionCategoryGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionCategoryGroupsService],
    }).compile();

    service = module.get<TransactionCategoryGroupsService>(TransactionCategoryGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
