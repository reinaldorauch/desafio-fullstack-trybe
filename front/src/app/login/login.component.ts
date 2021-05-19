import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
	form = this.formBuilder.group({
		email: null,
		password: null,
	});

	constructor(
		private router: Router,
		private snackBar: MatSnackBar,
		private formBuilder: FormBuilder,
		private authService: AuthService
	) {}

	ngOnInit(): void {}

	async submit() {
		const { invalid, touched, dirty } = this.form;

		if (invalid && (touched || dirty)) {
			this.snackBar.open("Formulário inválido, por favor revise-o");
			return;
		}

		try {
			await this.authService.login(this.form.value).toPromise();
			this.snackBar.open('Login realizado com sucesso!');
			await this.router.navigate([""]);
		} catch (err) {
			this.snackBar.open("Erro no login: " + (err?.error?.message || err.message));
		}
	}
}
