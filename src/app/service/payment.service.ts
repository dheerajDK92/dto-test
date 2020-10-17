import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  // private _paymentApiResponse: BehaviorSubject<any> = new BehaviorSubject([]);

  // public readonly paymentApiResponse: Observable<
  //   Payment
  // > = this._paymentApiResponse.asObservable();
  constructor(private _http: HttpClient) {}

  submitPayment(data) {
    return this._http.post(environment.apiURL, data);
  }
}
