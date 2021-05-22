import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService, Coin } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the coin exchange rate', async (done) => {
    expect(await service.getExchangesCoin(Coin.BTC).toPromise())
      .toBe('{"BRL":"0.5000", ""}');
  })
});
