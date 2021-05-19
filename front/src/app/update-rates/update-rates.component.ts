import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

import { RatesService } from "../rates.service";

@Component({
	selector: "app-update-rates",
	templateUrl: "./update-rates.component.html",
	styleUrls: ["./update-rates.component.css"],
})
export class UpdateRatesComponent implements OnInit {
	form = this.formBuilder.group({
		currency: null,
		value: null,
	});

	constructor(
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private ratesService: RatesService,
		private router: Router
	) {}

	ngOnInit(): void {}

	async update() {
		const { invalid, touched, dirty } = this.form;

		if (invalid && (touched || dirty)) {
			this.snackBar.open("Formulário inválido, por favor revise-o");
			return;
		}

		try {
			await this.ratesService.update(this.form.value).toPromise();
			this.snackBar.open('Cotação da moeda atualizada com sucesso!');
			await this.router.navigate([""]);
		} catch (err) {
			this.snackBar.open('Erro ao atualizar a cotação da moeda: ' + (err?.error?.message || err.message));
		}
	}
}
