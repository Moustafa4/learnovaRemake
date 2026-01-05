import { Component, computed, inject, Input } from '@angular/core';

import { RouterLink } from '@angular/router';
import { CoursesService } from '../../../../services/courses_ser/courses.service';
import { filter, map } from 'rxjs';
import { ICourses } from '../icourses';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-coding',
  imports: [CommonModule],
  templateUrl: './coding.component.html',
  styleUrl: './coding.component.css',
})
export class CodingComponent {
  private courses_service = inject(CoursesService);

  private $coding = this.courses_service.Allcourses().pipe(
    map((Courses) => Courses ?? ([] as ICourses[])),
    map((courses) =>
      courses.filter((courses) => courses.typ.toLocaleLowerCase() === 'coding')
    )
  );

  _coding = toSignal(this.$coding, { initialValue: [] as ICourses[] });
}
