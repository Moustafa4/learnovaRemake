import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourses } from '../../app/Components/courses/icourses';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private _HttpClient: HttpClient) {}
  courses_url = 'http://localhost:3000/Courses';

  Allcourses() {
    return this._HttpClient
      .get<{ Courses: ICourses[] }>(this.courses_url)
      .pipe(map((res) => res.Courses ?? []));
  }
}
