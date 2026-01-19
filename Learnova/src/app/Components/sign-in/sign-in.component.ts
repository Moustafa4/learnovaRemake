import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-sign-in',
    imports: [RouterModule, FormsModule],
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  rememberMe: boolean = false;
  email: string = '';
  password: string = '';

  constructor(private router: Router) {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    if (rememberedEmail && rememberedPassword) {
      this.email = rememberedEmail;
      this.password = rememberedPassword;
      this.rememberMe = true;
    }
  }

  onLogin() {
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
      alert('ًWrong Email or Password!');
    }
  }
}
