import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
interface CurrentUser {
  id: number;
  role: string;
  firstName: string;
  lastName: string;
  phone: string;
  profilePicture:string;
}

@Injectable({
  providedIn: 'root',
})
export class Authserv {
  user = signal<CurrentUser | null>(this.getUser());
  private router = inject(Router);

  private getUser(): CurrentUser | null {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  }

  login(user: CurrentUser) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.user.set(user);
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.user.set(null);
    this.router.navigate(['']);
  }
  authgard():boolean {
    if (localStorage.getItem('currentUser')!=null) {
      return true;
    } else {
      return false;
    }
  }
}
