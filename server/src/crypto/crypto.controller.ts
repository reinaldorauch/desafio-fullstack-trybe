import {
	Controller,
	Get,
	Param,
	UsePipes,
	ValidationPipe,
	Body,
	Post,
	BadRequestException,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CryptoService, Coin } from './crypto.service';
import { CoinQueryParams } from './coin-query-params';
import { UpdateExchangeTableDto } from './update-exchange-table.dto';
import { ValidationError } from 'class-validator';

const messageMap = {
	currency: 'Moeda inválida',
	value: 'Valor inválido',
	currencyAndValue: 'Moeda e valor inválidos',
};

@Controller('crypto')
@UseGuards(AuthGuard('header'))
export class CryptoController {
	constructor(private cryptoService: CryptoService) {}

	@Get('btc')
	@UsePipes(new ValidationPipe())
	exchangeRates() {
		return this.cryptoService.getExchangesCoin(Coin.BTC);
	}

	@Post('btc')
	@UsePipes(
		new ValidationPipe({
			exceptionFactory(errors: ValidationError[]) {
				const props = errors.map((e) => e.property);

				let message = '';

				if (props.includes('currency') && props.includes('value')) {
					message = messageMap.currencyAndValue;
				} else {
					message = messageMap[props[0]];
				}
				return new BadRequestException({ message });
			},
		}),
	)
	updateExchangeTable(@Body() data: UpdateExchangeTableDto) {
		this.cryptoService.updateExchangeTable(data);
		return { message: 'Valor alterado com sucesso' };
	}
}
