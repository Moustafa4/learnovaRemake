import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Authserv } from '../../../services/authserv';

@Component({
  selector: 'app-sign-in',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  rememberMe = false;
  email = '';
  password = '';
  LoggedMessageError = false;

  private auth = inject(Authserv);

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
    if (loginForm.invalid) return;

    const storedUsers: any[] = [];

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('user_')) {
        const userData = localStorage.getItem(key);
        if (userData) storedUsers.push(JSON.parse(userData));
      }
    });

    const user = storedUsers.find(
      (u) => u.email === this.email && u.password === this.password,
    );

    if (!user) {
      this.LoggedMessageError = true;
      return;
    }

    // remember me
    if (this.rememberMe) {
      localStorage.setItem('rememberedEmail', this.email);
      localStorage.setItem('rememberedPassword', this.password);
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }

    this.auth.login(user);

    // navigation
    if (user.role === 'student') {
      this.router.navigate(['/StudentDashboard']);
    } else if (user.role === 'teacher') {
      this.router.navigate(['/InstDAshBoard']);
    }
  }
}
