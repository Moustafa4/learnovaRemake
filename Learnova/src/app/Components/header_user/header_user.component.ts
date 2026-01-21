import { Component, computed, effect, HostListener, inject } from '@angular/core';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { CoursesService } from '../../../services/courses_ser/courses.service';
import { map } from 'rxjs';
import { ICourses } from '../courses/icourses';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Authserv } from '../../../services/authserv';
import { CartService } from '../../../services/cartser/cart.service';
interface CurrentUser {
  id: number;
  role: string;
  firstName: string;
  lastName: string;
  phone: string;
  profilePicture: string;
}

@Component({
  selector: 'app-header_user',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './header_user.component.html',
  styleUrl: './header_user.component.css',
})
export class Header_userComponent {
  private router = inject(Router);
  private courses_services = inject(CoursesService);
  private $courses = this.courses_services
    .Allcourses()
    .pipe(map((courses) => courses ?? ([] as ICourses[])));
  private _courses = toSignal(this.$courses, {
    initialValue: [] as ICourses[],
  });

  private cartser = inject(CartService);

  cart = this.cartser.cart;

  isCartEmpty = computed(() => this.cart().length === 0);
  private auth = inject(Authserv);
  userData = this.auth.user;

  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }

  goToDashboard() {
    const user = this.userData();
    if (!user) return;

    if (user.role.toLowerCase() === 'student') {
      this.router.navigate(['/StudentDashboard']);
    } else if (user.role.toLowerCase() === 'teacher') {
      this.router.navigate(['/InstDAshBoard']);
    }
  }

  showOverlay = false;

  sear_word: string = '';
  searchfilter: ICourses[] = this._courses();
  onsearch(searchval: string) {
    const value = this.sear_word.trim().toLowerCase();

    if (!value) {
      this.showOverlay = false;
      this.searchfilter = [];
      return;
    }

    this.searchfilter = this._courses().filter((c) =>
      c.description.toLowerCase().includes(value),
    );

    this.showOverlay = true;
  }
  goToCourse(title: string) {
    this.showOverlay = false;
    this.router.navigate(['Details/', title]);
  }

  isScrolled = false;
  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 10;
  }
  @HostListener('document:click', ['$event'])
  closeOverlay(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-wrapper')) {
      this.showOverlay = false;
    }
  }
}
