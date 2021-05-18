import { IsIn } from 'class-validator';
import { Coin } from './crypto.service';

export class CoinQueryParams {
	@IsIn([Coin.BTC])
	coin: Coin;
}
