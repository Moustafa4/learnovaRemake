import { Injectable, signal, inject, effect } from '@angular/core'; // 1. ضيف effect
import { ICourses } from '../../app/Components/courses/icourses';
import { Authserv } from '../../services/authserv'; // تأكد من المسار الصحيح

@Injectable({ providedIn: 'root' })
export class CartService {
  private authServ = inject(Authserv); // 2. استدعاء سيرفيس المستخدمين

  private cartKey = 'cart';
  // شيلنا المتغير الثابت purchasedKey من هنا

  cart = signal<ICourses[]>(this.loadCart());
  myCourses = signal<ICourses[]>([]); // ابدأ بمصفوفة فاضية وهي هتتحدث تلقائي

  constructor() {
    // 3. Effect: مراقب تلقائي لأي تغيير في حالة المستخدم (Login/Logout)
    // أول ما اليوزر يتغير، بنحدث قائمة الكورسات بتاعته فوراً
    effect(
      () => {
        // السطر ده مجرد عشان الـ effect يشتغل لما اليوزر يتغير
        const currentUser = this.authServ.user();

        // حدث قائمة الكورسات بناءً على اليوزر الجديد
        this.myCourses.set(this.loadPurchasedCourses());
      },
      { allowSignalWrites: true },
    );
  }

  // 4. دالة ديناميكية بتجيب المفتاح الخاص بالمستخدم الحالي
  private getPurchasedKey(): string {
    const user = this.authServ.user();
    if (user && user.id) {
      return `my_courses_${user.id}`; // مفتاح مميز لكل مستخدم: my_courses_1, my_courses_2
    }
    return 'my_courses_guest'; // مفتاح مؤقت للزائر (اختياري)
  }

  private loadCart(): ICourses[] {
    return JSON.parse(sessionStorage.getItem(this.cartKey) || '[]');
  }

  // تعديل الدالة لتستخدم المفتاح الديناميكي
  private loadPurchasedCourses(): ICourses[] {
    const key = this.getPurchasedKey(); // هات المفتاح بتاع اليوزر الحالي
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  addToCart(course: ICourses) {
    this.cart.update((cart) => {
      const existsInCart = cart.find((c) => c.title === course.title);
      if (existsInCart) {
        alert('This Course Already Add to your cart');
        return cart;
      }

      // التأكد من الملكية باستخدام الدالة المحدثة
      const purchased = this.loadPurchasedCourses();
      const existsInPurchased = purchased.find((c) => c.title === course.title);
      if (existsInPurchased) {
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

  confirmPurchase() {
    const currentCart = this.cart();

    // نجيب كورسات المستخدم الحالي فقط
    const currentPurchased = this.loadPurchasedCourses();
    const updatedPurchased = [...currentPurchased, ...currentCart];

    // التخزين في المفتاح الخاص بالمستخدم الحالي
    const key = this.getPurchasedKey();
    localStorage.setItem(key, JSON.stringify(updatedPurchased));

    this.myCourses.set(updatedPurchased);
    this.clearCart();
  }

  isCoursePurchased(courseTitle: string): boolean {
    const purchased = this.loadPurchasedCourses();
    return purchased.some((course) => course.title === courseTitle);
  }
}
