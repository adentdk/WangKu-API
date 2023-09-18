import { Test, TestingModule } from '@nestjs/testing';

import { AuthTransactionCategoriesController } from './auth-transaction-categories.controller';

describe('AuthTransactionCategoriesController', () => {
  let controller: AuthTransactionCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthTransactionCategoriesController],
    }).compile();

    controller = module.get<AuthTransactionCategoriesController>(
      AuthTransactionCategoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
