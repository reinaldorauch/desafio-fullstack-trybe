import { writeFileSync } from 'fs';
import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { BigDecimal } from 'bigdecimal';
import { UpdateExchangeTableDto } from './update-exchange-table.dto';

export enum Coin {
  BTC = 'btc',
}

const COINDESK_URL = 'https://api.coindesk.com/v1/bpi/currentprice';

const CURRENCY_LABEL_MAP = {
  BRL: 'Brazillian Real',
  EUR: 'Euro',
  CAD: 'Canadian Dollar',
};

@Injectable()
export class CryptoService {
  private usdExchangeTable: { [key: string]: string };
  private formatter: Intl.NumberFormat;

  constructor(private httpService: HttpService) {
    this.loadExchangeTable();
    this.formatter = new Intl.NumberFormat('en-US', {
      maximumSignificantDigits: 21,
    });
  }

  private loadExchangeTable() {
    this.usdExchangeTable = require(process.cwd() + '/currencies.json');
  }

  private saveExchangeTable() {
    writeFileSync(
      process.cwd() + '/currencies.json',
      JSON.stringify(this.usdExchangeTable),
    );
  }

  getExchangesCoin(coin: Coin) {
    return this.httpService.get(`${COINDESK_URL}/${coin}.json`).pipe(
      map((res) => res.data),
      map((data) => {
        const coinToUSDRate: number = data.bpi.USD.rate_float;

        Object.entries(this.usdExchangeTable).forEach(
          ([currency, usdToCurrencyFactor]) => {
            // Usando a lib bigdecimal pra calcular direito os valores
            const rate_float = Number(
              d(coinToUSDRate.toString()).multiply(d(usdToCurrencyFactor)),
            );
            data.bpi[currency] = {
              code: currency,
              rate: this.formatter.format(rate_float),
              rate_float,
              description: CURRENCY_LABEL_MAP[currency],
            };
          },
        );

        return data;
      }),
    );
  }

  updateExchangeTable(data: UpdateExchangeTableDto) {
    this.usdExchangeTable[data.currency] = data.value.toString();
    this.saveExchangeTable();
  }
}

// Helper pra instanciar os bigdecimals
function d(bigdecimal: string): BigDecimal {
  return new BigDecimal(bigdecimal);
}
