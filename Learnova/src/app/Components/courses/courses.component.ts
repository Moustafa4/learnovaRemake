import { Component, effect, inject, signal } from '@angular/core';
import { CoursesService } from '../../../services/courses_ser/courses.service';
import { ICourses } from './icourses';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  providers: [CoursesService],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  private Courses_Service = inject(CoursesService);

  private $courses = this.Courses_Service.Allcourses().pipe(
    map((courses) => courses ?? ([] as ICourses[]))
  );

  _courses = toSignal(this.$courses, { initialValue: [] as ICourses[] });

  filterproduct: ICourses[] = this._courses();
  selectedCat: string = 'All Courses';
  constructor() {
    effect(() => {
      this.filterproduct = this._courses();
    });
  }

  onchanged() {
    if (this.selectedCat == 'All Courses') {
      this.filterproduct = this._courses();
    } else {
      this.filterproduct = this._courses().filter(
        (m) =>
          m.typ.toLocaleLowerCase() === this.selectedCat.toLocaleLowerCase()
      );
    }
  }

  // addToCart(Course: Course) {
  //   this.cartService.addToCart(Course);
  // }
}
