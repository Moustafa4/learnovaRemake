import { Component, effect, inject } from '@angular/core';
import { CoursesService } from '../../../services/courses_ser/courses.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICourses } from '../courses/icourses';
import { filter, map, switchMap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-courses-details',
  standalone: true,

  imports: [],
  templateUrl: './courses-details.html',
  styleUrl: './courses-details.css',
})
export class CoursesDetails {
  private courses_servis = inject(CoursesService);
  private route = inject(ActivatedRoute);
  courses = toSignal<ICourses | null>(
    this.route.paramMap.pipe(
      map((params) => params.get('title')),
      filter((title): title is string => title !== null),
      switchMap((title) => this.courses_servis.CoursesByTitle(title)),
      map((course) => course ?? null)
    )
  );
  constructor() {
    effect(() =>{
    console.log(this.courses());
    
    })
  }
}
