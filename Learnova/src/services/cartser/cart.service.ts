import { Injectable, signal } from '@angular/core';
import { ICourses } from '../../app/Components/courses/icourses';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartKey = 'cart';
  private purchasedKey = 'my_courses';

  cart = signal<ICourses[]>(this.loadCart());
  myCourses = signal<ICourses[]>(this.loadPurchasedCourses());

  private loadCart(): ICourses[] {
    return JSON.parse(sessionStorage.getItem(this.cartKey) || '[]');
  }

  // فانكشن لتحميل الكورسات اللي اشتراها من localStorage
  private loadPurchasedCourses(): ICourses[] {
    return JSON.parse(localStorage.getItem(this.purchasedKey) || '[]');
  }

  addToCart(course: ICourses) {
    this.cart.update((cart) => {
      // نتأكد إنه مش في السلة
      const existsInCart = cart.find((c) => c.title === course.title);
      if (existsInCart) {
        alert('This Course Already Add to your cart');
        return cart;
      }

      //نتاكد انه مش مشتريه قبل كده 
      const purchased = this.loadPurchasedCourses();
      const existsInPurchased = purchased.find((c) => c.title === course.title);
      if (existsInPurchased) {
        alert('You already own this course!');
        return cart;
      }

      const updated = [...cart, course];
      sessionStorage.setItem(this.cartKey, JSON.stringify(updated));
      return updated;
    });
  }

  removeFromCart(title: string) {
    this.cart.update((cart) => {
      const updated = cart.filter((c) => c.title !== title);
      sessionStorage.setItem(this.cartKey, JSON.stringify(updated));
      return updated;
    });
  }

  clearCart() {
    sessionStorage.removeItem(this.cartKey);
    this.cart.set([]);
  }

  getTotalPrice(): number {
    return this.cart().reduce((t, c) => t + c.price, 0);
  }

  // فانكشن لما الدفع يتم يبعت الكورسات للداشبورد 
  // دي موجوده في الكورس بايمنت 
  confirmPurchase() {
  
    const currentCart = this.cart();

  //  دي علشان اجيب الكورسات اللي معاه دلوقتي
    const currentPurchased = this.loadPurchasedCourses();

  //  دي علشان ميحصلش تكرار عندي
    const updatedPurchased = [...currentPurchased, ...currentCart];

    // هنا علشان اخزن الفي اللوكال علشان تفضل موجوده
    localStorage.setItem(this.purchasedKey, JSON.stringify(updatedPurchased));

    
    this.myCourses.set(updatedPurchased);


    this.clearCart();
  }
}
