import { Test, TestingModule } from '@nestjs/testing';
import { IconBundlesController } from './icon-bundles.controller';

describe('IconBundlesController', () => {
  let controller: IconBundlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IconBundlesController],
    }).compile();

    controller = module.get<IconBundlesController>(IconBundlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
