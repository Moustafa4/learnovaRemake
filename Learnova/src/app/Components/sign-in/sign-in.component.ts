import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule , NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-sign-in',
    imports: [RouterModule, FormsModule,CommonModule],
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  rememberMe: boolean = false;
  email: string = '';
  password: string = '';
LoggedMessageError : boolean = false;
  constructor(private router: Router) {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    if (rememberedEmail && rememberedPassword) {
      this.email = rememberedEmail;
      this.password = rememberedPassword;
      this.rememberMe = true;
    }
  }

  onLogin(loginForm: NgForm) {
    // 1. Mark all fields as touched to trigger validation messages
    if (loginForm.form.controls) {
      Object.keys(loginForm.form.controls).forEach(key => {
        loginForm.form.controls[key].markAsTouched();
      });
    }

    // 2. Check if the form is valid
    if (loginForm.invalid) {
      return;
    }

    const storedUsers: any[] = [];

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('user_')) {
        const userData = localStorage.getItem(key);
        if (userData) {
          storedUsers.push(JSON.parse(userData));
        }
      }
    });

    const user = storedUsers.find(
      (user) => user.email === this.email && user.password === this.password
    );

    if (user) {
      if (this.rememberMe) {
        localStorage.setItem('rememberedEmail', this.email);
        localStorage.setItem('rememberedPassword', this.password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }
      localStorage.setItem('currentUser', JSON.stringify(user));

      if (user.role === 'student') {
        this.router.navigate(['/StudentDashboard']);
      } else if (user.role === 'teacher') {
        this.router.navigate(['/InstDAshBoard']);
      }
    } else {
      this.LoggedMessageError=true;
    }
  }
}
