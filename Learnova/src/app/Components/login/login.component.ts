import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [RouterModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  // تنفيذ عملية تسجيل الدخول
  onLogin() {
    // جلب جميع المستخدمين من localStorage
    const storedUsers: any[] = [];
    for (let i = 1; i <= localStorage.length; i++) {
      const userData = localStorage.getItem(`user_${i}`);
      if (userData) {
        storedUsers.push(JSON.parse(userData));
      }
    }

    // التحقق من صحة البريد الإلكتروني وكلمة المرور
    const user = storedUsers.find(
      (user) => user.email === this.email && user.password === this.password
    );

    if (user) {
      // التحقق من الدور وتوجيه المستخدم
      if (user.role === 'student') {
        this.router.navigate(['/student']); // توجيه الطالب
      } else if (user.role === 'teacher') {
        this.router.navigate(['/InstDAshBoard']); // توجيه المدرس
      }
    } else {
      // رسالة تنبيه عند إدخال بيانات خاطئة
      alert('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    }
  }
}
