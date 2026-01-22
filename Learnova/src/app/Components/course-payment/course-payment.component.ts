import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cartser/cart.service';
import {
  IPayPalConfig,
  ICreateOrderRequest,
  NgxPayPalModule,
} from 'ngx-paypal';
import { Authserv } from '../../../services/authserv';

@Component({
  selector: 'app-course-payment',
  standalone: true,
  imports: [FormsModule, NgxPayPalModule],
  templateUrl: './course-payment.component.html',
  styleUrls: ['./course-payment.component.css'],
})
export class CoursePaymentComponent implements OnInit {
  private cartser = inject(CartService);
  private userser = inject(Authserv);
  private router = inject(Router);
  totalCost!: number;

  public payPalConfig?: IPayPalConfig;

  showSuccess: boolean = false;
  isProceedVisible: boolean = true;
  isNotProceedVisible: boolean = false;
  inputValue: string = '';
  showAlert: boolean = false;
  isConfirmed: boolean = false;

  ngOnInit(): void {
    this.totalCost = this.cartser.getTotalPrice();

    this.initConfig();
  }

  private initConfig(): void {
    const exchangeRate = 50;
    const amountInUSD = (this.totalCost / exchangeRate).toFixed(2);

    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'AVE6qxmjP8vFYkWxtVyJeyZ6BATRBA631QKGE2KnUaJ3c-mAo3tcTeAS3uF7xg5iXqGqQYw7smGguEvo',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: amountInUSD,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: amountInUSD,
                  },
                },
              },
              items: [
                {
                  name: 'Course Payment',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: amountInUSD,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions,
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details,
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - transaction completed', data);
        this.showSuccess = true;
        this.cartser.confirmPurchase();
        if (this.userser.user()?.role.toLocaleLowerCase() === 'student') {
          this.router.navigate(['/StudentDashboard']);
        } else {
          this.router.navigate(['/InstDAshBoard']);
        }
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
