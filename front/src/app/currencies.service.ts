import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "./local-storage.service";
import { MatSnackBar } from "@angular/material/snack-bar";

export type Currencies = { [key: string]: string };

interface CurrenciesDataStore {
  currencies: Currencies;
  loading: boolean;
}

@Injectable({
  providedIn: "root",
})
export class CurrenciesService {
  private dataStore: CurrenciesDataStore = { currencies: {}, loading: true };
  private loadingSubject = new BehaviorSubject(this.dataStore.loading);
  private currenciesSubject = new BehaviorSubject(this.dataStore.currencies);

  get currencies() {
    return this.currenciesSubject.asObservable();
  }

  get loading() {
    return this.loadingSubject.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  init() {
    const Authorization = this.localStorageService.getToken();

    if (!Authorization) {
      this.snackBar.open("Erro ao consultar as cotações: Não está logado");
      this.router.navigate(["login"]);
      return;
    }

    this.setLoading();
    this.httpClient
      .get<Currencies>(environment.apiUrl + "/currencies", {
        headers: { Authorization },
      })
      .subscribe((currencies) => {
        this.dataStore.currencies = currencies;
        this.setLoading(false);
      });
  }

  private setLoading(v = true) {
    this.dataStore.loading = v;
    this.update();
  }

  private update() {
    this.currenciesSubject.next({ ...this.dataStore }.currencies);
    this.loadingSubject.next({ ...this.dataStore }.loading);
  }
}
