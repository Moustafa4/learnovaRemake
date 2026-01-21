import { Injectable, signal } from '@angular/core';
import { ICourses } from '../../app/Components/courses/icourses';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartKey = 'cart';

  cart = signal<ICourses[]>(this.loadCart());

  private loadCart(): ICourses[] {
    return JSON.parse(sessionStorage.getItem(this.cartKey) || '[]');
  }

  addToCart(course: ICourses) {
    this.cart.update((cart) => {
      const exists = cart.find((c) => c.title === course.title);
      if (exists) {
        alert('This Course Already Add to your cart');
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
}
