import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';


export enum Coin {
	BTC = 'BTC'
}

@Injectable()
export class CryptoService {
	constructor(private httpService: HttpService) {}

	getExchangesCoin(coin: Coin) {
		return this.httpService.get(`https://api.coindesk.com/v1/bpi/currentprice/${coin}.json`)
			.pipe(map(res => res.data));
	}
}
