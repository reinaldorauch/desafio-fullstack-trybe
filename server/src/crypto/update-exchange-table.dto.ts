import { IsIn, IsInt, Min } from 'class-validator';

export class UpdateExchangeTableDto {
	@IsIn(['BRL', 'CAD', 'EUR'])
	currency: string;

	@IsInt()
	@Min(1)
	value: number;
}
