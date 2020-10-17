import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Payment } from "src/app/interface/payment";
import { PaymentService } from "src/app/service/payment.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-payment-page",
  templateUrl: "./payment-page.component.html",
  styleUrls: ["./payment-page.component.css"],
})
export class PaymentPageComponent implements OnInit, OnDestroy {
  constructor(private _ser: PaymentService, private _route: Router) {}
  title: String = "Payment Information";
  payment: Payment = {
    amount: null,
    creditCardNumber: null,
    cardholder: null,
    expirationDate: null,
    securityCode: null,
  };
  errorMessage = [];
  isRequestGoingOn: Subscription;
  ngOnInit(): void {}

  submit() {
    const valid = this.validateInputs();
    if (valid) {
      // TODO: need to make Post Request
      if (this.isRequestGoingOn) {
        this.isRequestGoingOn.unsubscribe();
      }
      this.isRequestGoingOn = this._ser.submitPayment(this.payment).subscribe(
        (res) => {
          console.log("res", res);
          Swal.fire(
            "Success...",
            `Payment is successfully completed!`,
            "success"
          );
        },
        (err) => console.error(err)
      );
    }
  }
  /**
   *
   * back
   */
  back() {
    this._route.navigateByUrl("/");
  }
  /**
   *
   * @param val input for null check
   */
  isNull(val) {
    return val === null || val === undefined || val === "";
  }
  validateInputs() {
    this.errorMessage = [];
    let output = true;
    if (this.isNull(this.payment.amount)) {
      this.errorMessage.push("Please Enter Amount.");
      output = false;
    }
    if (!this.isNull(this.payment.amount)) {
      if (this.payment.amount === 0) {
        this.errorMessage.push("Please Enter Amount Greater Than 0.");
        output = false;
      }
    }
    if (!this.isNull(this.payment.expirationDate)) {
      const date = this.payment.expirationDate.split("/");
      const todayYear = new Date().getFullYear() % 100;
      const todayMonth = new Date().getMonth() + 1;
      console.log("dtaa", date);
      if (date.length === 1) {
        this.errorMessage.push("Please Enter Valid Expiry Date.");
        output = false;
      } else if (Number(date[1]) < todayYear) {
        this.errorMessage.push("Please Enter Valid Expiry Date.");
        output = false;
      }
    }
    if (this.isNull(this.payment.creditCardNumber)) {
      this.errorMessage.push("Please Enter 16 Digit Credit Card Number.");
      output = false;
    }
    if (this.isNull(this.payment.cardholder)) {
      this.errorMessage.push("Please Enter Card Holder Name.");
      output = false;
    }
    if (this.isNull(this.payment.expirationDate)) {
      this.errorMessage.push("Please Enter Card Expiry Date.");
      output = false;
    }

    return output;
  }
  ngOnDestroy() {
    this.payment = {
      amount: null,
      creditCardNumber: null,
      cardholder: null,
      expirationDate: null,
      securityCode: null,
    };
    if (this.isRequestGoingOn) {
      this.isRequestGoingOn.unsubscribe();
    }
  }
}
