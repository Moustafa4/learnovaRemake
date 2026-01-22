import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { CoursesService } from '../../../services/courses_ser/courses.service';
import { map } from 'rxjs';
import { ICourses } from '../courses/icourses';
import { toSignal } from '@angular/core/rxjs-interop';
import { Instructorservisces } from '../../../services/instructor_servisces/instructorservisces';
import { Iinstructor } from '../instructors/iinstructor';
import { CartService } from '../../../services/cartser/cart.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // courses
  private courses_services = inject(CoursesService);
 private cartserv = inject(CartService);

// 1. Add a Set for purchased courses
purchasedCourseTitle = new Set<string>();
  // 1. Track items currently in the cart
  addedCourseTitle = new Set<string>();


  // allcorses
  private $courses = this.courses_services
    .Allcourses()
    .pipe(map((courses) => courses ?? ([] as ICourses[])));
  _courses = toSignal(this.$courses, { initialValue: [] as ICourses[] });

  _popular = signal<ICourses[]>([]);

  codecorses = computed(() => {
    const codecorses = this._courses();
    return Array.isArray(codecorses)
      ? codecorses
          .filter(
            (p) => p.typ.toLowerCase() === 'Programming'.toLocaleLowerCase(),
          )
          .slice(0, this.itemstoshow())
      : [];
  });
  networkcorses = computed(() => {
    const networkcorses = this._courses();
    return Array.isArray(networkcorses)
      ? networkcorses
          .filter((p) => p.typ.toLowerCase() === 'network')
          .slice(0, this.itemstoshow())
      : [];
  });
  designcourses = computed(() => {
    const designcourses = this._courses();
    return Array.isArray(designcourses)
      ? designcourses
          .filter(
            (p) => p.typ.toLocaleLowerCase() === 'Design'.toLocaleLowerCase(),
          )
          .slice(0, this.itemstoshow())
      : [];
  });

  // ins
  private instructor_services = inject(Instructorservisces);

  private $ins_data = this.instructor_services
    .instuctor_data()
    .pipe(map((instructor) => instructor ?? ([] as Iinstructor[])));

  _ins_data = toSignal(this.$ins_data, { initialValue: [] as Iinstructor[] });

  //
  itemstoshow = signal(6);

  Coding = computed(() => {
    // const Coding=this.;
  });

  // عدد الصور في كل سلايدر (كورسات /انسراكتور)
  gropsize = 3;
  grop_ins_size = 4;

  groupedPopularCourses: ICourses[][] = [];

  groupedinst: Iinstructor[][] = [];
  @HostListener('window:resize') onResize() {
    this.updateGroups();
  }
  updateGroups() {
    const courses = this._popular();
    const ins = this._ins_data();
    const width = window.innerWidth;

    if (width <= 767) {
      this.gropsize = 1;
      this.grop_ins_size = 1;
    } else if (width > 767 && width <= 991) {
      this.gropsize = 2;
      this.grop_ins_size = 2;
    } else {
      this.gropsize = 3;
      this.grop_ins_size = 4;
    }

    this.groupedPopularCourses = [];
    this.groupedinst = [];

    for (let i = 0; i < courses.length; i += this.gropsize) {
      this.groupedPopularCourses.push(courses.slice(i, i + this.gropsize));
    }

    for (let i = 0; i < ins.length; i += this.gropsize) {
      this.groupedinst.push(ins.slice(i, i + this.grop_ins_size));
    }
  }

  constructor() {
    effect(() => {
      this._popular.set(
        this._courses().filter((course) => course.id === 1 || course.id === 2),
      );

      const courses = this._popular();
      const ins = this._ins_data();
      const width = window.innerWidth;
      this.updateGroups();
    });

    //cart effect
    effect(() => {
  const currentItems = this.cartserv.cart();
  this.addedCourseTitle.clear();
  currentItems.forEach((item) => {
    this.addedCourseTitle.add(item.title);
  });
});
//purchased effect
  effect(() => {
     const owned = this.cartserv.myCourses();
     this.purchasedCourseTitle.clear();
     owned.forEach(item => this.purchasedCourseTitle.add(item.title));
  });

  }
//function of cart add
isAdded(courseTitle: string): boolean {
  return this.addedCourseTitle.has(courseTitle);
}
// 3. Add a helper method
isPurchased(courseTitle: string): boolean {
  return this.purchasedCourseTitle.has(courseTitle);
}
   // 4. Update toggleCart to prevent adding if purchased
toggleCart(Course: ICourses) {
  if (this.isPurchased(Course.title)) {
     return; // Do nothing if already owned
  }

  if (this.isAdded(Course.title)) {
    this.cartserv.removeFromCart(Course.title);
    this.addedCourseTitle.delete(Course.title);
  } else {
    this.cartserv.addToCart(Course);
    this.addedCourseTitle.add(Course.title);
  }
}}
