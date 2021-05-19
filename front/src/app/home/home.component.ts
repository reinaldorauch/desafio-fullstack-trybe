import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";

import { filter } from 'rxjs/operators'

import Big from 'big.js';

import { RatesService } from "../rates.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
	$loading = this.ratesService.loading;
	$data = this.ratesService.data;

	form = this.formBuilder.group({
		BTC: 1,
		USD: null,
		BRL: null,
		EUR: null,
		CAD: null,
	});

	exchangeTable: any = null;

	constructor(
		private ratesService: RatesService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		this.ratesService.data.pipe(filter(v => !!v)).subscribe((data) => {
			this.exchangeTable = this.exchanges(data.bpi);
			this.updateForm();
		});
		this.form.get("BTC")?.valueChanges.subscribe(() => this.updateForm());
		this.ratesService.init();
	}

	exchanges(obj: any): any {
		return Object.entries(obj)
			.map((e) => e[1])
			.filter((e: any) => e.code !== "BTC");
	}

	update() {
		this.ratesService.init();
	}

	updateForm() {
		const btc = this.form.get('BTC')?.value || 1;
		const map: { [key: string]: string } = {};

		this.exchangeTable.forEach((c: any) => {
			map[c.code] = d(btc).times(d(c.rate_float)).toString();
		});

		this.form.patchValue(map);
	}
}

function d(val: string): Big {
	return new Big(val);
}
