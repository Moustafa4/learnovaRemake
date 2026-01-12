import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourses } from '../../app/Components/courses/icourses';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses_url =
    'https://raw.githubusercontent.com/Moustafa4/learnovaRemake/refs/heads/main/Learnova/public/data/Courses_Data/Courses.json';
  constructor(private _HttpClient: HttpClient) {}

  Allcourses() {
    return this._HttpClient
      .get<{ Courses: ICourses[] }>(this.courses_url)
      .pipe(map((res) => res.Courses ?? []));
  }

  CoursesByTitle(title: string): Observable<ICourses | null> {
  return this._HttpClient.get<{ Courses: ICourses[] }>(this.courses_url).pipe(
    map(res => res.Courses ?? []),
    map(courses => courses.find(p => p.title === title) ?? null)
  );
  }
}
