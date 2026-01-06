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
import { Instructorservisces } from '../../../services/instructor_servisces/instructorservisces';
import { Iinstructor } from '../instructors/iinstructor';

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
  // courses
  private courses_services = inject(CoursesService);

  private $popular = this.courses_services.Allcourses().pipe(
    map((courses) => courses ?? ([] as ICourses[])),
    map((courses) =>
      courses.filter((courses) => courses.id === 1 || courses.id === 2)
    )
  );
  _popular = toSignal(this.$popular, { initialValue: [] as ICourses[] });
  // ins
  private instructor_services = inject(Instructorservisces);

  private $ins_data = this.instructor_services
    .instuctor_data()
    .pipe(map((instructor) => instructor ?? ([] as Iinstructor[])));

  _ins_data = toSignal(this.$ins_data, { initialValue: [] as Iinstructor[] });

  gropsize = 3;
  groupedPopularCourses: ICourses[][] = [];

  groupedinst:Iinstructor[][]=[];
  constructor() {
    effect(() => {
      console.log(this._ins_data());
      
      const courses = this._popular();
      const ins=this._ins_data()
      const width = window.innerWidth;

      if (width <= 767) {
        this.gropsize = 1;
      } else if (width >= 768 && width <= 991) {
        this.gropsize = 2;
      } else {
        this.gropsize = 3;
      }

      this.groupedPopularCourses = [];

      for (let i = 0; i < courses.length; i += this.gropsize) {
        this.groupedPopularCourses.push(courses.slice(i, i + this.gropsize));
      }

      for (let i = 0; i <= ins.length; i+=this.gropsize){
        this.groupedinst.push(ins.slice(i,i+this.gropsize))
      }
    });
  }
}
