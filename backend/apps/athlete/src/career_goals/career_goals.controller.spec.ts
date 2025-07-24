import { Test, TestingModule } from '@nestjs/testing';
import { CareerGoalsController } from './career_goals.controller';

describe('CareerGoalsController', () => {
  let controller: CareerGoalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareerGoalsController],
    }).compile();

    controller = module.get<CareerGoalsController>(CareerGoalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
