import { Test, TestingModule } from '@nestjs/testing';
import { TransactionCategoryGroupsController } from './transaction-category-groups.controller';

describe('TransactionCategoryGroupsController', () => {
  let controller: TransactionCategoryGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionCategoryGroupsController],
    }).compile();

    controller = module.get<TransactionCategoryGroupsController>(TransactionCategoryGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
