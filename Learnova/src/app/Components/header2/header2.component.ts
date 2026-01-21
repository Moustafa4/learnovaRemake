import { Component, computed, HostListener, inject } from '@angular/core';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { CoursesService } from '../../../services/courses_ser/courses.service';
import { map } from 'rxjs';
import { ICourses } from '../courses/icourses';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cartser/cart.service';

@Component({
  selector: 'app-header2',
  imports: [RouterModule, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.css',
})
export class Header2Component {
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
