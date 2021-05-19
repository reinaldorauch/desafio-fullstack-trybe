import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TokenDto } from "src/types/token.dto";
import { LoginDto } from "src/types/login.dto";
import { LocalStorageService } from "./local-storage.service";
import { tap } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(
		private httpClient: HttpClient,
		private localStorageService: LocalStorageService
	) {}

	login(dto: LoginDto) {
		return this.httpClient
			.post<TokenDto>(environment.apiUrl + "/login", dto)
			.pipe(tap(({ token }) => this.localStorageService.setToken(token)));
	}

	isLoggedIn(): boolean {
		return !!this.localStorageService.getToken();
	}
}
