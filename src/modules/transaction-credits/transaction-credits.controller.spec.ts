import { Test, TestingModule } from '@nestjs/testing';

import { TransactionCreditsController } from './transaction-credits.controller';

describe('TransactionCreditsController', () => {
  let controller: TransactionCreditsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionCreditsController],
    }).compile();

    controller = module.get<TransactionCreditsController>(
      TransactionCreditsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
