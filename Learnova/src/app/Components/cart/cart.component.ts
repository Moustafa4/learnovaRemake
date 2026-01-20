import { Component, inject, OnInit } from "@angular/core";
import { ICourses } from "../courses/icourses";
import { CartService } from "../../../services/cartser/cart.service";
@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartCourses: ICourses[] = [];
  isCartEmpty = true;
  totalPrice = 0;

  private cartserv = inject(CartService);

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartCourses = this.cartserv.getCart();
    this.isCartEmpty = this.cartCourses.length === 0;
    this.totalPrice = this.cartserv.getTotalPrice();
  }

  removeCourse(title: string) {
    this.cartserv.removeFromCart(title);
    this.loadCart();
  }

  clearCart() {
    this.cartserv.clearCart();
    this.loadCart();
  }
}
