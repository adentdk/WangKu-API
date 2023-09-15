import { Test, TestingModule } from '@nestjs/testing';
import { IconBundlesService } from './icon-bundles.service';

describe('IconBundlesService', () => {
  let service: IconBundlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IconBundlesService],
    }).compile();

    service = module.get<IconBundlesService>(IconBundlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
