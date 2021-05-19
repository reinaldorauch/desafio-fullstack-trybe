import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "./local-storage.service";

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
		this.setLoading();
		this.httpClient
			.get<any>(environment.apiUrl + "/crypto/btc", {
				headers: {
					Authorization: this.localStorageService.getToken() || "",
				},
			})
			.subscribe((data) => {
				this.dataStore.data = data;
				this.setLoading(false);
			});
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
