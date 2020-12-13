import { Test, TestingModule } from '@nestjs/testing';
import { RepairerController } from './repairer.controller';

describe('RepairerController', () => {
  let controller: RepairerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepairerController],
    }).compile();

    controller = module.get<RepairerController>(RepairerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
