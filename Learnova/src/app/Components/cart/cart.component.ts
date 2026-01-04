import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cartser/cart.service';
import { Course } from '../courses/course.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: true,

  imports: [CommonModule],

  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartCourses: Course[] = [];
  isCartEmpty: boolean = true;
  totalPrice: number = 0;
  course: any;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartCourses = this.cartService.getCartItems();
    this.checkCartEmpty();
    this.cartService.totalPrice$.subscribe((price) => {
      this.totalPrice = price;
    });
  }

  removeCourse(courseId: number) {
    this.cartService.removeFromCart(courseId);
    this.cartCourses = this.cartService.getCartItems(); // تحديث العناصر بعد الإزالة
    this.checkCartEmpty(); // تحديث حالة السلة
  }

  checkCartEmpty() {
    this.isCartEmpty = this.cartCourses.length === 0;
  }
  addToCart(course: Course) {
    this.cartService.addToCart(course);
    this.cartCourses = this.cartService.getCartItems(); // تحديث القائمة بعد الإضافة
    this.checkCartEmpty(); // تحديث حالة السلة بعد الإضافة
  }
}
