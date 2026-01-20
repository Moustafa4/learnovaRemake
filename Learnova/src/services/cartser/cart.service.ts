import { Injectable } from '@angular/core';
import { ICourses } from '../../app/Components/courses/icourses';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart';

  constructor() {}

  // جلب الكورسات الموجودة بالعربة
  getCart(): ICourses[] {
    return JSON.parse(sessionStorage.getItem(this.cartKey) || '[]');
  }

  // إضافة كورس للعربة
  addToCart(course: ICourses): void {
    let cart = this.getCart();

    // لو الكورس موجود بالفعل
    const existingCourse = cart.find((c) => c.title === course.title);
    if (existingCourse) {
      alert('This Course Already Add to your cart');
      return;
    }

    // لو مش موجود، نضيفه
    cart.push(course);
    sessionStorage.setItem(this.cartKey, JSON.stringify(cart));
    console.log('Cart updated:', cart);
  }

  // إزالة كورس من العربة
  removeFromCart(courseTitle: string): void {
    let cart = this.getCart();
    cart = cart.filter((c) => c.title !== courseTitle);
    sessionStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  // مسح العربة كلها
  clearCart(): void {
    sessionStorage.removeItem(this.cartKey);
  }
  getTotalPrice(): number {
    const cart = this.getCart();
    return cart.reduce((total, course) => total + course.price, 0);
  }
}
