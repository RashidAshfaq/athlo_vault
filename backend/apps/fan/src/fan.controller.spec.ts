import { Test, TestingModule } from '@nestjs/testing';
import { FanController } from './fan.controller';
import { FanService } from './fan.service';

describe('FanController', () => {
  let fanController: FanController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FanController],
      providers: [FanService],
    }).compile();

    fanController = app.get<FanController>(FanController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fanController.getHello()).toBe('Hello World!');
    });
  });
});
