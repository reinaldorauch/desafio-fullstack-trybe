import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "./local-storage.service";
import { ResultDto } from "src/types/result.dto";
import { UpdateRatesDto } from "src/types/update-rates.dto";

interface RatesDataStore {
	data: any;
	loading: boolean;
}

@Injectable({
	providedIn: "root",
})
export class RatesService {
	private dataStore: RatesDataStore = { data: null, loading: true };

	private dataSubject = new BehaviorSubject<any>(this.dataStore.data);
	private loadingSubject = new BehaviorSubject<boolean>(
		this.dataStore.loading || true
	);

	get loading() {
		return this.loadingSubject.asObservable();
	}

	get loaded() {
		return this.loading.pipe(filter((v) => !v));
	}

	get data() {
		return this.dataSubject.asObservable();
	}

	constructor(
		private httpClient: HttpClient,
		private localStorageService: LocalStorageService
	) {}

	init() {
		const Authorization = this.localStorageService.getToken();
		if (!Authorization) {
			throw new Error("Not logged in");
		}
		this.setLoading();
		this.httpClient
			.get<any>(environment.apiUrl + "/crypto/btc", {
				headers: { Authorization },
			})
			.subscribe((data) => {
				this.dataStore.data = data;
				this.setLoading(false);
			});
	}

	updateRates(dto: UpdateRatesDto) {
		const Authorization = this.localStorageService.getToken();
		if (!Authorization) {
			throw new Error("Not logged in");
		}
		return this.httpClient.post<ResultDto>(
			environment.apiUrl + "/crypto/btc",
			dto,
			{ headers: { Authorization } }
		);
	}

	private setLoading(v = true) {
		this.dataStore.loading = v;
		this.update();
	}

	private update() {
		this.dataSubject.next({ ...this.dataStore }.data);
		this.loadingSubject.next({ ...this.dataStore }.loading);
	}
}
