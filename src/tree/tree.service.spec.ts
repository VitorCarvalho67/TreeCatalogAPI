import { Test, TestingModule } from '@nestjs/testing';
import { TreeService } from './tree.service';

describe('TreeService', () => {
  let service: TreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreeService],
    }).compile();

    service = module.get<TreeService>(TreeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
