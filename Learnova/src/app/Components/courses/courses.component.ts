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

  filterproduct = signal<ICourses[]>([]);
  slectedCat: string = '';
  constructor() {
    effect(() => {
      this.filterproduct.set(this._courses()); 
    });
  }

  onchanged() {
      this.filterproduct.set(
        this._courses().filter((m) => m.typ === this.slectedCat)
      );

  }
  // addToCart(Course: Course) {
  //   this.cartService.addToCart(Course);
  // }
}
