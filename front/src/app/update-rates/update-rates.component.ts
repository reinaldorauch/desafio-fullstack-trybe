import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RatesService } from '../rates.service';
import { CurrenciesService, Currencies } from '../currencies.service';

@Component({
	selector: 'app-update-rates',
	templateUrl: './update-rates.component.html',
	styleUrls: ['./update-rates.component.css'],
})
export class UpdateRatesComponent implements OnInit {
	$loading = this.currenciesService.loading;

	form = this.formBuilder.group({
		currency: null,
		value: null,
	});

	currencies: Currencies = {};

	constructor(
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private currenciesService: CurrenciesService,
		private ratesService: RatesService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.currenciesService.currencies.subscribe((currencies) => {
			this.currencies = currencies;
		});

		this.form.get('currency')?.valueChanges.subscribe((currency) => {
			this.form.patchValue({ value: this.currencies[currency] });
		});

		this.currenciesService.init();
	}

	async update() {
		const { invalid, touched, dirty } = this.form;

		if (invalid && (touched || dirty)) {
			this.snackBar.open('Formulário inválido, por favor revise-o');
			return;
		}

		try {
			const { message } = await this.ratesService
				.updateRates(this.form.value)
				.toPromise();
			this.snackBar.open(message);
			await this.router.navigate(['']);
		} catch (err) {
			if (err.status === 401) {
				// Se não for autorizado, redireciona o usuário para o login
				this.router.navigate(['/login']);
				this.snackBar.open('Não foi possível atualizar: não está logado');
			} else {
				this.snackBar.open(
					'Erro ao atualizar a cotação da moeda: ' +
						(err?.error?.message || err.message)
				);
			}
		}
	}
}
