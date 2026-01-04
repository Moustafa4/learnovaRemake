import { Component, inject } from '@angular/core';
import { CoursesService } from '../../../services/courses_ser/courses.service';
import { ICourses } from './icourses';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-courses',
  providers: [CoursesService],
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  private Courses_Service = inject(CoursesService);

  private $courses = this.Courses_Service.Allcourses().pipe(
    map((courses) => courses ?? ([] as ICourses[]))
  );

  _courses = toSignal(this.$courses, { initialValue: [] as ICourses[] });
  constructor() {
    console.log(this._courses);
  }

  // addToCart(Course: Course) {
  //   this.cartService.addToCart(Course);
  // }
}
