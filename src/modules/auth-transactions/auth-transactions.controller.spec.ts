import { Test, TestingModule } from '@nestjs/testing';

import { AuthTransactionsController } from './auth-transactions.controller';

describe('AuthTransactionsController', () => {
  let controller: AuthTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthTransactionsController],
    }).compile();

    controller = module.get<AuthTransactionsController>(
      AuthTransactionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
