import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../../app/Components/courses/course.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Course[] = [];
  private totalPrice = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPrice.asObservable();

  constructor() {
    // تحميل السلة من localStorage عند تهيئة الخدمة
    const storedCartItems = localStorage.getItem('cart');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.updateTotalPrice(); // تحديث السعر الإجمالي عند تحميل السلة
    }
  }

  addToCart(course: Course) {
    const existingCourse = this.cartItems.find((item) => item.id === course.id);
    if (!existingCourse) {
      console.log('Course added:', course);
      this.cartItems.push(course);
      this.updateTotalPrice();
      localStorage.setItem('cart', JSON.stringify(this.cartItems)); // تحديث localStorage
    } else {
      console.log('Course already in cart:', existingCourse);
    }
  }

  removeFromCart(courseId: number) {
    this.cartItems = this.cartItems.filter((course) => course.id !== courseId);
    this.updateTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartItems)); // تحديث localStorage بعد الإزالة
  }

  getCartItems() {
    return this.cartItems;
  }

  private updateTotalPrice() {
    const total = this.cartItems.reduce((sum, item) => sum + item.price, 0);
    this.totalPrice.next(total);
  }
}
