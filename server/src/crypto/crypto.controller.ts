import { Controller, Get, Param } from '@nestjs/common';
import { CryptoService, Coin } from './crypto.service';

@Controller('crypto')
export class CryptoController {
	constructor(private cryptoService: CryptoService) {}

	@Get(':coinId')
	exchangeRates(@Param('coinId') coin: Coin) {
		return this.cryptoService.getExchangesCoin(coin);
	}
}
