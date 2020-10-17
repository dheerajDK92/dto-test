import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./component/home/home.component";
import { PaymentPageComponent } from "./component/payment-page/payment-page.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "makePayment", component: PaymentPageComponent },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
