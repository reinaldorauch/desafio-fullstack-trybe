import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { UpdateRatesComponent } from "./update-rates/update-rates.component";
import { LoginGuard } from "./login.guard";

const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "update-rates", component: UpdateRatesComponent },
	{
		path: "",
		component: HomeComponent,
		canActivate: [LoginGuard],
		canActivateChild: [LoginGuard],
		canLoad: [LoginGuard],
		pathMatch: "full",
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
