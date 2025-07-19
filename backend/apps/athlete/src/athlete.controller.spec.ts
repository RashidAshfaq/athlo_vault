import { Test, TestingModule } from '@nestjs/testing';
import { AthleteController } from './athlete.controller';
import { AthleteService } from './athlete.service';

describe('AthleteController', () => {
  let athleteController: AthleteController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AthleteController],
      providers: [AthleteService],
    }).compile();

    athleteController = app.get<AthleteController>(AthleteController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(athleteController.getHello()).toBe('Hello World!');
    });
  });
});
