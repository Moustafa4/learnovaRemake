import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CoursesService } from '../../../services/courses_ser/courses.service';
import { map } from 'rxjs';
import { ICourses } from '../courses/icourses';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    RouterLink,
    RouterModule,
    RouterLinkActive,
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private courses_services = inject(CoursesService);

  private $popular = this.courses_services.Allcourses().pipe(
    map((courses) => courses ?? ([] as ICourses[])),
    map((courses) =>
      courses.filter((courses) => courses.id === 1 || courses.id === 2)
    )
  );
  _popular = toSignal(this.$popular, { initialValue: [] as ICourses[] });
  gropsize = 3;
  groupedPopularCourses: ICourses[][] = [];

  constructor() {
    effect(() => {
      const courses = this._popular();
      const width = window.innerWidth;
      
      if (width <= 768) { 
        this.gropsize=1
      }
      else if (width >= 1024) { 
        this.gropsize =3
      }
      else {
        this.gropsize=4      }

      this.groupedPopularCourses = [];

      for (let i = 0; i < courses.length; i += this.gropsize) {
        this.groupedPopularCourses.push(courses.slice(i, i + this.gropsize));
      }
    });
  }
}
