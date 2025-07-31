import { Test, TestingModule } from '@nestjs/testing';
import { InvestorController } from './investor.controller';
import { InvestorService } from './investor.service';

describe('InvestorController', () => {
  let investorController: InvestorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InvestorController],
      providers: [InvestorService],
    }).compile();

    investorController = app.get<InvestorController>(InvestorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(investorController.getHello()).toBe('Hello World!');
    });
  });
});
