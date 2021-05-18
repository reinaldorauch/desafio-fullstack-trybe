import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';

describe('CryptoController', () => {
  let controller: CryptoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoController],
    }).compile();

    controller = module.get<CryptoController>(CryptoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('shoud have a route to get exchange rates for a given coin', () => {
    expect(controller.exchangeRates).toBeDefined();
    expect(controller.exchangeRates).toBeInstanceOf(Function);
  });

  
});
