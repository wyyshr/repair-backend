import { Test, TestingModule } from '@nestjs/testing';
import { RepairerService } from './repairer.service';

describe('RepairerService', () => {
  let service: RepairerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepairerService],
    }).compile();

    service = module.get<RepairerService>(RepairerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
